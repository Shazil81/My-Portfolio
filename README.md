# My Portfolio

**[View Live Portfolio](https://my-portfolio-three-brown-13.vercel.app/)**

<p><img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind&theme=light" alt="Next.js, React, TypeScript and Tailwind CSS" /></p>

A responsive full-stack developer portfolio with animated section reveals, smooth scrolling, a dark/light theme, technology logos, education, experience, and project case studies.

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 | App Router, static rendering, metadata and project detail routes |
| React 19 | Components and interactive screenshot galleries |
| TypeScript | Typed content and components |
| CSS and Tailwind CSS 4 | Responsive layouts, design tokens, typography and themes |
| GSAP, ScrollTrigger and @gsap/react | Entrance effects, scroll reveals, and interactive motion |
| Lenis | Smooth in-page scrolling |
| SVG and WebP assets | Technology logos and optimized project screenshots |

This is a Next.js project. It replaces the earlier Vite implementation. The frontend is presentation-focused and does not require a separate API server or database.

## Features

- Animated introduction, grid background, and accessible navigation.
- Saved light/dark theme and reduced-motion handling.
- About, skills, experience, education, and contact sections.
- SprintLens first, Railwise second, followed by FlashSale.
- Separate project pages with bold feature highlights, simple technology tags, and live/source links.
- Screenshot galleries: three SprintLens images, four Railwise images, and two FlashSale images, cropped to the application UI.
- Resume download and professional profile links.
- Interactive `/canvas` workspace with draggable cards, themes, and a personalized Live folder.
- In-canvas LeetCode overview: total solved, Easy/Medium/Hard breakdown, and global ranking for Shazil81. Public statistics refresh hourly; unavailable data shows a retry state.

## Local Setup

Use Node.js 20.9 or later and npm.

```bash
git clone https://github.com/Shazil81/My-Portfolio.git
cd My-Portfolio
npm ci
npm run dev
```

Open the URL printed by Next.js. Use `Ctrl+C` to stop the server.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start development mode |
| `npm run typecheck` | Run TypeScript validation |
| `npm run build` | Create the production build |
| `npm start` | Serve the production build |

## Source Structure

```text
app/                  Main page, layout, themes, and /work project routes
components/site/      Page sections, navigation, motion, and screenshot gallery
components/desktop/   Shared cursor and interactive primitives
content/data/         Portfolio text, projects, skills, and experience
content/              Typed content exports and validation
lib/                  Theme, motion, formatting, and content utilities
public/               Static files served by Next.js
next.config.ts        Next.js configuration
vercel.json           Next.js build settings for Vercel
```

The application exposes the portfolio, project pages, personalized canvas, and LeetCode statistics route. Unused editor, archive, game, and visitor modules have been removed.

## Content

Update the JSON files under `content/data/` to change the displayed content. Project technologies must match the toolbox entries in `stack.json`. Project highlights support `**bold text**`. Images are listed in order; the first is the project preview and the complete list appears in the project gallery.

The contact section uses an email link and does not submit messages to a backend. No email API credentials are required.

## Deploy to Vercel

The committed `vercel.json` selects Next.js, installs with `npm ci`, and builds with `npm run build`. The output is `.next`, not the old Vite `dist` folder. No environment variables are required for the included portfolio content.

```bash
npm ci
npm run typecheck
npm run build
```

## LeetCode Overview

The `/api/leetcode` route reads public LeetCode data on the server. It uses the LeetCode profile URL in `content/data/profile.json`; no API key or environment variable is required. Responses are cached for one hour. The overview stays inside the canvas and does not redirect visitors.

## Typography and Appearance

Poppins headings, Lato body text, Roboto labels, and Geomini initials are loaded through Next.js font optimization. Day mode uses stone, charcoal, and burgundy; night mode uses graphite and pale rose. A subtle animated dot field replaces the hero grid.
