"use client";

import { useEffect, useRef, useState } from "react";

/** Outlined pill that copies the citation and says so for a moment. */
export function CopyCitation({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(citation);
    } catch {
      // Older browsers or no clipboard permission: copy through a hidden text field
      const field = document.createElement("textarea");
      field.value = citation;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex h-10 items-center rounded-full border-[1.5px] border-rose px-[18px] text-[14px] font-semibold text-rose transition-colors hover:bg-rose/10"
    >
      <span aria-live="polite">{copied ? "Citation copied" : "Copy citation"}</span>
    </button>
  );
}
