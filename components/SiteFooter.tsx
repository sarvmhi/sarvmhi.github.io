import type { ReactNode } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { contact, profile } from "@/lib/content";

// Brand marks from Simple Icons (CC0)
const GITHUB = "M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";
const SCHOLAR = "M5.242 13.769L0 9.5L12 0l12 9.5l-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269M12 10a7 7 0 1 0 0 14a7 7 0 0 0 0-14";

function Brand({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[22px]" fill="currentColor">
      <path d={d} />
    </svg>
  );
}

function Contact({ href, label, children }: { href: string | null; label: string; children: ReactNode }) {
  const className =
    "glass flex size-[50px] items-center justify-center text-white";
  if (!href) {
    return (
      <span role="link" aria-disabled="true" aria-label={`${label} (coming soon)`} title={`${label}: link coming soon`} className={className}>
        {children}
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      className={className}
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-[#656e89] px-page pb-32 pt-20 text-white md:mt-24 md:pb-20 md:pt-24">
      <div className="ui-scale mx-auto flex max-w-[1280px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-[36px] font-extrabold leading-tight md:text-[44px]">Let’s get in touch</h2>
          <ul className="mt-8 flex gap-2">
            <li>
              <Contact href={contact.email && `mailto:${contact.email}`} label="Email">
                <EnvelopeIcon className="size-[22px]" aria-hidden />
              </Contact>
            </li>
            <li>
              <Contact href={contact.scholar} label="Google Scholar">
                <Brand d={SCHOLAR} />
              </Contact>
            </li>
            <li>
              <Contact href={contact.github} label="GitHub">
                <Brand d={GITHUB} />
              </Contact>
            </li>
          </ul>
        </div>
        <p className="text-[13px] text-white/70">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
