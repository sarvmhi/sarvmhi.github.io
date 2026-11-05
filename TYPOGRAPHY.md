# Typography

Every font and text size on the site, where it is set, and how big it actually looks.

## Fonts

| Font | Used for | Loaded in |
|---|---|---|
| **Playfair Display** | headlines, section titles, project and paper titles | [globals.css:2](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/app/globals.css#L2) |
| **PP Neue Montreal** (Medium 500 and Bold 700; semibold uses Bold) | all other text, including project details and the small labels on the Research card | [globals.css:12](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/app/globals.css#L12) |

## Sizes

“In code” is the number written in the file. Parts of the page are drawn smaller (the whole site 97%, Intro 90%, About 85%, Experience and Research 92%), so “On screen” is what you actually see at 1440px wide. Sizes in brackets apply to smaller screens. Weights: 400 regular, 500 medium, 600 semibold, 700 bold, 800 extra bold.

### Header (every section)

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| “Sarv” | Playfair Display | 600 | 20 | 19.4 | [SiteHeader.tsx:185](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/SiteHeader.tsx#L185) |
| Nav labels (About Me, Experience…) | PP Neue Montreal | 700 | 14 | 13.6 | [SiteHeader.tsx:216](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/SiteHeader.tsx#L216) |
| Download CV | PP Neue Montreal | 700 | 14 | 13.6 | [SiteHeader.tsx:268](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/SiteHeader.tsx#L268) |

### Intro (first screen)

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| Headline “Designing Clarity into Complexity” | Playfair Display | 800 (italic on Clarity / Complexity) | 72 (60 lg, 56 sm, 44 phone) | 62.8 | [Intro.tsx:10](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L10) |
| Human-Computer Interaction | PP Neue Montreal | 700 | 22 (20 phone) | 19.2 | [Intro.tsx:25](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L25) |
| Bio paragraph | PP Neue Montreal | 500 | 18 (17 phone) | 15.7 | [Intro.tsx:30](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L30) |
| “My superpower?” line | PP Neue Montreal | 500 / 700 | 18 (17 phone) | 15.7 | [Intro.tsx:47](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L47) |
| Stat numbers (4, 20) | PP Neue Montreal | 700 | 60 | 52.3 | [Intro.tsx:66](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L66) |
| Stat “+” | PP Neue Montreal | 500 | 36 | 31.4 | [Intro.tsx:67](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L67) |
| Stat labels | PP Neue Montreal | 700 | 20 | 17.4 | [Intro.tsx:72](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Intro.tsx#L72) |
| Badge: name | PP Neue Montreal | 700 | 22 | 19.2 | [IdBadge.tsx:227](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/IdBadge.tsx#L227) |
| Badge: role | PP Neue Montreal | 700 | 18 | 15.7 | [IdBadge.tsx:228](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/IdBadge.tsx#L228) |
| Badge: details (Specializations, Status…) | PP Neue Montreal | 700 labels / 500 values | 14 | 12.2 | [IdBadge.tsx:232](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/IdBadge.tsx#L232) |
| Badge: ID | PP Neue Montreal | 500 | 14 | 12.2 | [IdBadge.tsx:261](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/IdBadge.tsx#L261) |

### About (Education, Certificates, Languages, How I Work)

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| Section titles (Education, Certificates, Languages, How I Work) | Playfair Display | 700 | 28 on screen everywhere | 27 | [BarList.tsx:38](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/BarList.tsx#L38) |
| Degree | PP Neue Montreal | 700 | 24 (22 phone) | 19.8 | [About.tsx:20](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/About.tsx#L20) |
| Years, university | PP Neue Montreal | 500 | 20 | 16.5 | [About.tsx:22](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/About.tsx#L22) |
| Language name | PP Neue Montreal | 700 | 24 | 19.8 | [About.tsx:42](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/About.tsx#L42) |
| Language level | PP Neue Montreal | 500 | 20 | 16.5 | [About.tsx:44](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/About.tsx#L44) |
| Stamp title (Product Design…) | PP Neue Montreal | 700 | 24 at full collage width (scales with it) | 16.8 | [Certificates.tsx:98](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/Certificates.tsx#L98) |
| Stamp issuer (Amanj Academy…) | PP Neue Montreal | 700 | 20 at full collage width | 14 | [Certificates.tsx:104](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/Certificates.tsx#L104) |
| How I Work number (01–04) | PP Neue Montreal | 700 | 44 | 36.2 | [HowIWork.tsx:101](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/HowIWork.tsx#L101) |
| How I Work step title (Discover…) | Playfair Display | 700 | 28 | 23.1 | [HowIWork.tsx:102](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/HowIWork.tsx#L102) |
| How I Work list | PP Neue Montreal | 500 | 18 (17 phone) | 14.8 | [HowIWork.tsx:105](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/HowIWork.tsx#L105) |
| Tool names | PP Neue Montreal | 500 | 16 | 13.2 | [HowIWork.tsx:28](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/HowIWork.tsx#L28) |

### Experience

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| Title “Where I’ve been working” | Playfair Display | 700 | 28 on screen | 27 | [Experience.tsx:74](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Experience.tsx#L74) |
| Job role | PP Neue Montreal | 700 | 18 | 16 | [Experience.tsx:30](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Experience.tsx#L30) |
| Company | PP Neue Montreal | 500 | 15 | 13.4 | [Experience.tsx:31](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Experience.tsx#L31) |
| Location, dates | PP Neue Montreal | 500 | 14 | 12.5 | [Experience.tsx:32](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Experience.tsx#L32) |
| “Completed Tasks” | PP Neue Montreal | 700 | 18 | 16 | [Experience.tsx:60](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Experience.tsx#L60) |
| Tasks | PP Neue Montreal | 500 | 16 | 14.3 | [Experience.tsx:61](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Experience.tsx#L61) |

### Projects

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| Title “What I’ve done” | Playfair Display | 700 | 28 on screen | 27 | [ProjectDeck.tsx:65](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ProjectDeck.tsx#L65) |
| Project name | Playfair Display | 800 | 36 (30 phone) | 34.9 | [ProjectDeck.tsx:95](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ProjectDeck.tsx#L95) |
| Field (“Media:”) | PP Neue Montreal | 600 | 20 | 19.4 | [ProjectDeck.tsx:97](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ProjectDeck.tsx#L97) |
| Tags (B2C, iOS) | PP Neue Montreal | 600 | 16 | 15.5 | [ProjectDeck.tsx:99](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ProjectDeck.tsx#L99) |
| Description | PP Neue Montreal | 400 | 16 | 15.5 | [ProjectDeck.tsx:104](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ProjectDeck.tsx#L104) |
| View Case Study | PP Neue Montreal | 700 | 14 | 13.6 | [ProjectDeck.tsx:113](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ProjectDeck.tsx#L113) |

### Research

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| Title “My research area” | Playfair Display | 700 | 28 on screen | 27 | [BarList.tsx:38](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/BarList.tsx#L38) |
| Journal label “JOURNAL · 2025” | PP Neue Montreal | 400 | 10 | 8.9 | [Research.tsx:53](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L53) |
| Journal name | Playfair Display | 700 | 23 | 20.5 | [Research.tsx:56](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L56) |
| “Elsevier · peer-reviewed” | PP Neue Montreal | 500 | 11 | 9.8 | [Research.tsx:57](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L57) |
| Stamp “Published” | Playfair Display | 700 | 20 (17 phone) | 17.8 | [Research.tsx:40](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L40) |
| Stamp “PEER / REVIEWED” | PP Neue Montreal | 500 | 8 (7 phone) | 7.1 | [Research.tsx:39](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L39) |
| Keywords | PP Neue Montreal | 600 | 13 | 11.6 | [Research.tsx:74](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L74) |
| Paper title | Playfair Display | 700 | 22 | 19.6 | [Research.tsx:80](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L80) |
| Authors | PP Neue Montreal | 500 (your name 600) | 13 | 11.6 | [Research.tsx:82](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L82) |
| Summary | PP Neue Montreal | 500 | 14 | 12.5 | [Research.tsx:97](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L97) |
| View publication link | PP Neue Montreal | 600 | 13 | 11.6 | [ViewCitation.tsx:14](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ViewCitation.tsx#L14) |
| Citation text | PP Neue Montreal | 500 | 12.5 | 11.1 | [ViewCitation.tsx:18](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/ViewCitation.tsx#L18) |
| View Case Study | PP Neue Montreal | 700 | 14 | 12.5 | [Research.tsx:66](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L66) |
| Paragraphs on the right | PP Neue Montreal | 500 | 16 | 14.3 | [Research.tsx:127](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/sections/Research.tsx#L127) |

### Footer

| Text | Font | Weight | In code (px) | On screen at 1440 (px) | Where |
|---|---|---|---|---|---|
| “Let’s get in touch” | Playfair Display | 800 | 44 (36 phone) | 42.6 | [SiteFooter.tsx:45](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/SiteFooter.tsx#L45) |
| © line | PP Neue Montreal | 500 | 13 | 12.6 | [SiteFooter.tsx:64](https://github.com/sarvmhi/sarvmhi.github.io/blob/main/components/SiteFooter.tsx#L64) |
