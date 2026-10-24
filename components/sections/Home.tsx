import { IdBadge } from "@/components/IdBadge";
import { asset } from "@/lib/asset";
import { profile } from "@/lib/content";

export function HomeContent() {
  return (
    <div className="flex flex-col pb-16 lg:flex-row lg:justify-between lg:pb-[100px]">
      <section className="min-w-0 max-w-[612px] pt-10 lg:pt-[87px]">
        <h1 className="font-display text-[44px] font-extrabold leading-normal sm:text-[56px] lg:text-[60px] xl:text-[72px]">
          <span className="block whitespace-nowrap">
            Designing{" "}
            <span className="text-gradient bg-[linear-gradient(to_right,#b56576_53.846%,#e56b6f_74.038%,rgba(0,0,0,0.8))] pr-[0.06em] italic">
              Clarity
            </span>
          </span>
          <span className="block whitespace-nowrap">
            into{" "}
            <span className="text-gradient bg-[linear-gradient(to_right,rgba(20,22,26,0.8)_25.481%,rgba(229,107,111,0.95)_56.01%,#b56576_76.442%)] pr-[0.06em] italic">
              Complexity
            </span>
          </span>
        </h1>

        <p className="mt-8 flex items-center gap-3 text-[20px] font-bold leading-normal sm:text-[22px] lg:mt-[44px]">
          <span className="block h-9 w-2 shrink-0 rounded-2xl bg-rose" aria-hidden />
          {profile.focusArea}
        </p>

        <p className="mt-6 text-[17px] leading-7 sm:text-[18px] lg:mt-[29px] lg:text-justify">
          My Computer Engineering background taught me to take systems apart, and product design lets me
          rebuild them to be simple, intuitive, and clear. Currently I&apos;m focused on{" "}
          {/* Hand-drawn underline from Figma ("Line 7"); it draws itself again on hover */}
          <strong className="learning relative inline-block whitespace-nowrap font-bold">
            Technologies for Learning
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/assets/decor/learning-underline.svg")}
              alt=""
              aria-hidden
              className="learning-line pointer-events-none absolute -left-[3px] top-[calc(100%-3.5px)] h-[5px] w-[calc(100%+3px)] max-w-none"
            />
          </strong>
          , designing tools that make learning easier to begin and harder to quit.
        </p>

        <p className="mt-[14px] text-[17px] leading-[26px] sm:text-[18px] lg:text-justify">
          <strong className="font-bold">My superpower?</strong> Give me a weekend and an ominous deadline, and{" "}
          <strong className="text-gradient bg-[linear-gradient(to_right,rgba(20,22,26,0.8),rgba(229,107,111,0.95)_33.173%,#b56576_87.019%)] font-bold">
            I&apos;ll learn whatever the problem needs.
          </strong>
        </p>

        <ul className="mt-6 flex gap-6 sm:gap-[84px] lg:mt-[25px]">
          {profile.stats.map((stat) => (
            <li key={stat.label} className="stat relative h-[141px] w-[150px] sm:w-[179px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/assets/decor/stat-brush.svg")}
                alt=""
                aria-hidden
                className="absolute left-0 top-[26px] w-full opacity-50"
              />
              <div className="relative left-[30px] w-[127px] font-bold leading-normal sm:left-[40px]">
                <p className="flex items-end">
                  <span className="stat-number text-[60px] leading-normal">{stat.value}</span>
                  <span className="pb-[2px] text-[36px] font-medium leading-normal" aria-hidden>
                    +
                  </span>
                  <span className="sr-only">plus</span>
                </p>
                <p className="text-[20px]">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="order-first flex h-[490px] justify-center pt-10 sm:h-auto lg:order-none lg:block lg:pt-[102px]">
        <div className="origin-top scale-[0.86] sm:scale-100">
          <IdBadge />
        </div>
      </div>
    </div>
  );
}
