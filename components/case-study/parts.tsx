import type { ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";

// Building blocks shared by every case study: section cards, the arrows between them, accents.

/** Dashed rose arrow between two cards */
export function Flow() {
  return (
    <div className="flow" aria-hidden>
      <span className="flow-line" />
      <IconChevronDown className="flow-head" size={22} stroke={2.25} />
    </div>
  );
}

export function Card({
  id,
  no,
  label,
  mine,
  title,
  intro,
  children,
}: {
  id: string;
  no: string;
  label: string;
  mine?: boolean;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card" id={`cs-${id}`}>
      <span className="step-no">{no}</span>
      <div className="head">
        {mine && <span className="mine">My work</span>}
        <span className="label">{label}</span>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export const A = ({ children }: { children: ReactNode }) => <em className="accent">{children}</em>;
