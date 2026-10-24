# PP Neue Montreal

The Figma file sets body text in PP Neue Montreal (Medium 500 and Bold 700). It is a
commercial font from Pangram Pangram, so it is not in this repo; until it is added the
site falls back to Inter.

To switch it on:

1. Put the two web font files in this folder, named exactly:
   - `PPNeueMontreal-Medium.woff2`
   - `PPNeueMontreal-Bold.woff2`
2. In `app/globals.css`, remove the comment markers around the `@font-face` block
   marked "PP Neue Montreal".

Nothing else needs to change: `--font-sans` already lists "PP Neue Montreal" first.
