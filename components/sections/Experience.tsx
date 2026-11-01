import { Connector, RoseBar } from "@/components/BarList";
import { asset } from "@/lib/asset";
import { jobs, type Job } from "@/lib/content";

/*
 * Figma frame 19: a hand-drawn line down the left with a short branch to each job, newest
 * first. Each row is the job card and, beside it, the rose bar with the completed tasks.
 * On phones the tasks go under the card.
 */
const ORDER: Job[] = [jobs.freelance, jobs.filmnet, jobs.shabakeh];

function JobCard({ job }: { job: Job }) {
  const { logo } = job;
  return (
    <div className="job-card flex h-[190px] w-[220px] shrink-0 flex-col items-start gap-3 rounded-[16px] bg-white py-6 pl-6 pr-[30px] shadow-job">
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

export function ExperienceContent() {
  return (
    <div className="pt-10">
      <h2 className="font-display text-[28px] font-bold leading-normal text-rose">Where I’ve been working</h2>

      <div className="relative mt-8">
        {/* the hand-drawn line, stretched to the height of the list */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/assets/decor/experience-line.svg")}
          alt=""
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 max-w-none"
        />
        <ol className="flex flex-col gap-[104px] pb-[60px] pl-9 pt-[34px] sm:pl-[115px]">
          {ORDER.map((job) => (
            <li key={job.company} className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-[80px]">
              {/* branch from the line to the card, level with the card's middle */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/assets/decor/experience-branch.svg")}
                alt=""
                aria-hidden
                className="absolute -left-[33px] top-[93px] h-1 w-[26px] max-w-none sm:-left-[112px] sm:w-[97px]"
              />
              <JobCard job={job} />
              <Tasks job={job} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
