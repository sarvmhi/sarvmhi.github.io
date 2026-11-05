import type { ReactNode } from "react";
import { asset } from "@/lib/asset";
import { A, Card, Flow } from "./parts";

const IMG = "/assets/projects/filmnet-ds";

export const FILMNET_DS_SECTIONS = [
  { id: "start", label: "Intro" },
  { id: "problem", label: "01 Problem" },
  { id: "approach", label: "02 Approach" },
  { id: "color", label: "03 Color" },
  { id: "type", label: "04 Type" },
  { id: "grid", label: "05 Grid" },
  { id: "components", label: "06 Components" },
  { id: "icons", label: "07 Icons" },
  { id: "native", label: "08 Native apps" },
  { id: "rollout", label: "09 Rollout" },
  { id: "impact", label: "10 Impact" },
  { id: "reflection", label: "11 Reflection" },
];

// Colour scales, copied from the Filmnet Figma file (50 → 900). The marked steps are the tokens
// the components use.
const SCALES: { name: string; note: string; steps: string[]; marked: number[] }[] = [
  {
    name: "Primary",
    note: "Play buttons and key actions",
    steps: ["ffffff", "fbeaed", "f1bdc8", "d32b4e", "be2746", "a8233c", "9e203b", "7f1a2f", "5f1323", "000000"],
    marked: [3, 5],
  },
  {
    name: "Secondary",
    note: "Visual variety, support actions",
    steps: ["ffffff", "d9efef", "b0dede", "009393", "008484", "007a7a", "006e6e", "005858", "004242", "000000"],
    marked: [3, 5],
  },
  {
    name: "Error",
    note: "System state",
    steps: ["ffffff", "fbdde4", "f6b9c6", "e11d48", "cb1a41", "b4173a", "a91636", "87112b", "650d20", "000000"],
    marked: [3],
  },
  {
    name: "Success",
    note: "System state",
    steps: ["ffffff", "def6e7", "baedcd", "22c55e", "1fb155", "1b9e4b", "1a9447", "147638", "0f592a", "000000"],
    marked: [3],
  },
  {
    name: "Warn",
    note: "System state",
    steps: ["ffffff", "ffedd9", "ffdab1", "ff8904", "e67b04", "cc6e03", "bf6703", "995202", "733e02", "000000"],
    marked: [3],
  },
];
const LABELS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];

// WCAG contrast of white text on each main token, measured (not the labels in the old file)
const CONTRAST: [string, string, number, string][] = [
  ["Primary 500", "a8233c", 7.07, "AAA"],
  ["Primary 300", "d32b4e", 4.97, "AA"],
  ["Error", "e11d48", 4.7, "AA"],
  ["Secondary 500", "007a7a", 5.17, "AA"],
  ["Secondary 300", "009393", 3.75, "Large text only"],
  ["Warn", "ff8904", 2.38, "Needs dark text"],
  ["Success", "22c55e", 2.28, "Needs dark text"],
];

