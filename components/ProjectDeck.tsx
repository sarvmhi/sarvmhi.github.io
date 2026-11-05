"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import dynamic from "next/dynamic";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { asset } from "@/lib/asset";
import type { Project } from "@/lib/content";

// Loaded only when a case study is opened, so the home page stays light
const CaseStudyModal = dynamic(() => import("@/components/case-study/CaseStudyModal").then((m) => m.CaseStudyModal));

/*
 * Figma frame 4: a deck of three cards. The open project is the big card in front;
 * the next ones wait behind it, smaller. Arrows, arrow keys, a swipe or a click on a
 * waiting card move the deck.
 *
 * From tablets up the whole section fits on one screen: the deck takes whatever height is
 * left after the text and controls (--deck-h in globals.css, at most Figma's 435px) and the
 * cards are sized from that height. Figma's geometry in a 1280 x 435 area is 580 at (0,0),
 * 436 at (518,54) and 348 at (932,87). The cards keep those proportions, so they always
 * overlap like a deck: on a short screen the deck gets smaller and stays on the left, and on a
 * narrow one the cards squeeze closer so the small one never passes the right edge.
 * Phones use a tighter stack.
 */
const SLOTS = [
  "z-30 left-0 top-0 w-[86%] md:w-auto md:h-full",
  "z-20 left-[15%] top-[4.65%] w-[78%] md:w-auto md:left-[min(calc(50%_-_0.2805*var(--deck-h)),calc(1.1908*var(--deck-h)))] md:top-[12.41%] md:h-[75.17%]",
  "z-10 left-[30%] top-[9.3%] w-[70%] md:w-auto md:left-[min(calc(100%_-_0.8*var(--deck-h)),calc(2.1425*var(--deck-h)))] md:top-[20%] md:h-[60%]",
];
// With more than three projects, the rest wait hidden behind the last card, ready to slide in.
// (Without a slot they had no size or place and showed at full image size.)
const HIDDEN_SLOT = `${SLOTS[2].replace("z-10", "z-0")} opacity-0 pointer-events-none`;
const slotClass = (slot: number) => SLOTS[slot] ?? HIDDEN_SLOT;

export function ProjectDeck({
  projects,
  title,
  label = "Project carousel",
  className = "pt-10",
}: {
  projects: Project[];
  /** Section title above the deck; leave out for a deck that follows another one */
  title?: string;
  label?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [openStudy, setOpenStudy] = useState<NonNullable<Project["caseStudy"]> | null>(null);
  const closeStudy = useCallback(() => setOpenStudy(null), []);
  const count = projects.length;
  const swipe = useRef<{ x: number; id: number } | null>(null);

  const deckRef = useRef<HTMLDivElement>(null);

  // As the deck scrolls into view, the two waiting cards slide out from behind the front card
  // to their places (and back in when scrolling up). Done by hand on scroll, as a translate on
  // top of each card's slot position, so the arrows' left/top transitions still work.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = deck.getBoundingClientRect().top;
      // 0 while the deck's top is at the bottom of the screen, 1 once it is 45% from the top
      const r = Math.min(1, Math.max(0, (vh - top) / (vh * 0.55)));
      const out = 1 - (1 - r) ** 3; // eases out
      deck.querySelectorAll<HTMLElement>("[data-deck-slot]").forEach((card) => {
        const slot = Number(card.dataset.deckSlot);
        if (slot === 0 || out === 1) {
          card.style.translate = "";
          card.style.rotate = "";
          return;
        }
        card.style.translate = `${-(1 - out) * card.offsetLeft}px ${-(1 - out) * card.offsetTop}px`;
        card.style.rotate = `${-(1 - out) * 4 * slot}deg`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

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
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      // isolate: the cards' stacking order stays inside the deck, under the fixed header
      className={`project-deck isolate ${className}`}
    >
      {title && (
        <h2 className="mb-8 font-display text-[calc(28px/var(--section-zoom,1))] font-bold leading-normal text-rose">{title}</h2>
      )}
      <div
        ref={deckRef}
        className="relative aspect-[1/0.645] touch-pan-y md:aspect-auto md:h-(--deck-h)"
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
              data-deck-slot={slot}
              onClick={isFront ? undefined : () => go(i)}
              className={`absolute aspect-[4/3] overflow-hidden rounded-[16px] bg-white shadow-card transition-[left,top,width,height,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${slotClass(slot)} ${isFront ? "" : "cursor-pointer"}`}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(p.image)} alt="" className="size-full object-cover" draggable={false} />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 md:mt-10" aria-live="polite">
        <h3 className="font-display text-[30px] font-extrabold leading-[1.05] sm:text-[36px]">{project.title}</h3>
        <p className="mt-[10px] flex items-baseline gap-x-[18px] font-medium leading-normal">
          <span className="text-[18px] font-bold text-rose">{project.field}:</span>
          {project.tags.map((tag) => (
            <span key={tag} className="text-[16px] text-muted">
              {tag}
            </span>
          ))}
        </p>
        <p className="mt-[3px] max-w-[520px] text-[16px] font-medium leading-[1.55] sm:text-[18px]">
          {project.description}
        </p>
      </div>

      <div className="mt-[26px] flex items-center justify-between gap-4">
        {project.caseStudy ? (
          <button
            type="button"
            onClick={() => setOpenStudy(project.caseStudy!)}
            aria-haspopup="dialog"
            className="glass glass-active flex items-center gap-1 p-[14px] text-[14px] font-bold leading-[22px]"
          >
            View Case Study
            <ArrowUpRightIcon className="size-[22px] p-[3px]" aria-hidden />
          </button>
        ) : project.caseStudyUrl ? (
          <a
            href={project.caseStudyUrl.startsWith("/") ? asset(project.caseStudyUrl) : project.caseStudyUrl}
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

      <div className="flex items-center gap-[10px] pt-[22px]">
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
      {openStudy && <CaseStudyModal id={openStudy} onClose={closeStudy} />}
    </div>
  );
}
