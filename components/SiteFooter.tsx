import type { ReactNode } from "react";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import { contact, profile } from "@/lib/content";

// Contact icons are Tabler, like every other icon on the site
const ICON = "size-[22px]";

function Contact({ href, label, children }: { href: string | null; label: string; children: ReactNode }) {
  // Same pill as View Case Study: glass, bold 14px label, the site's glass hover
  const className =
    "glass flex items-center gap-2 py-[14px] pl-[14px] pr-[18px] text-[14px] font-bold leading-[22px] text-ink";
  if (!href) {
    return (
      <span role="link" aria-disabled="true" aria-label={`${label} (coming soon)`} title={`${label}: link coming soon`} className={className}>
        {children}
        {label}
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
      className={className}
    >
      {children}
      {label}
    </a>
  );
}

export function SiteFooter() {
  return (
    // A white card inside the page margins, rounded and shadowed like the other white cards
    <footer className="mt-28 px-page pb-24 md:mt-44 md:pb-10">
      <div className="ui-scale mx-auto flex max-w-[1280px] flex-col gap-8 rounded-[16px] bg-white px-6 pb-10 pt-14 text-ink shadow-card sm:flex-row sm:items-end sm:justify-between md:px-14 md:pb-14 md:pt-16">
        <div>
          <h2 className="font-display text-[28px] font-semibold leading-tight">Let’s get in touch</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            <li>
              <Contact href={contact.linkedin} label="LinkedIn">
                <IconBrandLinkedin className={ICON} stroke={1.75} aria-hidden />
              </Contact>
            </li>
            <li>
              <Contact href={contact.email && `mailto:${contact.email}`} label="Email">
                <IconMail className={ICON} stroke={1.75} aria-hidden />
              </Contact>
            </li>
            <li>
              <Contact href={contact.github} label="GitHub">
                <IconBrandGithub className={ICON} stroke={1.75} aria-hidden />
              </Contact>
            </li>
          </ul>
        </div>
        <p className="text-[14px] font-medium text-ink/60">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
