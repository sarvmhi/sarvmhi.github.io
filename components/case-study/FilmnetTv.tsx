import type { ReactNode } from "react";
import { Compare } from "@/components/case-study/Compare";
import { asset } from "@/lib/asset";

const IMG = "/assets/projects/filmnet-tv";

export const FILMNET_TV_SECTIONS = [
  { id: "start", label: "Intro" },
  { id: "problem", label: "01 Problem" },
  { id: "research", label: "02 Research" },
  { id: "home", label: "03 Home" },
  { id: "playback", label: "04 Playback" },
  { id: "status", label: "05 Account" },
  { id: "browse", label: "06 Browse" },
  { id: "tradeoffs", label: "07 Trade-offs" },
  { id: "system", label: "08 System" },
  { id: "postlaunch", label: "09 Post-launch" },
  { id: "changed", label: "10 Outcome" },
  { id: "bts", label: "11 Behind" },
];

/** Dashed rose arrow between two cards */
function Flow() {
  return (
    <div className="flow" aria-hidden>
      <svg viewBox="0 0 24 84">
        <path className="l" d="M12 4 V70" />
        <path className="h" d="M5 68 L12 80 L19 68 Z" />
      </svg>
    </div>
  );
}

function Card({
  id,
  no,
  label,
  mine,
  title,
  intro,
  children,
}: {
  id: string;
  no: string;
  label: string;
  mine?: boolean;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card" id={`cs-${id}`}>
      <span className="step-no">{no}</span>
      <div className="head">
        {mine && <span className="mine">My work</span>}
        <span className="label">{label}</span>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Shot({ name, label, children, hint }: { name: string; label: string; children: ReactNode; hint?: boolean }) {
  return (
    <div className="cmp-block">
      <div className="cmp-text">{children}</div>
      <Compare before={`${IMG}/${name}_before.webp`} after={`${IMG}/${name}_after.webp`} label={label} />
      {hint && <p className="hint">Drag to compare</p>}
    </div>
  );
}

const A = ({ children }: { children: ReactNode }) => <em className="accent">{children}</em>;

export function FilmnetTvContent({ onClose }: { onClose: () => void }) {
  return (
      <div className="flow-wrap wrap">
        {/* INTRO */}
        <section className="card" id="cs-start">
          <div className="tagline">
            <span>Filmnet</span>
            <span>TV v2.0</span>
            <span className="ship">Shipped</span>
          </div>
          <h1 style={{ marginTop: 18 }}>
            Reframing Filmnet TV for <A>lean-back</A> viewing
          </h1>
          <div className="copy">
            <p>
              TV is one of the most important platforms in the Filmnet ecosystem. It is watched in shared, family
              settings, supports longer sessions and plays a direct role in subscription retention. Yet the TV app had
              not had a real UX update in years.
            </p>
            <p>
              Instead of starting with visuals, we stepped back to understand where users struggled. The result was a
              lighter, <b>remote-first</b> experience built around one goal: get people from the couch to playback as
              fast as possible.
            </p>
          </div>
          <dl className="meta">
            <div>
              <dt>Role</dt>
              <dd>Product Designer, UX lead (1 of 2)</dd>
            </div>
            <div>
              <dt>Team</dt>
              <dd>2 product designers, 6 developers and the CTO</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>Oct – Dec 2025</dd>
            </div>
          </dl>
          <figure className="hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(`${IMG}/home_after.webp`)}
              alt="Redesigned Filmnet TV home screen with a large hero banner and content rows"
              width={1500}
              height={993}
            />
          </figure>
        </section>

        <Flow />

        <Card
          id="problem"
          no="01"
          label="The problem"
          title={<>A mobile app on a <A>TV screen</A></>}
          intro="The previous version treated TV like a phone: small elements, deep hierarchies and hidden actions. Behavioral data showed users spending more time navigating than watching."
        >
          <div className="qs">
            <div className="q">
              <span className="label">Readability</span>
              <h3>Can users read it from the couch?</h3>
              <p>
                Small fonts and compact cards were hard to identify from a typical <b>viewing distance</b>.
              </p>
            </div>
            <div className="q">
              <span className="label">Speed</span>
              <h3>How fast can users start watching?</h3>
              <p>
                Many users left <b>before playback</b>, and Continue Watching was buried behind extra clicks.
              </p>
            </div>
            <div className="q">
              <span className="label">Clarity</span>
              <h3>Do users know where they stand?</h3>
              <p>
                <b>Subscription status</b> and important CTAs were easy to miss.
              </p>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="n">
                2–3<i> m</i>
              </div>
              <div className="l">Typical viewing distance</div>
            </div>
            <div className="stat">
              <div className="n">1</div>
              <div className="l">Remote, no touch, no keyboard</div>
            </div>
            <div className="stat">
              <div className="n">3</div>
              <div className="l">TV platforms benchmarked: Google TV, Android TV, Apple TV</div>
            </div>
          </div>
        </Card>

        <Flow />

        <Card
          id="research"
          no="02"
          label="Research"
          mine
          title={<>Looking before <A>redesigning</A></>}
          intro="I combined three methods to see where the TV context broke the experience."
        >
          <div className="methods">
            <div>
              <h3>Behavioral data</h3>
              <p>
                Time to First Play, Continue Watching CTR, home exit rate and subscription conversion all pointed to{" "}
                <b>navigation friction</b>.
              </p>
            </div>
            <div>
              <h3>In-context observation</h3>
              <p>
                Watching people use the app in a living room showed what data couldn&apos;t: text unreadable from the
                couch, and resume and subscription actions hard to find.
              </p>
            </div>
            <div>
              <h3>Gap analysis</h3>
              <p>
                Against <b>TV design standards</b>, the sidebar wasn&apos;t remote-friendly, the hierarchy was too deep
                and key paths took too many clicks.
              </p>
            </div>
          </div>
          <p className="pull">TV users want to decide quickly, start watching immediately, and barely notice the interface.</p>
          <div className="rules" aria-label="TV design principles">
            {[
              "Simple, focused layouts",
              "Large, short text",
              "High contrast, large targets",
              "Light UI, fast loading",
              "Grid for predictable focus",
              "Navigation 2–3 levels deep",
            ].map((rule, i) => (
              <div key={rule}>
                <span className="i">{String(i + 1).padStart(2, "0")}</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </Card>

        <Flow />

        <Card id="home" no="03" label="Home" title={<>Less chrome, <A>bigger content</A></>}>
          <Shot name="home" label="Home screen" hint>
            <p>
              The sidebar took space and made <b>remote focus</b> harder to follow.
            </p>
            <ul className="dots">
              <li>
                Sidebar replaced with a slim <b>top icon bar</b>.
              </li>
              <li>
                <b>Larger cards</b> for recognition from a distance.
              </li>
              <li>
                Fewer sliders for better <b>performance</b> on TV hardware.
              </li>
            </ul>
          </Shot>
        </Card>

        <Flow />

        <Card id="playback" no="04" label="Getting to playback" title={<>Fewer clicks between the couch and <A>the show</A></>}>
          <Shot name="series" label="Series page">
            <h3>One click to playback</h3>
            <ul className="dots">
              <li>
                A direct <b>&quot;Watch S1 E1&quot;</b> button became the <b>primary CTA</b> on series pages.
              </li>
              <li>
                Clear <b>visual hierarchy</b>: poster, details, then larger episode cards.
              </li>
            </ul>
          </Shot>
          <Shot name="continue" label="Continue Watching page">
            <h3>Making the return path obvious</h3>
            <ul className="dots">
              <li>
                <b>Progress bars</b> and time left on each poster support <b>recognition over recall</b>.
              </li>
              <li>
                Pagination removed: one continuous grid with <b>fewer clicks</b>.
              </li>
            </ul>
          </Shot>
        </Card>

        <Flow />

        <Card id="status" no="05" label="Account & access" title={<>Status you can&apos;t miss, login <A>without typing</A></>}>
          <Shot name="profile" label="Profile page">
            <h3>Subscription status on the profile</h3>
            <ul className="dots">
              <li>
                A banner with <b>days remaining</b> and a <b>contextual &quot;Renew&quot; CTA</b> improves{" "}
                <b>visibility of system status</b>.
              </li>
              <li>
                Icons on menu items and a <b>QR code</b> for quick purchase on the phone.
              </li>
            </ul>
          </Shot>
          <Shot name="login" label="Login page">
            <h3>Login moved to the phone</h3>
            <ul className="dots">
              <li>
                A <b>QR code</b> and a short code replace typing with a remote.
              </li>
              <li>
                One focused card, with phone-number login as a clear <b>secondary option</b>.
              </li>
            </ul>
          </Shot>
        </Card>

        <Flow />

        <Card id="browse" no="06" label="Search & browse" title={<>Less to navigate with <A>a remote</A></>}>
          <Shot name="search" label="Search page">
            <h3>Search without the filters</h3>
            <ul className="dots">
              <li>
                Five filter dropdowns removed: typing with a remote is already hard, so <b>interaction cost</b> came
                first.
              </li>
              <li>
                One search field and a clean <b>on-screen keyboard</b>.
              </li>
            </ul>
          </Shot>
          <Shot name="category" label="Category page">
            <h3>Shallower categories</h3>
            <ul className="dots">
              <li>
                A dense grid of small items became <b>large category tiles</b>, with genres below.
              </li>
              <li>
                <b>Fewer, bigger targets</b> make remote navigation faster.
              </li>
            </ul>
          </Shot>
        </Card>

        <Flow />

        <Card id="tradeoffs" no="07" label="Trade-offs" title={<>What we chose, and what <A>we gave up</A></>}>
          <div className="trade">
            {[
              ["Readability", "content density", <>Larger cards meant fewer items on screen, but faster recognition from the couch.</>],
              ["Speed to playback", "exploration", <>Direct Watch actions fit <b>lean-back</b> behavior better than deep browsing.</>],
              ["Simple interaction", "filter precision", <>Removing filters cut remote effort at the cost of advanced search.</>],
              ["Performance", "visual richness", <>Fewer heavy elements and animations meant faster loading on TV hardware.</>],
            ].map(([win, lose, text]) => (
              <div className="q" key={win as string}>
                <div className="vs">
                  {win} <i>over</i> <s>{lose}</s>
                </div>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </Card>

        <Flow />

        <Card id="system" no="08" label="Design system & platforms" mine title={<>Making the system <A>TV-ready</A></>}>
          <div className="two">
            <div>
              <h3>Design system expansion</h3>
              <p>Filmnet&apos;s design system was built for web and mobile. I extended it for TV.</p>
              <ul className="dots">
                <li>
                  A <b>new icon set</b> matched to the website&apos;s icons for <b>cross-platform consistency</b>.
                </li>
                <li>
                  <b>Higher-contrast colors</b> for legibility at 2–3 meters.
                </li>
              </ul>
            </div>
            <div>
              <h3>Platform fragmentation</h3>
              <p>
                Screen size turned out to be the smaller problem. Android TV, older models and Samsung&apos;s own OS
                each <b>rendered the UI differently</b>.
              </p>
              <ul className="dots">
                <li>Tested on Filmnet&apos;s in-house TVs of different sizes and platforms.</li>
                <li>
                  Tuned element sizes with <b>front-end rendering data</b>, so the UI stayed consistent everywhere.
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Flow />

        <Card
          id="postlaunch"
          no="09"
          label="Post-launch"
          mine
          title={<>The Back button that <A>led nowhere</A></>}
          intro={
            <>
              The launch coincided with internet outages in Iran, which blocked the A/B test we had planned. Instead, I
              monitored real behavior in <b>Microsoft Clarity</b> during the first week.
            </>
          }
        >
          <div className="steps">
            {[
              ["Signal", <>About <b>19K dead clicks</b> in the first 3 days.</>],
              ["Pattern", <>Clarity&apos;s AI summaries and <b>session replays</b> pointed to the Back button at the top of the page.</>],
              [
                "Root cause",
                <>
                  Many users open the app from a <b>saved URL</b>, because typing an address on a TV is painful. With no
                  previous page, Back had <b>no default behavior</b> and led nowhere.
                </>,
              ],
              [
                "Fix",
                <>
                  Back always returns to <b>Home</b>. Since the longest journey was two screens, this kept navigation{" "}
                  <b>predictable</b> in every entry scenario.
                </>,
              ],
            ].map(([k, text]) => (
              <div className="st" key={k as string}>
                <div className="s">{k}</div>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <figure className="shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(`${IMG}/clarity.webp`)}
              alt="Microsoft Clarity recordings list used to analyze dead clicks"
              width={1500}
              height={844}
            />
            <figcaption>Dead-click analysis in Microsoft Clarity</figcaption>
          </figure>
          <div className="impact">
            <div className="n">~27%</div>
            <p>
              <span className="k">Impact</span>fewer <b>dead clicks</b> and <b>early exits</b> after the fix
            </p>
          </div>
          <div className="finding2">
            <span className="label">Second finding</span>
            <h3>The on-screen D-pad was mistaken for other controls</h3>
            <p>
              Session replays showed that the round <b>on-screen D-pad</b> at the bottom of the screen was being
              confused with the <b>Back button</b> and the <b>carousel swipe arrows</b>. Users pressed it expecting to
              go back or scroll a row, which pushed up <b>rage clicks</b>.
            </p>
            <p>We decided to remove it, but the internet outages hit before we could ship the change.</p>
            <span className="open">Planned, not shipped</span>
          </div>
        </Card>

        <Flow />

        <Card id="changed" no="10" label="What changed" title={<>The <A>outcome</A></>}>
          <ul className="changes">
            {[
              ["M8 5v14l11-7z", "Fewer steps to playback", "Users reach content faster, with fewer clicks"],
              ["M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0-18M12 8v4l3 2", "Visible subscription status", "Users know their status and next step"],
              ["M3 12h4l3-8 4 16 3-8h4", "Predictable navigation", "Back behaves the same from every entry point"],
              ["M3 17l6-6 4 4 8-8M15 7h6v6", "~27% fewer dead clicks and early exits", "Measured in Microsoft Clarity and by the analytics team"],
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

        <Card id="bts" no="11" label="Behind the scenes" title={<>What <A>it took</A></>}>
          <ol className="bts">
            <li>
              <div>
                <h3>Launching into an outage</h3>
                <p>
                  With A/B testing off the table, behavioral analytics became our main way to learn from real users. The
                  outages also held back a planned fix: removing the on-screen D-pad.
                </p>
              </div>
            </li>
            <li>
              <div>
                <h3>Designing for many TVs at once</h3>
                <p>Close work with front-end engineers turned rendering differences into concrete size adjustments.</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Small fix, big effect</h3>
                <p>
                  One defined default for the Back button had one of the largest impacts. Next, I&apos;d run the A/B
                  test we had planned to validate each change on its own.
                </p>
              </div>
            </li>
          </ol>
          <p className="nda">Exact figures are under NDA; numbers are rounded.</p>
          <div className="end">
            <span className="small">Filmnet TV v2.0 · 2025</span>
            <button type="button" className="pill glass" onClick={onClose}>
              Close case study
            </button>
          </div>
        </Card>
      </div>
  );
}
