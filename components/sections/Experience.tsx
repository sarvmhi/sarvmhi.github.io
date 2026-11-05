import { asset } from "@/lib/asset";
import { jobs, type Job } from "@/lib/content";

/*
 * Figma frame 19 (new version): a solid rose bar down the left, newest job first. A dotted line
 * runs from the bar to each job card; the cards step in and out (95px and 405px from the bar).
 * Beside each card, its own short rose bar holds the completed tasks, with a little branch and
 * dot leading to the "Completed Tasks" heading. Rows sit 100px apart.
 * On phones every card sits just right of the bar and its tasks go under it.
 *
 * The task text keeps the site's current style (left-aligned, normal word spacing), not the
 * justified text of the Figma frame.
 */
const ORDER: Job[] = [jobs.namava, jobs.freelance, jobs.filmnet, jobs.shabakeh];

const BAR = 8; // width of every rose bar, px
const INDENT = [95, 405]; // card distance from the main bar's left edge, alternating (Figma)
const CONNECTOR_Y = 101; // the dotted line's height on the card (Figma)

function JobCard({ job }: { job: Job }) {
  const { logo } = job;
  return (
    // 220 x 190 as in Figma, content centred top to bottom so the margins match
    <div className="job-card flex h-[190px] w-[220px] shrink-0 flex-col items-start justify-center gap-3 rounded-[16px] bg-white px-[37px] shadow-job">
      {/* every logo sits in the same 37px slot, so all cards line up */}
      <span className="flex h-[37px] items-center">
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
          <span aria-hidden className="rounded bg-placeholder" style={{ width: logo.width, height: logo.height }} />
        )}
      </span>
      <div className="flex flex-col gap-1 leading-normal">
        <h3 className="text-[18px] font-bold">{job.role}</h3>
        <p className="text-[14px] font-bold">{job.company}</p>
        <p className="text-[14px] font-medium">{job.location}</p>
        <p className="text-[14px] font-medium">
          <time>{job.dates}</time>
        </p>
      </div>
    </div>
  );
}

// A hyphenated word like "e-commerce" never splits across two lines.
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

// The rose bar with the tasks. Task text looks the same as the skills on the How I Work cards:
// 18px drawn in a section at 85%, so here, in a section at 92%, it is scaled to match on screen.
function Tasks({ job }: { job: Job }) {
  return (
    <div className="relative min-w-0 pb-[14px]" style={{ paddingLeft: BAR + 22 }}>
      <span aria-hidden className="absolute inset-y-0 left-0 rounded-full bg-rose" style={{ width: BAR }} />
      {/* branch: a 2px line from the bar to a dot, then the heading */}
      <span aria-hidden className="absolute top-[20px] h-[2px] w-[42px] bg-rose" style={{ left: BAR }} />
      <span aria-hidden className="absolute top-[15.67px] size-[10.67px] rounded-full bg-rose" style={{ left: BAR + 42 - 5.33 }} />
      <h4 className="pl-[47px] pt-[10px] text-[18px] font-bold leading-[22px]">Completed Tasks</h4>
      <ul className="mt-[39px] flex max-w-[420px] flex-col gap-[22px] text-pretty text-[16px] font-medium leading-normal sm:w-[340px] sm:text-[calc(18px*0.85/var(--section-zoom,1))]">
        {job.tasks.map((task) => (
          <li key={task}>{keepHyphensTogether(task)}</li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceContent() {
  return (
    // Drawn 8% smaller from tablets up; spacing divided by the zoom so it matches other sections
    <div className="pt-10 md:pt-[43px] md:[zoom:0.92] md:[--section-zoom:0.92]">
      <h2 className="font-display text-[calc(28px/var(--section-zoom,1))] font-bold leading-normal text-rose">Where I’ve been working</h2>

      <ol className="relative mt-8 flex flex-col gap-16 sm:gap-[100px] md:mt-[35px]">
        {/* the main bar, from the first card's top to the bottom of the last row */}
        <span aria-hidden className="absolute inset-y-0 left-0 rounded-full bg-rose" style={{ width: BAR }} />
        {ORDER.map((job, i) => (
          <li
            key={job.company}
            className="exp-row relative flex flex-col items-start gap-6 pl-9 sm:flex-row sm:gap-[44px]"
            style={{ ["--indent" as string]: `${INDENT[i % 2]}px` }}
          >
            {/* dotted line from the main bar to the card */}
            <span
              aria-hidden
              className="exp-dots absolute h-[1.5px] bg-[repeating-linear-gradient(90deg,#14161a_0_3px,transparent_3px_6px)]"
              style={{ top: CONNECTOR_Y, left: BAR }}
            />
            <JobCard job={job} />
            {job.tasks.length > 0 && <Tasks job={job} />}
          </li>
        ))}
      </ol>
    </div>
  );
}