function Fig({ src, alt, w, h, caption }: { src: string; alt: string; w: number; h: number; caption?: ReactNode }) {
  return (
    <figure className="fig">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(`${IMG}/${src}`)} alt={alt} width={w} height={h} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function FilmnetDsContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flow-wrap wrap">
      {/* INTRO */}
      <section className="card" id="cs-start">
        <div className="tagline">
          <span>Filmnet</span>
          <span>Design System</span>
          <span className="ship">Shipped</span>
        </div>
        <h1 style={{ marginTop: 18 }}>
          Building Filmnet&apos;s first <A>design system</A>
        </h1>
        <div className="copy">
          <p>
            After a redesign two to three years earlier, Filmnet had no shared design system on any platform. Colors,
            icons and components drifted from page to page and from platform to platform.
          </p>
          <p>
            I designed the system from zero, starting with the desktop web app. It became the{" "}
            <b>single source of truth</b> for developers and designers, and later grew to mobile, TV, iOS and Android.
          </p>
        </div>
        <dl className="meta">
          <div>
            <dt>Role</dt>
            <dd>Product Designer, sole designer of the system</dd>
          </div>
          <div>
            <dt>Team</dt>
            <dd>Front-end developers and the product team</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>About 1 month</dd>
          </div>
        </dl>
        <figure className="hero">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(`${IMG}/cover-v2.webp`)}
            alt="Filmnet design system: Persian type weights, colour scales, primary buttons and icons"
            width={1600}
            height={1200}
          />
        </figure>
      </section>

      <Flow />

      <Card
        id="problem"
        no="01"
        label="The problem"
        title={<>One brand, <A>many versions</A></>}
        intro="Every platform and many pages had their own colors, icons and buttons, so Filmnet never felt like one product. On desktop, where pages changed constantly, every update meant making the same decisions again."
      >
        <div className="qs">
          <div className="q">
            <span className="label">Consistency</span>
            <h3>Why does each page look different?</h3>
            <p>
              Without shared tokens, the same action could have a different color, icon or size on every screen.
            </p>
          </div>
          <div className="q">
            <span className="label">Handoff</span>
            <h3>What should developers build from?</h3>
            <p>
              There was no <b>single source of truth</b>, so specs were explained again for every page.
            </p>
          </div>
          <div className="q">
            <span className="label">Speed</span>
            <h3>Where does a new page start?</h3>
            <p>Product designers had no shared foundations for new pages or redesigns.</p>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="n">0</div>
            <div className="l">Shared design systems before this project</div>
          </div>
          <div className="stat">
            <div className="n">
              ~1<i> mo</i>
            </div>
            <div className="l">To design the web system</div>
          </div>
          <div className="stat">
            <div className="n">5</div>
            <div className="l">Platforms it grew to: desktop, mobile web, TV, iOS, Android</div>
          </div>
        </div>
      </Card>

      <Flow />

      <Card
        id="approach"
        no="02"
        label="Approach"
        title={<>Start where change <A>is constant</A></>}
        intro="We began with desktop web, the platform updated most often, so the system paid off right away. Then we extended it platform by platform."
      >
        <ol className="path" aria-label="Order the system was rolled out to platforms">
          <li className="on"><span className="chip">Desktop web</span></li>
          <li><span className="chip">Mobile web</span></li>
          <li><span className="chip">TV</span></li>
          <li><span className="chip">iOS &amp; Android</span></li>
        </ol>
        <p className="note">This case study focuses on the web foundations; the same system was later expanded to the other platforms.</p>
      </Card>

      <Flow />

      <Card
        id="color"
        no="03"
        label="Foundations · Color"
        mine
        title={<>Scales, not <A>single swatches</A></>}
        intro={
          <>
            Each color is a <b>50–900 scale</b>. Components use two main tokens per color: <b>300</b> on light
            surfaces and <b>500</b> on dark ones, each with an <b>8% transparent</b> tint for soft backgrounds.
          </>
        }
      >
        <div className="palette">
          {SCALES.map((s) => (
            <div className="pal-row" key={s.name}>
              <div className="pal-name">
                <b>{s.name}</b>
                <span>{s.note}</span>
              </div>
              <div className="scale">
                {s.steps.map((hex, i) => (
                  <div
                    key={i}
                    className={`sw ${s.marked.includes(i) ? "main" : ""} ${i < 3 ? "lt" : ""}`}
                    style={{ background: `#${hex}` }}
                    title={`${s.name} ${LABELS[i]} · #${hex}`}
                  >
                    <span>{LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h3 className="sub-h">Measured contrast</h3>
        <p className="sub-p">
          White text on each main token, checked against <b>WCAG 2.2</b>.
        </p>
        <div className="contrast" role="table" aria-label="Contrast of white text on each main color">
          {CONTRAST.map(([name, hex, ratio, level]) => (
            <div className="c-row" role="row" key={name}>
              <span role="cell" className="c-chip" style={{ background: `#${hex}` }}>
                Aa
              </span>
              <span role="cell" className="c-name">
                {name}
              </span>
              <span role="cell" className="c-ratio">
                {ratio.toFixed(2)}:1
              </span>
              <span role="cell" className={`c-level ${ratio >= 4.5 ? "ok" : ratio >= 3 ? "mid" : "low"}`}>
                {level}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Flow />

      <Card
        id="type"
        no="04"
        label="Foundations · Typography"
        mine
        title={<>A Persian-first <A>type scale</A></>}
        intro={
          <>
            The system uses <b>Dana FaNum</b>, a Persian typeface with Persian numerals, in six weights. Text is
            organized by role, not by size, so a designer picks &quot;Headline 2&quot; instead of guessing a number.
          </>
        }
      >
        <Fig src="type-weights.webp" alt="Dana FaNum in six weights, Regular 400 to Ultra Bold 900" w={1800} h={271} />
        <div className="two" style={{ marginTop: 26 }}>
          <div>
            <h3>Five roles</h3>
            <ul className="dots">
              <li>
                <b>Headline</b> H1–H6, 28 to 14 px
              </li>
              <li>
                <b>Subtitle</b>, <b>Body</b>, <b>Button</b> and <b>Caption</b>, each with fixed sizes and weights
              </li>
            </ul>
          </div>
          <div>
            <h3>Built for three breakpoints</h3>
            <ul className="dots">
              <li>Every role is defined for desktop (1024+), tablet (768+) and mobile (320+).</li>
              <li>
                Designed <b>right-to-left</b> from the start, not mirrored from an English layout.
              </li>
            </ul>
          </div>
        </div>
        <Fig src="type-scale.webp" alt="Headline scale, H1 to H6, with sizes and weights" w={1800} h={1080} caption="Headline scale on desktop" />
      </Card>

      <Flow />

      <Card
        id="grid"
        no="05"
        label="Foundations · Grid"
        mine
        title={<>One grid for <A>every layout</A></>}
        intro="A 1328 px container that splits into one to six columns with a 16 px gutter. Content rows, banners and card lists all snap to the same widths."
      >
        <div className="grid-fig">
          <ul className="grid-list">
            {[
              ["1 col", "1328"],
              ["2 cols", "656"],
              ["3 cols", "432"],
              ["4 cols", "320"],
              ["6 cols", "208"],
            ].map(([c, w]) => (
              <li key={c}>
                <span>{c}</span>
                <b>{w} px</b>
              </li>
            ))}
          </ul>
          <Fig src="grid.webp" alt="Grid: one wide 1328 px block, then rows of 2, 3, 4 and 6 columns" w={1610} h={2106} />
        </div>
      </Card>

      <Flow />

      <Card
        id="components"
        no="06"
        label="Components"
        mine
        title={<>Every state, <A>defined up front</A></>}
        intro={
          <>
            Each component ships with its full <b>state matrix</b> and exact specs, so developers never have to guess
            what a hover or disabled state looks like.
          </>
        }
      >
        <h3 className="sub-h">Primary button</h3>
        <p className="sub-p">
          <b>Solid</b> and <b>Transparent</b>, single or paired, in <b>Default</b>, <b>Hover</b> and <b>Disabled</b>.
        </p>
        <Fig src="buttons.webp" alt="Primary button matrix: solid and transparent, single and double, default, hover and disabled" w={1800} h={1538} />
        <Fig
          src="button-sizes.webp"
          alt="Button sizes Large 56 px, Medium 48 px and Small 32 px, all with an 8 px radius"
          w={1800}
          h={647}
          caption="Large 56 px · Medium 48 px · Small 32 px, all with an 8 px radius and 8 px padding"
        />

        <div className="two" style={{ marginTop: 34 }}>
          <div>
            <h3>Drop-down</h3>
            <p>
              Closed and open, empty and filled, with hover. Fixed at 296 × 48 px so forms line up across pages.
            </p>
            <Fig src="dropdown.webp" alt="Drop-down states: closed and open, empty and filled, default and hover" w={1773} h={2199} />
          </div>
          <div>
            <h3>Circle buttons</h3>
            <p>
              Play, Support and Variant buttons for media and quick actions, each with its own size and padding.
            </p>
            <Fig src="circle-buttons.webp" alt="Circle buttons: Support, Variant and Play, default and hover" w={1800} h={1047} />
            <Fig src="dropdown-spec.webp" alt="Drop-down specs: 296 px wide, 48 px tall, 8 px radius, 16 px padding" w={1800} h={895} caption="Drop-down specs" />
          </div>
        </div>
      </Card>

      <Flow />

      <Card
        id="icons"
        no="07"
        label="Icons"
        mine
        title={<>One icon set, <A>two weights</A></>}
        intro={
          <>
            The old product mixed icons from different sets. The new set pairs an <b>outline</b> and a{" "}
            <b>filled</b> version of every icon, grouped by category: device, audio, video, shop and more. Outline is
            the default; filled shows the active state.
          </>
        }
      >
        <Fig src="icons-audio.webp" alt="Audio icons in outline and filled pairs: volume, play, pause, skip and more" w={1800} h={754} />
        <Fig src="icons-video.webp" alt="Video icons in outline and filled pairs" w={1800} h={524} />
      </Card>

      <Flow />

      <Card
        id="native"
        no="08"
        label="Native apps"
        title={<>Familiar first, <A>brand second</A></>}
        intro="On iOS and Android, users expect an app to feel familiar from the first tap. So instead of forcing the web look onto phones, we built on each platform's own system."
      >
        <div className="two">
          <div className="q">
            <span className="label">iOS</span>
            <h3>Apple Human Interface Guidelines</h3>
            <p>
              Margins, spacing and layout rules taken directly from the HIG, with <b>SF Symbols</b> for icons.
            </p>
          </div>
          <div className="q">
            <span className="label">Android</span>
            <h3>Google Material Design</h3>
            <p>
              Margins, spacing and layout rules taken directly from Material, with <b>Material Symbols</b> for icons.
            </p>
          </div>
        </div>
        <ul className="dots" style={{ marginTop: 22 }}>
          <li>
            Buttons and icons match each platform exactly, so nothing looks unfamiliar.
          </li>
          <li>Filmnet&apos;s colors and theme were adapted to fit within those rules.</li>
        </ul>
        <p className="pull">
          Jakob&apos;s Law: users spend most of their time in other apps, so they expect yours to work the same way.
        </p>
      </Card>

      <Flow />

      <Card
        id="rollout"
        no="09"
        label="Rollout"
        title={<>Shipped in phases, <A>not all at once</A></>}
        intro="Instead of a risky big-bang release, the system replaced the old UI on the live web app step by step."
      >
        <div className="steps">
          {[
            ["Step 1", <>Colors: the new tokens replaced hard-coded colors across the site.</>],
            ["Step 2", <>Icons: the mixed icon sets were swapped for the new unified set.</>],
            [
              "Step 3",
              <>
                New work: redesigns such as the <b>subscription purchase page</b> were built directly from the
                system&apos;s components.
              </>,
            ],
          ].map(([k, text]) => (
            <div className="st" key={k as string}>
              <div className="s">{k}</div>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <Fig
          src="in-use-subscription.webp"
          alt="The redesigned subscription purchase page on desktop, built from the system"
          w={1827}
          h={1209}
          caption={
            <>
              The subscription page, built from the system. Its new blue <b>semantic color</b> for discount codes
              was added back into the system, so it kept growing.
            </>
          }
        />
      </Card>

      <Flow />

      <Card id="impact" no="10" label="Impact" title={<>One language for <A>every team</A></>}>
        <ul className="changes">
          {[
            ["M4 12h16M12 4v16", "Smoother handoff", "Far fewer questions and back-and-forth with developers"],
            ["M4 6h16M4 12h16M4 18h16", "A consistent product", "Pages share the same colors, icons and components"],
            ["M5 12l5 5 9-10", "Faster design work", "New pages and redesigns start from ready-made parts"],
            ["M3 17l6-6 4 4 8-8M15 7h6v6", "A foundation that scaled", "Extended to mobile, TV, iOS and Android"],
          ].map(([d, title, sub]) => (
            <li key={title}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={d} />
              </svg>
              <div>
                <b>{title}</b>
                <span>{sub}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Flow />

      <Card id="reflection" no="11" label="Reflection" title={<>What I&apos;d do <A>differently</A></>}>
        <ol className="bts">
          <li>
            <div>
              <h3>Check accessibility from day one</h3>
              <p>
                Several colors were labeled AAA, but measured against WCAG only Primary 500 reaches it. Warn and Success
                need dark text. Today I&apos;d validate every contrast ratio before publishing a token.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3>Separate Error from Primary</h3>
              <p>
                Error and Primary are very close reds, so a main action can be mistaken for an error. I&apos;d give
                Error a clearly different hue or pair it with an icon, so color is never the only signal.
              </p>
            </div>
          </li>
        </ol>
        <div className="end">
          <span className="small">Filmnet Design System · 2025</span>
          <button type="button" className="pill glass" onClick={onClose}>
            Close case study
          </button>
        </div>
      </Card>
    </div>
  );
}
