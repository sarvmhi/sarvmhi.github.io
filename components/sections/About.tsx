import { Connector, Leader, RoseBar, SectionTitle } from "@/components/BarList";
import { Certificates } from "@/components/Certificates";
import { HowIWork } from "@/components/HowIWork";
import { education, languages } from "@/lib/content";

export function AboutContent() {
  return (
    // Everything in this section is drawn 15% smaller than the rest of the page (from tablets
    // up); the two columns still reach the page margins. Change the zoom to resize it.
    <div className="grid gap-x-10 gap-y-20 pb-16 pt-12 md:[zoom:0.85] lg:pt-[66px] xl:grid-cols-[minmax(0,588px)_545px] xl:justify-between xl:pb-[71px]">
      <div className="min-w-0">
        <section>
          <SectionTitle>Education</SectionTitle>
          <ul className="relative mt-8 pb-8 pt-[17px] pl-[67px]">
            <RoseBar />
            {education.map((item) => (
              <li key={item.degree} className="relative">
                <Connector className="-left-[59px] top-[9px]" />
                <p className="flex flex-wrap items-baseline gap-x-[2px]">
                  <span className="text-[22px] font-bold leading-normal sm:text-[24px]">{item.degree}</span>
                  <Leader className="max-sm:hidden" />
                  <span className="text-[20px] leading-normal max-sm:basis-full">{item.years}</span>
                </p>
                <p className="mt-3 text-[20px] leading-normal">{item.school}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 lg:mt-[94px]">
          <SectionTitle>Certificates</SectionTitle>
          <Certificates />
        </section>

        <section className="mt-16 lg:mt-[104px]">
          <SectionTitle>Languages</SectionTitle>
          <ul className="relative mt-8 flex flex-col gap-7 pb-[46px] pt-[19px] pl-16">
            <RoseBar />
            {languages.map((lang) => (
              <li key={lang.name} className="relative flex items-baseline gap-[2px]">
                <Connector className="-left-14 top-[9px]" />
                <span className="text-[24px] font-bold leading-normal">{lang.name}</span>
                <Leader />
                <span className="text-[20px] leading-normal">{lang.level}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <HowIWork />
    </div>
  );
}
