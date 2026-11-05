"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { ComponentType } from "react";
import { FILMNET_DS_SECTIONS, FilmnetDsContent } from "./FilmnetDs";
import { FILMNET_TV_SECTIONS, FilmnetTvContent } from "./FilmnetTv";
import "./case-study.css";

export type CaseStudyId = "filmnet-tv" | "filmnet-ds";

const STUDIES: Record<
  CaseStudyId,
  { title: string; sections: { id: string; label: string }[]; Content: ComponentType<{ onClose: () => void }> }
> = {
  "filmnet-tv": { title: "Filmnet TV", sections: FILMNET_TV_SECTIONS, Content: FilmnetTvContent },
  "filmnet-ds": { title: "Filmnet Design System", sections: FILMNET_DS_SECTIONS, Content: FilmnetDsContent },
};

/*
 * A case study opens over the page, like a sheet. It scrolls on its own, has its own top bar
 * (blurred once you scroll, like the site header) with a Close button, and a section rail at the
 * bottom. Esc or Close shuts it and puts focus back on the button that opened it.
 */
export function CaseStudyModal({ id, onClose }: { id: CaseStudyId; onClose: () => void }) {
  const study = STUDIES[id];
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(study.sections[0].id);

  // lock the page behind, focus Close, Esc to close, give focus back afterwards
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);

  // blurred bar once the sheet scrolls; highlight the section in view
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const onScroll = () => setScrolled(root.scrollTop > 8);
    root.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id.replace(/^cs-/, ""))),
      { root, rootMargin: "-45% 0px -50% 0px" },
    );
    study.sections.forEach(({ id: sid }) => {
      const el = root.querySelector(`#cs-${sid}`);
      if (el) io.observe(el);
    });
    return () => {
      root.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [study]);

  // keep the active pill visible inside the rail
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(".on");
    if (nav && link) nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
  }, [active]);

  const jump = (sid: string) => {
    const root = scroller.current;
    const el = root?.querySelector<HTMLElement>(`#cs-${sid}`);
    if (!root || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.scrollTo({ top: el.offsetTop - 80, behavior: reduce ? "auto" : "smooth" });
  };

  // Rendered into <body>: the projects deck is its own stacking layer, which would keep the sheet
  // under the fixed site header.
  return createPortal(
    <div className="cs-overlay" role="dialog" aria-modal="true" aria-label={`${study.title} case study`}>
      <div ref={scroller} className="cs cs-sheet">
        <header className={`bar wrap ${scrolled ? "scrolled" : ""}`}>
          <div className="in">
            <span className="brand">
              Sarv<small>{study.title} · case study</small>
            </span>
            <button ref={closeBtn} type="button" className="pill glass close" onClick={onClose}>
              <XMarkIcon className="size-[18px]" aria-hidden />
              Close
            </button>
          </div>
        </header>

        <study.Content onClose={onClose} />

        <div className="rail wrap">
          <nav ref={navRef} className="glass" aria-label="Case study sections">
            {study.sections.map(({ id: sid, label }) => (
              <button key={sid} type="button" className={sid === active ? "on" : undefined} onClick={() => jump(sid)}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>,
    document.body,
  );
}
