"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/** Sticky top bar: "Sarv" + back link. A blurred band fades in once the page moves. */
export function CaseStudyBar({ title }: { title: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`bar wrap ${scrolled ? "scrolled" : ""}`}>
      <div className="in">
        <a className="brand" href={asset("/")}>
          Sarv<small>{title} · case study</small>
        </a>
        <a className="pill glass" href={`${asset("/")}#projects`}>
          ← All projects
        </a>
      </div>
    </header>
  );
}

/** Sticky section rail at the bottom; the section in view is highlighted. */
export function SectionRail({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  // keep the active pill visible inside the rail without scrolling the page
  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(".on");
    if (nav && link) nav.scrollLeft = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
  }, [active]);

  return (
    <div className="rail wrap">
      <nav ref={navRef} className="glass" aria-label="Case study sections">
        {items.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className={id === active ? "on" : undefined}>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
