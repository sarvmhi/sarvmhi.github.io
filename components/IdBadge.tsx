"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { profile } from "@/lib/content";

// Barcode bars from Figma: [width, height]
const BARS: [number, number][] = [
  [6, 28], [3, 28], [3, 28], [3, 28], [3, 15], [3, 22], [6, 28], [3, 28], [3, 28],
  [3, 22], [3, 28], [3, 15], [3, 22], [3, 28], [3, 28], [3, 15], [6, 28], [1, 28],
];

// Lanyard art from Figma (raster, 335 x 2147) drawn 54px wide, so it is 346px tall.
const LANYARD_W = 54;
const LANYARD_H = Math.round((2147 / 335) * LANYARD_W);
const LANYARD_LEFT = 148; // from Figma: 1158 - 1010
const CLIP_OVERLAP = 27; // the clip bites 27px into the card
const PIVOT_Y = CLIP_OVERLAP - LANYARD_H; // top of the lanyard art, relative to the card top
// Navy strap inside the art: x 67 to 268 of 335
const STRAP_LEFT = LANYARD_LEFT + (67 / 335) * LANYARD_W;
const STRAP_W = (202 / 335) * LANYARD_W;
// Figma's two drop shadows on the lanyard
const LANYARD_SHADOW = "drop-shadow(4px 4px 4px rgb(0 0 0 / 0.25)) drop-shadow(-4px 0 4px rgb(0 0 0 / 0.25))";
const STRAP_SHADOW = "4px 4px 4px rgb(0 0 0 / 0.25), -4px 0 4px rgb(0 0 0 / 0.25)";

// A soft, slow spring: about 1.3s per swing, settling over a few seconds
const STIFFNESS = 22;
const DAMPING = 2.2;
const MAX_ANGLE = 16;
// Hovering: the cursor brushes the badge, it never yanks it
const HOVER_PUSH = 0.3; // degrees per second added per pixel of cursor movement
const HOVER_ENTER = 14; // degrees per second when the cursor first touches the badge
const HOVER_MAX_SPEED = 30;

