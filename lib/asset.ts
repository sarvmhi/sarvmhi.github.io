// Prefixes files in /public with the GitHub Pages base path (e.g. /portfolio).
// Plain <img> tags don't get the base path automatically, so every static file goes through this.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
