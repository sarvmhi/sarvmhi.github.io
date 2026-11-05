import type { ReactNode } from "react";

// Building blocks shared by every case study: section cards, the arrows between them, accents.

/** Dashed rose arrow between two cards */
export function Flow() {
  return (
    <div className="flow" aria-hidden>
      <svg viewBox="0 0 24 84">
        <path className="l" d="M12 4 V70" />
        <path className="h" d="M5 68 L12 80 L19 68 Z" />
      </svg>
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
