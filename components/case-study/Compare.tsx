"use client";

import { useState, type CSSProperties } from "react";
import { IconArrowsHorizontal } from "@tabler/icons-react";
import { asset } from "@/lib/asset";

/** Before / after slider: the "before" screen sits on top and is clipped at the handle. */
export function Compare({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="cmp-wrap">
      <span className="tag b">Before</span>
      <span className="tag a">After</span>
      <div className="cmp" style={{ "--pos": `${pos}%` } as CSSProperties}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(after)} alt={`${label} after the redesign`} width={1500} height={993} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="before" src={asset(before)} alt={`${label} before the redesign`} width={1500} height={993} />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Compare ${label.toLowerCase()} before and after`}
        />
        <div className="handle" />
        <div className="grip" aria-hidden>
          <IconArrowsHorizontal size={18} stroke={2} />
        </div>
      </div>
    </div>
  );
}
