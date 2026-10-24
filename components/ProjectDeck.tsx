"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/content";

/*
 * Figma frame 4: a deck of three cards. The open project is the big card in front;
 * the next ones wait behind it, smaller. Arrows, arrow keys, a swipe or a click on a
 * waiting card move the deck.
 *
 * Slot geometry. Desktop (md+) is Figma's: in a 1280 x 435 area, cards of
 * 580 at (0,0), 436 at (518,54) and 348 at (932,87). Phones use a tighter stack.
 */
const SLOTS = [
  "z-30 left-0 top-0 w-[86%] md:w-[45.3125%]",
  "z-20 left-[15%] top-[4.65%] w-[78%] md:left-[40.46875%] md:top-[12.414%] md:w-[34.0625%]",
  "z-10 left-[30%] top-[9.3%] w-[70%] md:left-[72.8125%] md:top-[20%] md:w-[27.1875%]",
];

export function ProjectDeck({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const count = projects.length;
  const swipe = useRef<{ x: number; id: number } | null>(null);

  const go = (index: number) => setActive(((index % count) + count) % count);
  const project = projects[active];

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipe.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Projects"
      onKeyDown={onKeyDown}
      className="mx-auto max-w-[1440px] px-5 pt-10 md:px-10 lg:pt-[86px] xl:px-[80px]"
    >
      <div
        className="relative aspect-[1/0.645] touch-pan-y md:aspect-[1280/435]"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (swipe.current = null)}
      >
        {projects.map((p, i) => {
          const slot = (i - active + count) % count;
          const isFront = slot === 0;
          return (
            <div
              key={p.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${p.title}`}
              aria-hidden={!isFront}
              onClick={isFront ? undefined : () => go(i)}
              className={`absolute aspect-[4/3] overflow-hidden rounded-[16px] bg-white shadow-card transition-[left,top,width] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${SLOTS[slot]} ${isFront ? "" : "cursor-pointer"}`}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(p.image)} alt="" className="size-full object-cover" draggable={false} />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 md:mt-[113px]" aria-live="polite">
        <h1 className="font-display text-[30px] font-extrabold leading-[1.05] sm:text-[36px]">{project.title}</h1>
        <p className="mt-[10px] flex items-baseline gap-x-[18px] font-instrument font-semibold leading-normal">
          <span className="text-[20px] text-rose">{project.field}:</span>
          {project.tags.map((tag) => (
            <span key={tag} className="text-[16px] text-muted">
              {tag}
            </span>
          ))}
        </p>
        <p className="mt-[3px] max-w-[520px] font-instrument text-[16px] font-normal leading-[1.55]">
          {project.description}
        </p>
      </div>

      <div className="mt-[26px] flex items-center justify-between gap-4">
        {project.caseStudyUrl ? (
          <a
            href={project.caseStudyUrl}
            className="glass glass-active flex items-center gap-1 p-[14px] text-[14px] font-bold leading-[22px]"
          >
            View Case Study
            <ArrowUpRightIcon className="size-[22px] p-[3px]" aria-hidden />
          </a>
        ) : (
          <span
            role="link"
            aria-disabled
            title="Case study coming soon"
            className="glass glass-active flex items-center gap-1 p-[14px] text-[14px] font-bold leading-[22px]"
          >
            View Case Study
            <ArrowUpRightIcon className="size-[22px] p-[3px]" aria-hidden />
          </span>
        )}

        <div className="flex gap-3 opacity-80">
          <button type="button" onClick={() => go(active - 1)} className="glass flex size-[50px] items-center justify-center" aria-label="Previous project">
            <ArrowLeftIcon className="size-[22px] p-[2px]" aria-hidden />
          </button>
          <button type="button" onClick={() => go(active + 1)} className="glass flex size-[50px] items-center justify-center" aria-label="Next project">
            <ArrowRightIcon className="size-[22px] p-[2px]" aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-[10px] pb-12 pt-[22px]">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => go(i)}
            aria-label={`Show ${p.title}`}
            aria-current={i === active}
            className="group flex h-4 flex-1 items-center"
          >
            <span
              className={`block w-full rounded-[2px] transition-[height,background-color] duration-300 ${
                i === active ? "h-1 bg-rose" : "h-[2px] bg-track group-hover:bg-clay"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
