import type { CSSProperties } from "react";
import { SectionTitle } from "@/components/BarList";
import { HowIWorkBall } from "@/components/HowIWorkBall";
import { asset } from "@/lib/asset";
import { howIWork, type Tool } from "@/lib/content";

/*
 * "How I Work" from Figma: four note cards pinned along a hand-drawn line.
 * From the sm breakpoint up the cards keep their Figma positions (545 x 1180 area);
 * on phones they stack and the line, dots and clips are left out.
 */
const CARD_TOPS = [113, 392, 677, 959];
const DOTS: [number, number][] = [
  [495, 329],
  [495, 612],
  [494, 896],
];

// Paperclips, relative to their card: the back half sits under the card, the front half over it
const CLIPS: Record<number, { back: [number, number]; front: [number, number]; mirrored?: boolean }> = {
  0: { back: [386, -44], front: [388, -28] },
  3: { back: [47, -49], front: [48, -33], mirrored: true },
};

function ToolItem({ tool }: { tool: Tool }) {
  const size = tool.size ?? 32;
  return (
    <li className="flex items-center gap-1 text-[16px] leading-normal">
      <span className="flex size-8 shrink-0 items-center justify-center">
        {tool.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(tool.logo)} alt="" aria-hidden className="max-h-full max-w-full" style={{ height: size, width: size }} />
        ) : (
          // TODO: logo still missing; see lib/content.ts
          <span aria-hidden className="size-8 rounded-md bg-placeholder" />
        )}
      </span>
      {tool.name}
    </li>
  );
}

function Clips({ part }: { part: "back" | "front" }) {
  const [w, h] = part === "back" ? [48, 80] : [45, 55];
  return Object.entries(CLIPS).map(([index, clip]) => {
    const [x, y] = clip[part];
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={index}
        src={asset(`/assets/clips/clip-${part}.webp`)}
        alt=""
        aria-hidden
        className={`absolute hidden max-w-none sm:block ${clip.mirrored ? "-scale-x-100" : ""}`}
        style={{ left: 14 + x, top: CARD_TOPS[Number(index)] + y, width: w, height: h }}
      />
    );
  });
}

export function HowIWork() {
  return (
    <section className="relative sm:h-[1180px] sm:w-[545px]" aria-labelledby="how-i-work">
      <SectionTitle id="how-i-work" className="relative z-10">
        How I Work
      </SectionTitle>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/assets/decor/how-i-work-line.svg")}
        alt=""
        aria-hidden
        className="absolute left-[-1.8px] top-[97px] hidden h-[1082px] w-[547px] max-w-none sm:block"
      />
      {DOTS.map(([x, y]) => (
        <span
          key={y}
          aria-hidden
          className="absolute hidden size-[44px] rounded-full bg-coral sm:block"
          style={{ left: x, top: y }}
        />
      ))}

      <HowIWorkBall />

      {/* back halves of the clips go under the cards, so they come first */}
      <Clips part="back" />

      <ol className="mt-14 flex flex-col gap-14 sm:mt-0 sm:block">
        {howIWork.map((step, i) => {
          const right = step.align === "right";
          return (
            <li
              key={step.number}
              className="relative max-w-[480px] rounded-[16px] bg-white px-5 pb-[14px] pt-10 shadow-card sm:absolute sm:left-[14px] sm:top-(--top) sm:h-[200px] sm:w-[480px] sm:px-0"
              style={{ "--top": `${CARD_TOPS[i]}px` } as CSSProperties}
            >
              <h3
                className={`absolute top-[-28px] flex items-start gap-2 ${right ? "right-5" : "left-5"}`}
              >
                <span className="text-[44px] font-bold leading-normal text-clay">{step.number}</span>
                <span className="mt-2 font-display text-[28px] font-bold leading-normal">{step.title}</span>
              </h3>

              <ul className="list-[square] pl-[27px] text-[17px] leading-[30px] marker:text-ink sm:pl-[47px] sm:text-[18px]">
                {step.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>

              <ul
                aria-label="Tools"
                className="mt-6 flex flex-wrap gap-x-7 gap-y-3 sm:flex-nowrap sm:pl-8"
              >
                {step.tools.map((tool) => (
                  <ToolItem key={tool.name} tool={tool} />
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <Clips part="front" />
    </section>
  );
}
