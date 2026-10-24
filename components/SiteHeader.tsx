"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
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

type Icon = ComponentType<SVGProps<SVGSVGElement>>;
type NavItem = { href: string | null; label: string; icon: Icon; activeIcon: Icon };

const NAV: NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon, activeIcon: HomeSolid },
  { href: "/about/", label: "About Me", icon: UserIcon, activeIcon: UserSolid },
  { href: "/experience/", label: "Experience", icon: BriefcaseIcon, activeIcon: BriefcaseSolid },
  { href: "/projects/", label: "Projects", icon: CommandLineIcon, activeIcon: CommandLineSolid },
  // No page designed for this one yet
  { href: null, label: "Research", icon: DocumentTextIcon, activeIcon: DocumentTextIcon },
];

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function SiteHeader() {
  const pathname = normalize(usePathname() ?? "/");
  const isHome = pathname === "/";

  return (
    <header className="relative z-30 h-[74px]">
      {isHome && (
        <Link
          href="/"
          className="absolute left-5 top-[24px] font-display text-[20px] font-semibold italic leading-normal md:left-[72px] md:top-[35px]"
        >
          Sarv
        </Link>
      )}

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-4 z-40 flex justify-center md:absolute md:bottom-auto md:top-[24px]"
      >
        <ul className="flex items-center gap-1.5 rounded-full md:gap-2 bg-page/75 p-1 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">
          {NAV.map((item) => {
            const active = item.href !== null && normalize(item.href) === pathname;
            const IconCmp = active ? item.activeIcon : item.icon;

            if (item.href === null) {
              return (
                <li key={item.label}>
                  <span
                    role="link"
                    aria-disabled="true"
                    aria-label={`${item.label} (coming soon)`}
                    title="Research page coming soon"
                    className="glass flex size-[50px] cursor-default items-center justify-center"
                  >
                    <IconCmp className="size-[22px]" aria-hidden />
                  </span>
                </li>
              );
            }

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={active ? undefined : item.label}
                  className={
                    active
                      ? "glass glass-active flex h-[50px] w-[124px] items-center justify-center gap-1 px-3"
                      : "glass flex size-[50px] items-center justify-center"
                  }
                >
                  <IconCmp className="size-[22px] shrink-0" aria-hidden />
                  {active && (
                    <span className="whitespace-nowrap text-[14px] font-bold leading-normal">{item.label}</span>
                  )}
                </Link>
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
