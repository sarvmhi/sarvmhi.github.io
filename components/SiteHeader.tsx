"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type SVGProps,
} from "react";
import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  CommandLineIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  UserIcon as UserSolid,
  BriefcaseIcon as BriefcaseSolid,
  CommandLineIcon as CommandLineSolid,
} from "@heroicons/react/24/solid";
import { asset } from "@/lib/asset";
import { profile } from "@/lib/content";
import { SECTIONS, type SectionId } from "@/lib/sections";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<SectionId, { outline: Icon; solid: Icon }> = {
  home: { outline: HomeIcon, solid: HomeSolid },
  about: { outline: UserIcon, solid: UserSolid },
  experience: { outline: BriefcaseIcon, solid: BriefcaseSolid },
  projects: { outline: CommandLineIcon, solid: CommandLineSolid },
};

// Nav items: the four sections, then Research, which has no page yet
const ITEMS = [
  ...SECTIONS.map((s) => ({ ...s, disabled: false })),
  { id: "research", label: "Research", disabled: true },
] as const;

// A section counts as "in view" once its top passes 40% down the screen
const VIEW_LINE = 0.4;

/** Which section is in view, kept in sync with scrolling and with the address bar. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("home");
  // While a nav click is scrolling the page, hold the clicked section instead of
  // stepping through every section on the way.
  const lock = useRef<SectionId | null>(null);

  useEffect(() => {
    let frame = 0;
    let unlockTimer = 0;

    const compute = () => {
      frame = 0;
      if (lock.current) return;
      const line = window.innerHeight * VIEW_LINE;
      let current: SectionId = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = SECTIONS[SECTIONS.length - 1].id;
      setActive(current);
    };

    const onScroll = () => {
      if (lock.current) {
        // smooth scrolling has no reliable "done" event everywhere, so wait for a pause
        window.clearTimeout(unlockTimer);
        unlockTimer = window.setTimeout(() => {
          lock.current = null;
          compute();
        }, 150);
        return;
      }
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(unlockTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Keep the address bar pointing at the section in view, so a copied link opens there
  useEffect(() => {
    const url = active === "home" ? window.location.pathname : `#${active}`;
    if (url !== window.location.pathname + window.location.hash) window.history.replaceState(null, "", url);
  }, [active]);

  const goTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lock.current = id;
    setActive(id);
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    // if the page was already there, no scroll event comes to release the lock
    window.setTimeout(() => {
      if (lock.current === id && Math.abs(el.getBoundingClientRect().top) < 2) lock.current = null;
    }, 100);
  };

  return { active, goTo };
}

export function SiteHeader() {
  const { active, goTo } = useActiveSection();
  // The item under the mouse (or keyboard focus) opens up to show its name;
  // otherwise the section in view does.
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNavClick = (e: MouseEvent, id: SectionId) => {
    e.preventDefault();
    goTo(id);
  };

  return (
    <header className="ui-scale fixed inset-x-0 top-0 z-30 h-[74px]">
      {/* Backdrop once the page moves, so the pills stay readable over content. It sits on its
          own layer: a backdrop-filter on the header would trap the fixed mobile nav inside it. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-page/80 backdrop-blur-md transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <a
        href="#home"
        onClick={(e) => onNavClick(e, "home")}
        className="absolute left-(--page-margin-scaled) top-[24px] font-display text-[20px] font-semibold italic leading-normal md:top-[35px]"
      >
        Sarv
      </a>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-4 z-40 flex justify-center md:absolute md:bottom-auto md:top-[24px]"
      >
        <ul
          onPointerLeave={() => setHovered(null)}
          className="flex items-center gap-1.5 rounded-full bg-page/75 p-1 backdrop-blur-md md:gap-2 md:bg-transparent md:p-0 md:backdrop-blur-none"
        >
          {ITEMS.map((item) => {
            const isActive = item.id === active;
            const open = hovered === null ? isActive : hovered === item.id;
            const icons = item.disabled ? null : ICONS[item.id as SectionId];
            const IconCmp = icons ? (isActive ? icons.solid : icons.outline) : DocumentTextIcon;
            const className = `glass flex h-[50px] items-center justify-center overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "w-[124px]" : "w-[50px]"
            } ${isActive ? "glass-active" : ""}`;
            const handlers = {
              onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setHovered(item.id),
              onFocus: (e: FocusEvent<HTMLElement>) =>
                e.currentTarget.matches(":focus-visible") && setHovered(item.id),
              onBlur: () => setHovered(null),
            };
            const content = (
              <>
                <IconCmp className="size-[22px] shrink-0" aria-hidden />
                <span
                  className={`overflow-hidden whitespace-nowrap text-[14px] font-bold leading-normal transition-[max-width,opacity,margin] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    open ? "ml-1 max-w-[84px] opacity-100" : "ml-0 max-w-0 opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </>
            );

            return (
              <li key={item.id}>
                {item.disabled ? (
                  <span
                    role="link"
                    tabIndex={0}
                    aria-disabled="true"
                    aria-label={`${item.label} (coming soon)`}
                    title="Research page coming soon"
                    className={className}
                    {...handlers}
                  >
                    {content}
                  </span>
                ) : (
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => onNavClick(e, item.id as SectionId)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={item.label}
                    className={className}
                    {...handlers}
                  >
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <a
        href={asset(profile.cvFile)}
        download
        className="glass absolute right-5 top-[16px] flex h-[42px] items-center justify-center gap-1 px-3 text-[14px] font-bold leading-normal md:right-[36px] md:top-[24px] md:h-[50px] md:w-[124px]"
      >
        <ArrowDownTrayIcon className="size-[18px] md:hidden" aria-hidden />
        Download CV
      </a>
    </header>
  );
}
