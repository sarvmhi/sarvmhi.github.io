import type { ReactNode } from "react";

/* Rose bar with a line-and-dot connector to each row, as in Education, Languages and Experience */

export function Connector({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`absolute flex h-[11px] w-[47px] items-center ${className}`}>
      <span className="h-px w-[42px] bg-rose" />
      <span className="-ml-[5px] size-[10.5px] shrink-0 rounded-full bg-rose" />
    </span>
  );
}

export function RoseBar({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`absolute left-0 top-0 h-full w-2 rounded-2xl bg-rose ${className}`} />;
}

/* Dotted leader between a label and its value ("BSc. … 2019-2024") */
export function Leader({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`w-[38px] shrink-0 self-baseline border-b-[1.5px] border-dotted border-ink ${className}`}
    />
  );
}

export function SectionTitle({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2 id={id} className={`font-display text-[28px] font-bold leading-normal text-rose ${className}`}>
      {children}
    </h2>
  );
}
