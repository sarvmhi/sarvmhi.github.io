import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SectionTitle } from "@/components/BarList";
import { ViewCitation } from "@/components/ViewCitation";
import { asset } from "@/lib/asset";
import { research } from "@/lib/content";

/*
 * Research: a publication card on the left (a sheet of lined paper, clipped, with the journal
 * cover and a "Published" stamp) and two paragraphs on the right. Kept compact on purpose:
 * the card is at most 560px wide. Like the other sections, the content starts 32px under the
 * title; here that is the top of the paperclip, which stands 44px above the paper.
 */

// The same paperclip as on the "How I Work" cards: its back half goes under the paper, its
// front half over it, so it looks clipped on. It stands 44px above the paper's top edge.
const CLIP_ABOVE = 44;
function Paperclip({ part }: { part: "back" | "front" }) {
  const back = part === "back";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/assets/clips/clip-${part}.webp`)}
      alt=""
      aria-hidden
      className={`absolute max-w-none ${back ? "z-0" : "z-20"}`}
      style={
        back
          ? { left: 54, top: -CLIP_ABOVE, width: 48, height: 80 }
          : { left: 56, top: 16 - CLIP_ABOVE, width: 45, height: 55 }
      }
    />
  );
}

function PublishedStamp() {
  return (
    <div
      aria-hidden
      className="absolute right-5 top-5 flex size-[84px] items-center justify-center rounded-full border-[1.5px] border-rose/60 text-rose sm:right-6 sm:size-[104px]"
    >
      <span className="absolute inset-[6px] rounded-full border border-rose/35 sm:inset-[7px]" />
      <span className="flex flex-col items-center leading-none">
        <span className="pl-[0.3em] text-[9px] font-medium tracking-[0.25em] sm:text-[10px]">PEER</span>
        <span className="my-[3px] font-display text-[17px] font-bold sm:text-[20px]">Published</span>
        <span className="pl-[0.3em] text-[9px] font-medium tracking-[0.25em] sm:text-[10px]">REVIEWED</span>
      </span>
    </div>
  );
}

function JournalCover() {
  return (
    <div className="relative w-[182px]">
      {/* rose block peeking out behind the cover */}
      <span aria-hidden className="absolute inset-0 translate-x-[5px] translate-y-[5px] rounded-[3px] bg-[#8f625b]" />
      <div className="relative flex h-[227px] flex-col justify-between rounded-[3px] bg-[#C2948C] px-[18px] pb-[18px] pt-[22px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/85">
          Journal · {research.year}
        </p>
        <p className="font-display text-[24px] font-bold leading-[1.1] text-white">{research.journal}</p>
        <p className="text-[12px] font-medium text-white/85">{research.publisher} · peer-reviewed</p>
      </div>
    </div>
  );
}

function PublicationCard() {
  // Same pill as "View Case Study" on the projects
  const buttonClass =
    "glass glass-active inline-flex items-center gap-1 p-[14px] text-[14px] font-bold leading-[22px]";
  return (
    <div className="relative w-full max-w-[560px]">
      <Paperclip part="back" />
      <article className="relative z-10 rounded-[8px] bg-white px-6 pb-14 pt-11 shadow-[0_10px_30px_-12px_rgba(20,22,26,0.28)] sm:px-[34px] [background-image:repeating-linear-gradient(to_bottom,transparent_0_30px,#f4e1e3_30px_31px)] [background-position:0_14px]">
        <PublishedStamp />
        <JournalCover />

        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-1 text-[14px] font-bold text-rose" aria-label="Keywords">
          {research.keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>

        <h3 className="mt-4 font-display text-[24px] font-bold leading-[1.15]">{research.title}</h3>

        <p className="mt-3 text-[16px] font-medium leading-[1.6] text-ink/85">{research.summary}</p>
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
      <Paperclip part="front" />
    </div>
  );
}

export function ResearchContent() {
  return (
    // Drawn 8% smaller from tablets up; spacing divided by the zoom so it matches other sections
    <div className="pt-10 md:pt-[43px] md:[zoom:0.92] md:[--section-zoom:0.92]">
      <SectionTitle>My research area</SectionTitle>
      <div className="mt-[76px] md:mt-[79px] grid gap-12 xl:grid-cols-[minmax(0,560px)_minmax(0,500px)] xl:items-center xl:justify-between">
      <PublicationCard />
      <div className="max-w-[500px]">
        {research.about.map((paragraph, i) => (
          <p key={paragraph} className={`${i ? "mt-4" : ""} text-[16px] font-medium leading-[1.65] text-ink/85 sm:text-[18px]`}>
            {paragraph}
          </p>
        ))}
      </div>
      </div>
    </div>
  );
}
