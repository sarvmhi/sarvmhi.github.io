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
        className="text-[13px] font-semibold text-rose underline decoration-1 underline-offset-[3px] hover:decoration-2"
      >
        {open ? "Hide citation" : "View citation"}
      </button>
      {open && <p className="mt-2 select-text text-[12.5px] leading-[1.55] text-ink/75">{citation}</p>}
    </div>
  );
}
