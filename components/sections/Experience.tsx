import type { CSSProperties } from "react";
import { Connector, RoseBar } from "@/components/BarList";
import { asset } from "@/lib/asset";
import { jobs, type Job } from "@/lib/content";

/*
 * Figma frame 3. From xl up this is a fixed 1280-wide stage (the 1440 frame minus its
 * 80px margins) with Figma's positions, x measured from the content edge and y from below
 * the header; between 1280 and 1440 it is zoomed to fit.
 * The road runs left to right in date order, so the list is in that order too.
 * Below xl the jobs stack and the road is left out.
 */
const STOPS: {
  job: Job;
  x: number;
  y: number;
  cardTop: number; // offsets inside the stop, to keep Figma's small misalignments
  barTop: number;
  gap: number; // card to bar
}[] = [
  { job: jobs.shabakeh, x: 0, y: 167, cardTop: 0, barTop: 4, gap: 19 },
  { job: jobs.filmnet, x: 411, y: 728, cardTop: 0, barTop: 0, gap: 21 },
  { job: jobs.freelance, x: 735, y: 171, cardTop: 2, barTop: 0, gap: 34 },
];

// Map pins sit on the peaks and the dip of the road
const PINS: [number, number][] = [
  [99, 502],
  [635, 619],
  [1132, 503],
];

function JobCard({ job }: { job: Job }) {
  const { logo } = job;
  return (
    <div className="flex h-[190px] w-[220px] shrink-0 flex-col items-start gap-3 rounded-[16px] bg-white py-6 pl-6 pr-[30px] shadow-job">
      {logo.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(logo.src)}
          alt={`${job.company} logo`}
          width={logo.width}
          height={logo.height}
          className="object-contain object-left"
        />
      ) : (
        // TODO: company logo still missing; see lib/content.ts
        <span aria-hidden className="rounded bg-placeholder" style={{ width: logo.width, height: logo.height }} />
      )}
      <div className="flex flex-col gap-1 leading-normal">
        <h3 className="text-[18px] font-bold">{job.role}</h3>
        <p className="text-[15px]">{job.company}</p>
        <p className="text-[14px]">{job.location}</p>
        <p className="text-[14px]">
          <time>{job.dates}</time>
        </p>
      </div>
    </div>
  );
}

// Left-aligned with normal word spacing (Figma's justified text left big gaps), and a
// hyphenated word like "e-commerce" never splits across two lines.
function keepHyphensTogether(text: string) {
  return text.split(/(\S*\w-\w\S*)/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

function Tasks({ job }: { job: Job }) {
  return (
    <div className="relative min-w-0 pb-10 pt-[10px] pl-[25px]">
      <RoseBar />
      <Connector className="left-2 top-[15.5px]" />
      <h4 className="pl-11 text-[18px] font-bold leading-normal">Completed Tasks</h4>
      <ul className="mt-9 flex max-w-[420px] flex-col gap-[22px] text-pretty text-[16px] leading-normal sm:w-[263px]">
        {job.tasks.map((task) => (
          <li key={task}>{keepHyphensTogether(task)}</li>
        ))}
      </ul>
    </div>
  );
}

function Road() {
  // Stand-in for the hand-drawn road in Figma ("2 upper peaks, 1 lower peak"), drawn through the
  // same peaks; it runs past the frame so wide screens are covered. Path points are in Figma
  // frame units: the frame starts 80px left of this stage and 74px above it (the header).
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-[-880px] top-[466px] hidden h-[220px] w-[3040px] overflow-visible xl:block"
      viewBox="-800 540 3040 220"
      fill="none"
    >
      <path
        d="M-800 741 C-500 741 -330 716 -169.5 708 C 0 700 80 625 195 625 C 330 625 520 741 731 741 C 940 741 1100 625 1228 625 C 1360 625 1450 700 1539.5 708 C 1700 716 1940 741 2240 741"
        stroke="#656e89"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ExperienceContent() {
  return (
    <div className="relative pb-16 pt-10 xl:h-[1159px] xl:w-[1280px] xl:pb-0 xl:[zoom:0.87] wide:[zoom:0.935] frame:[zoom:1]">
      <h2 className="font-display text-[28px] font-bold leading-normal text-rose xl:-ml-[3px]">
        Where I’ve been working
      </h2>

      <Road />
      {PINS.map(([x, y]) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={x}
          src={asset("/assets/decor/map-pin.svg")}
          alt=""
          aria-hidden
          className="absolute hidden h-12 w-[33px] xl:block"
          style={{ left: x, top: y }}
        />
      ))}

      <ol className="mt-12 flex flex-col gap-14 md:mx-auto md:w-fit xl:mx-0 xl:mt-0 xl:block xl:w-auto">
        {STOPS.map(({ job, x, y, cardTop, barTop, gap }) => (
          <li
            key={job.company}
            className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-(--gap) xl:absolute xl:left-(--x) xl:top-(--y)"
            style={{ "--x": `${x}px`, "--y": `${y}px`, "--gap": `${gap}px` } as CSSProperties}
          >
            <div className="sm:mt-(--card-top)" style={{ "--card-top": `${cardTop}px` } as CSSProperties}>
              <JobCard job={job} />
            </div>
            <div className="sm:mt-(--bar-top)" style={{ "--bar-top": `${barTop}px` } as CSSProperties}>
              <Tasks job={job} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