export function IdBadge() {
  const swingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = swingRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const card = el.querySelector<HTMLElement>("[data-badge-card]");
    if (!card) return;

    let angle = 0;
    let velocity = 0;
    let dragging = false;
    let pointerId = -1;
    let startX = 0;
    let startAngle = 0;
    let lever = 500;
    let lastTime = 0;
    let lastAngle = 0;
    let frame = 0;

    const apply = () => {
      el.style.transform = `rotate(${angle.toFixed(3)}deg)`;
    };

    const step = (time: number) => {
      const dt = Math.min(0.032, (time - (lastTime || time)) / 1000);
      lastTime = time;
      if (!dragging) {
        const accel = -STIFFNESS * angle - DAMPING * velocity;
        velocity += accel * dt;
        angle += velocity * dt;
      }
      apply();
      if (dragging || Math.abs(angle) > 0.01 || Math.abs(velocity) > 0.01) {
        frame = requestAnimationFrame(step);
      } else {
        angle = 0;
        velocity = 0;
        apply();
        frame = 0;
        lastTime = 0;
      }
    };

    const run = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const clampSpeed = (v: number) => Math.max(-HOVER_MAX_SPEED, Math.min(HOVER_MAX_SPEED, v));

    // A positive rotate() moves the card left, so a push to the right is a negative velocity
    const onEnter = (e: PointerEvent) => {
      if (reduced || dragging || e.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const fromLeft = e.clientX < rect.left + rect.width / 2;
      const push = e.movementX !== 0 ? -e.movementX * HOVER_PUSH * 2 : fromLeft ? -HOVER_ENTER : HOVER_ENTER;
      velocity = clampSpeed(velocity + push);
      run();
    };

    const onHoverMove = (e: PointerEvent) => {
      if (reduced || dragging || e.pointerType !== "mouse") return;
      velocity = clampSpeed(velocity - e.movementX * HOVER_PUSH);
      run();
    };

    const onDown = (e: PointerEvent) => {
      if (reduced || e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startAngle = angle;
      const rect = el.getBoundingClientRect();
      // distance from the pivot (top of the lanyard art) to where the badge was grabbed
      const pivotY = rect.top + PIVOT_Y;
      lever = Math.max(200, e.clientY - pivotY);
      lastAngle = angle;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
      run();
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const next = startAngle - (Math.atan2(dx, lever) * 180) / Math.PI;
      angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, next));
      velocity = (angle - lastAngle) * 60;
      lastAngle = angle;
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragging = false;
      el.style.cursor = "";
      run();
    };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointermove", onHoverMove);
    card.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    // One gentle swing when the page opens
    let intro = 0;
    if (!reduced) {
      intro = window.setTimeout(() => {
        angle = 4;
        velocity = 0;
        run();
      }, 250);
    }

    return () => {
      window.clearTimeout(intro);
      cancelAnimationFrame(frame);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointermove", onHoverMove);
      card.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const { badge } = profile;

  return (
    <div className="relative h-[546px] w-[350px]">
      <div
        ref={swingRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: `${LANYARD_LEFT + LANYARD_W / 2}px ${PIVOT_Y}px` }}
      >
        {/* strap continues up past the top of the page */}
        <div
          aria-hidden
          className="absolute bg-[#26314a]"
          style={{ left: STRAP_LEFT, width: STRAP_W, top: PIVOT_Y - 1400, height: 1402, boxShadow: STRAP_SHADOW }}
        />

        <article
          data-badge-card
          aria-label={`ID badge: ${profile.name}, ${profile.role}`}
          className="absolute inset-0 cursor-grab touch-pan-y select-none overflow-hidden rounded-[16px] bg-clay shadow-card"
        >
          <div className="absolute inset-x-0 bottom-0 top-[24.27px] rounded-b-[16px] bg-white" />
          <div className="absolute left-[148px] top-[20px] h-[12px] w-[54px] rounded-[40px] bg-slot" />

          <div className="absolute left-[45px] top-[35px] h-[240px] w-[260px] overflow-hidden rounded-[10px] bg-placeholder">
            {badge.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={asset(badge.photo)}
                alt={profile.name}
                className="size-full object-cover"
                draggable={false}
              />
            )}
          </div>

          <div className="absolute left-[45px] top-[294px] flex w-[260px] flex-col items-center gap-[2px] font-bold leading-normal">
            <p className="text-[22px]">{profile.name}</p>
            <p className="text-[18px]">{profile.role}</p>
          </div>

          <div className="absolute left-[45px] top-[352px] h-[131px] w-[260px] rounded-[16px] border border-muted/30" />
          <dl className="absolute left-[60px] top-[363px] flex h-[100px] w-[114px] flex-col justify-between text-[14px]">
            <div className="flex flex-col gap-[3px]">
              <dt className="font-bold leading-normal">Specializations</dt>
              <dd className="whitespace-nowrap leading-5 text-muted">{badge.specializations}</dd>
            </div>
            <div className="flex flex-col gap-[3px]">
              <dt className="font-bold leading-normal">Focus</dt>
              <dd className="leading-5 text-muted">{badge.focus}</dd>
            </div>
          </dl>
          <dl className="absolute left-[192px] top-[363px] flex w-[97px] flex-col gap-5 text-[14px]">
            <div className="flex flex-col gap-[3px]">
              <dt className="font-bold leading-normal">Status</dt>
              <dd className="flex items-center gap-[5px] whitespace-nowrap leading-5 text-open">
                <span className="size-2 shrink-0 rounded-full bg-open" aria-hidden />
                {badge.status}
              </dd>
            </div>
            <div className="flex flex-col gap-[3px]">
              <dt className="font-bold leading-normal">Work Mode</dt>
              <dd className="leading-5 text-muted">{badge.workMode}</dd>
            </div>
          </dl>

          <div className="absolute left-[193px] top-[496px] flex items-end gap-[3px]" aria-hidden>
            {BARS.map(([w, h], i) => (
              <span key={i} className="block bg-ink" style={{ width: w, height: h }} />
            ))}
          </div>
          <p className="absolute left-[45px] top-[510px] text-[14px] leading-normal text-muted">{badge.id}</p>
        </article>

        {/* lanyard clip sits over the card */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/assets/badge/lanyard.webp")}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute max-w-none"
          style={{ left: LANYARD_LEFT, top: PIVOT_Y, width: LANYARD_W, height: LANYARD_H, filter: LANYARD_SHADOW }}
        />
      </div>
    </div>
  );
}
