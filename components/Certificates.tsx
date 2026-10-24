import type { CSSProperties } from "react";
import { asset } from "@/lib/asset";
import { certificates } from "@/lib/content";

/*
 * Stamp collage from Figma (588 x 459). Every position is in Figma pixels and is
 * multiplied by --u, which is 1px at full width and shrinks with the container,
 * so the collage scales as one piece on small screens.
 */
const u = (n: number) => `calc(${n} * var(--u))`;
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
  left: u(x),
  top: u(y),
  ...(w !== undefined && { width: u(w) }),
  ...(h !== undefined && { height: u(h) }),
});

const SHADOW = "drop-shadow-[-2px_4px_2px_rgba(0,0,0,0.25)]";

type Stamp = {
  key: keyof typeof certificates;
  art: string;
  frame: [number, number, number, number];
  shadow: boolean;
  logo: { src: string; at: [number, number]; w: number; h?: number };
  title: { at: [number, number]; w?: number };
  issuer: { at: [number, number] };
};

const STAMPS: Stamp[] = [
  {
    key: "amanj",
    art: "/assets/stamps/stamp-landscape-b@2x.webp",
    frame: [0, 0, 359, 176],
    shadow: true,
    logo: { src: "/assets/logos/amanj-academy.svg", at: [15, 42], w: 93, h: 54 },
    title: { at: [126, 54] },
    issuer: { at: [126, 92] },
  },
  {
    key: "ibm",
    art: "/assets/stamps/stamp-portrait-b.svg",
    frame: [374, 0, 214, 250],
    shadow: false,
    logo: { src: "/assets/logos/ibm.webp", at: [31, 33], w: 52 },
    title: { at: [21, 117], w: 120 },
    issuer: { at: [21, 181] },
  },
  {
    key: "adobe",
    art: "/assets/stamps/stamp-portrait-a.svg",
    frame: [-1, 209, 214, 250],
    shadow: true,
    logo: { src: "/assets/logos/adobe.webp", at: [32, 34], w: 48 },
    title: { at: [21, 108], w: 122 },
    issuer: { at: [21, 173] },
  },
  {
    key: "google",
    art: "/assets/stamps/stamp-landscape-a.svg",
    frame: [227, 283, 359, 176],
    shadow: true,
    logo: { src: "/assets/logos/google.webp", at: [32, 35], w: 56 },
    title: { at: [129, 35] },
    issuer: { at: [129, 66] },
  },
];

export function Certificates() {
  return (
    <div className="@container mt-[39px] w-full max-w-[588px]">
      <ul
        className="relative aspect-[588/459] w-full [--u:calc(100cqw/588)]"
        aria-label="Certificates"
      >
        {STAMPS.map((stamp) => {
          const cert = certificates[stamp.key];
          const [x, y, w, h] = stamp.frame;
          return (
            <li key={stamp.key} className="absolute" style={box(x, y, w, h)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(stamp.art)}
                alt=""
                aria-hidden
                className={`absolute inset-0 size-full max-w-none ${stamp.shadow ? SHADOW : ""}`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(stamp.logo.src)}
                alt=""
                aria-hidden
                className="absolute max-w-none"
                style={box(stamp.logo.at[0], stamp.logo.at[1], stamp.logo.w, stamp.logo.h ?? stamp.logo.w)}
              />
              <p
                className="absolute font-bold leading-[1.2]"
                style={{ ...box(stamp.title.at[0], stamp.title.at[1], stamp.title.w), fontSize: u(24) }}
              >
                {cert.title}
              </p>
              <p
                className="absolute font-bold leading-[1.2]"
                style={{ ...box(stamp.issuer.at[0], stamp.issuer.at[1]), fontSize: u(20) }}
              >
                {cert.issuer}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
