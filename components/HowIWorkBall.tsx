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
const SPEED = 110; // px of line per second, the same on straights and bends
const HEADER = 74; // fixed header height, px
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
    // y of the line every 4px along it, to find where the line enters the screen
    const samples: number[] = [];
    for (let l = 0; l <= total; l += 4) samples.push(path.getPointAtLength(l).y);

    let at = 0; // px along the line; only ever grows, except when the ball is moved by a scroll
    let started = false;
    let frame = 0;
    let last = 0;

    const scale = () => section.getBoundingClientRect().width / SECTION_W; // the section is zoomed
    const place = () => {
      const pt = path.getPointAtLength(at);
      ball.style.transform = `translate(${pt.x - SIZE / 2}px, ${pt.y - SIZE / 2}px)`;
    };

    // Same speed the whole way, forward only, stopping at the end
    const step = (time: number) => {
      const dt = Math.min(0.05, (time - (last || time)) / 1000);
      last = time;
      at = Math.min(total, at + SPEED * dt);
      place();
      if (at < total) {
        frame = requestAnimationFrame(step);
      } else {
        frame = 0;
        last = 0;
      }
    };
    const run = () => {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(step);
      }
    };

    // Is the ball on screen (below the header)?
    const ballOnScreen = () => {
      const r = ball.getBoundingClientRect();
      return r.bottom > HEADER && r.top < window.innerHeight;
    };
    // The first point of the line that is on screen, just below the header
    const lineStartOnScreen = () => {
      const rect = section.getBoundingClientRect();
      const y = (HEADER + 8 - rect.top) / scale();
      const i = samples.findIndex((sy) => sy >= y);
      return i === -1 ? null : i * 4;
    };

    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = lineStartOnScreen();
          at = start === null ? 0 : Math.max(0, start);
          place();
          ball.style.opacity = "1";
          run();
        }
      },
      { threshold: 0.2 },
    );
    seen.observe(section);

    // After a scroll that leaves the ball off screen, it disappears and comes back at the
    // start of the part of the line now on screen, then rolls on from there.
    let scrollTimer = 0;
    let fadeTimer = 0;
    const onScroll = () => {
      if (!started) return;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        if (ballOnScreen()) return;
        const start = lineStartOnScreen();
        if (start === null) return;
        ball.style.opacity = "0";
        window.clearTimeout(fadeTimer);
        fadeTimer = window.setTimeout(() => {
          at = start;
          place();
          ball.style.opacity = "1";
          run();
        }, 200);
      }, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    place();
    return () => {
      seen.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(fadeTimer);
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
        className="pointer-events-none absolute left-0 top-0 z-10 hidden rounded-full bg-coral opacity-0 shadow-[0_2px_6px_rgba(229,107,111,0.45)] transition-opacity duration-200 will-change-transform sm:block"
        style={{ width: SIZE, height: SIZE }}
      />
    </>
  );
}
