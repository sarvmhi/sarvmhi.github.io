import { Fragment } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SectionTitle } from "@/components/BarList";
import { ViewCitation } from "@/components/ViewCitation";
import { research } from "@/lib/content";

/*
 * Research: a publication card on the left (a sheet of lined paper, clipped, with the journal
 * cover and a "Published" stamp) and two paragraphs on the right. Kept compact on purpose:
 * the card is at most 560px wide.
 */

function Paperclip() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 48"
      fill="none"
      className="absolute -top-[26px] left-[54px] z-20 h-[56px] w-[19px] drop-shadow-[1px_1px_1px_rgba(0,0,0,0.15)]"
    >
      <path
        d="M5 14v22a3 3 0 0 0 6 0V6a5 5 0 0 0-10 0v32a7 7 0 0 0 14 0V14"
        stroke="#8d9199"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PublishedStamp() {
  return (
    <div
      aria-hidden
      className="absolute right-5 top-5 flex size-[84px] rotate-[10deg] items-center justify-center rounded-full border-[1.5px] border-rose/60 text-rose sm:right-6 sm:size-[104px]"
    >
      <span className="absolute inset-[6px] rounded-full border border-rose/35 sm:inset-[7px]" />
      <span className="flex flex-col items-center leading-none">
        <span className="pl-[0.3em] font-mono text-[7px] font-medium tracking-[0.3em] sm:text-[8px]">PEER</span>
        <span className="my-[3px] -rotate-[6deg] font-display text-[17px] font-bold sm:text-[20px]">Published</span>
        <span className="pl-[0.3em] font-mono text-[7px] font-medium tracking-[0.3em] sm:text-[8px]">REVIEWED</span>
      </span>
    </div>
  );
}

function JournalCover() {
  return (
    <div className="relative w-[182px]">
      {/* rose block peeking out behind the cover */}
      <span aria-hidden className="absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-[3px] bg-[#d99a9e]" />
      <div className="relative flex h-[227px] flex-col justify-between rounded-[3px] bg-[#362e31] px-[18px] pb-[18px] pt-[22px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ef9ea2]">
          Journal · {research.year}
        </p>
        <p className="font-display text-[23px] font-bold leading-[1.1] text-white">{research.journal}</p>
        <p className="text-[11px] text-[#d9d3d5]">{research.publisher} · peer-reviewed</p>
      </div>
    </div>
  );
}

function PublicationCard() {
  // Same pill as "View Case Study" on the projects
  const buttonClass =
    "glass glass-active inline-flex items-center gap-1 p-[14px] text-[14px] font-bold leading-[22px]";
  return (
    <div className="w-full max-w-[560px]">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{research.label}</p>

      <article className="relative -rotate-[0.7deg] rounded-[8px] bg-[#fbfaf8] px-6 pb-7 pt-8 shadow-[0_10px_30px_-12px_rgba(20,22,26,0.28)] sm:px-[34px] [background-image:repeating-linear-gradient(to_bottom,transparent_0_30px,#f4e1e3_30px_31px)] [background-position:0_14px]">
        <Paperclip />
        <PublishedStamp />
        <JournalCover />

        <p className="mt-7 text-[13px] font-semibold text-rose">{research.keywords.join(" · ")}</p>

        <h3 className="mt-4 font-display text-[22px] font-bold leading-[1.15]">{research.title}</h3>

        <p className="mt-2 text-[13px] text-ink/75">
          {research.authors.map((author, i) => (
            <Fragment key={`${author}-${i}`}>
              {i > 0 && ", "}
              {author === research.me ? (
                <strong className="font-semibold text-ink underline decoration-[#e3a1a6] decoration-2 underline-offset-[4px]">
                  {author}
                </strong>
              ) : (
                author
              )}
            </Fragment>
          ))}
        </p>

        <p className="mt-3 text-[14px] leading-[1.6] text-ink/85">{research.summary}</p>
        <ViewCitation citation={research.citation} />

        <div className="mt-5">
          {research.paperUrl ? (
            <a href={research.paperUrl} target="_blank" rel="noreferrer" className={buttonClass}>
              View Case Study
              <ArrowUpRightIcon className="size-[22px] p-[3px]" aria-hidden />
            </a>
          ) : (
            <span role="link" aria-disabled="true" title="Link coming soon" className={buttonClass}>
              View Case Study
              <ArrowUpRightIcon className="size-[22px] p-[3px]" aria-hidden />
            </span>
          )}
        </div>
      </article>
    </div>
  );
}

export function ResearchContent() {
  return (
    <div className="grid gap-12 pb-20 pt-12 lg:pt-[66px] xl:grid-cols-[minmax(0,560px)_minmax(0,500px)] xl:items-center xl:justify-between">
      <PublicationCard />
      <div className="max-w-[500px]">
        <SectionTitle>Research</SectionTitle>
        {research.about.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-[16px] leading-[1.65] text-ink/85">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
