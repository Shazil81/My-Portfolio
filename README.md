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
- SprintLens first, followed by FlashSale.
- Separate project pages with bold feature highlights, simple technology tags, and live/source links.
- Screenshot galleries: three SprintLens images and two FlashSale images, cropped to the application UI.
- Resume download and professional profile links.

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

Some shared components and utilities are retained from the upstream codebase; only the portfolio and project routes are exposed by this application.

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
