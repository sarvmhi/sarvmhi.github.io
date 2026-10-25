"use client";

import { useEffect, useRef } from "react";

/*
 * A coral ball that rolls along the hand-drawn line of "How I Work", from its start at the top
 * to its end at the bottom. It sets off when the section comes into view; when the reader
 * scrolls, it jumps ahead (or back) to the part of the line that is now in the middle of the
 * screen and keeps rolling down from there. The fixed coral dots stay where they are.
 *
 * LINE is the centre of the drawn stroke, in the section's own coordinates (the line image
 * sits at (-1.8, 97), so these are the image's points shifted by that much).
 */
const LINE = (() => {
  const dx = -1.8;
  const dy = 97;
  const p = (x: number, y: number) => `${x + dx} ${y + dy}`;
  return [
    `M ${p(2, 0)} V ${210 + dy} Q ${p(2, 228)} ${p(20, 228)} H ${518 + dx}`,
    `A 25.5 25.5 0 0 1 ${p(518, 279)} H ${25 + dx} Q ${p(3, 279)} ${p(3, 300)}`,
    `V ${490 + dy} Q ${p(3, 510)} ${p(23, 510)} H ${518 + dx}`,
    `A 26 26 0 0 1 ${p(518, 562)} H ${25 + dx} Q ${p(3, 562)} ${p(3, 585)}`,
    `V ${775 + dy} Q ${p(3, 794)} ${p(22, 794)} H ${518 + dx}`,
    `A 26 26 0 0 1 ${p(518, 846)} H ${25 + dx} Q ${p(3, 846)} ${p(3, 868)}`,
    `V ${1060 + dy} Q ${p(3, 1080)} ${p(22, 1080)} H ${500 + dx}`,
  ].join(" ");
})();

const SIZE = 22; // ball diameter, px
const SPEED = 110; // px of line per second on the straights
const BEND_SLOWDOWN = 0.55; // in the tightest bend it rolls at 45% of that
const GLIDE = 380; // px per second at most when moving to where the reader scrolled
const SECTION_W = 545; // the section's width in its own units

export function HowIWorkBall() {
  const ballRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    const path = pathRef.current;
    const section = ball?.closest("section");
    if (!ball || !path || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const total = path.getTotalLength();
    // y of the line every 4px along it, to find the point at a given height
    const samples: number[] = [];
    const turn: number[] = []; // how sharply the line bends at each sample, 0 to 1
    let prev = path.getPointAtLength(0);
    let prevAngle = 0;
    for (let l = 0; l <= total; l += 4) {
      const pt = path.getPointAtLength(l);
      samples.push(pt.y);
      const angle = Math.atan2(pt.y - prev.y, pt.x - prev.x);
      let d = Math.abs(angle - prevAngle);
      if (d > Math.PI) d = 2 * Math.PI - d;
      turn.push(l === 0 ? 0 : Math.min(1, d / 0.35));
      prev = pt;
      prevAngle = angle;
    }
    // spread each bend over its neighbours, so the ball slows before it and speeds up after
    const bend = turn.map((_, i) => {
      let m = 0;
      for (let k = -8; k <= 8; k++) m = Math.max(m, (turn[i + k] ?? 0) * (1 - Math.abs(k) / 9));
      return m;
    });
    const speedAt = (l: number) => SPEED * (1 - BEND_SLOWDOWN * (bend[Math.round(l / 4)] ?? 0));

    let at = 0; // where the ball is, in px along the line
    let jumpTo: number | null = null; // where a scroll asked it to go
    let started = false;
    let frame = 0;
    let last = 0;

    const place = () => {
      const pt = path.getPointAtLength(at);
      ball.style.transform = `translate(${pt.x - SIZE / 2}px, ${pt.y - SIZE / 2}px)`;
    };

    const step = (time: number) => {
      const dt = Math.min(0.05, (time - (last || time)) / 1000);
      last = time;
      if (jumpTo !== null) {
        // glide to the new spot (easing in as it gets close), then carry on rolling
        const gap = jumpTo - at;
        const move = Math.sign(gap) * Math.min(Math.abs(gap), Math.max(SPEED, Math.min(GLIDE, Math.abs(gap) * 2.5)) * dt);
        at += move;
        if (Math.abs(jumpTo - at) < 1) jumpTo = null;
      } else {
        at = Math.min(total, at + speedAt(at) * dt);
      }
      place();
      if (at < total || jumpTo !== null) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
        last = 0;
      }
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    // The point of the line level with the middle of the screen
    const lengthAtScreenMiddle = () => {
      const rect = section.getBoundingClientRect();
      const scale = rect.width / SECTION_W; // the section is drawn zoomed
      const y = (window.innerHeight / 2 - rect.top) / scale;
      const i = samples.findIndex((sy) => sy >= y);
      return i === -1 ? total : i * 4;
    };

    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
        }
      },
      { threshold: 0.2 },
    );
    seen.observe(section);

    let scrollTimer = 0;
    const onScroll = () => {
      if (!started) return;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        jumpTo = lengthAtScreenMiddle();
        run();
      }, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    place();
    ball.style.opacity = "1";
    return () => {
      seen.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <svg aria-hidden className="pointer-events-none absolute inset-0 hidden size-full overflow-visible sm:block">
        <path ref={pathRef} d={LINE} fill="none" stroke="none" />
      </svg>
      <span
        ref={ballRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden rounded-full bg-coral opacity-0 shadow-[0_2px_6px_rgba(229,107,111,0.45)] will-change-transform sm:block"
        style={{ width: SIZE, height: SIZE }}
      />
    </>
  );
}
