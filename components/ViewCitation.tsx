"use client";

import { useState } from "react";

/** Underlined text link under the summary; shows the full citation below it. */
export function ViewCitation({ citation }: { citation: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="text-[14px] font-bold text-rose underline decoration-1 underline-offset-[3px] hover:decoration-2"
      >
        {open ? "Hide publication" : "View publication"}
      </button>
      {open && <p className="mt-2 select-text text-[14px] font-medium leading-[1.55] text-ink/75">{citation}</p>}
    </div>
  );
}
