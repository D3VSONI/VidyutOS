# VidyutOS — Grades 6–12 School Portal

A cinematic, interactive product experience for a next-generation unified school portal for Grades 6–12. It walks through the problem students face after missing school, then demonstrates the solution through 12 interactive scenes, including **Catch Me Up**, **Smart Lost & Found** and **Peer Help Exchange**.

> "Missing one school day shouldn't mean losing the whole week."

## Scenes

| # | Scene | What it shows |
|---|-------|---------------|
| 01 | Opening | Introduction to the unified school portal |
| 02 | The Problem | How disconnected school platforms overwhelm an absent student |
| 03 | The Insight | The information exists; the connection does not |
| 04 | Connected Ecosystem | The 9 modules that make up the portal |
| 05 | Introduce Catch Me Up | Turning an absence into a structured recovery plan |
| 06 | Interactive Recovery | Hands-on demo: recovery tasks, recaps and a quick comprehension check |
| 07 | Smart Lost & Found | Matching lost and found items with privacy-first verification |
| 08 | Peer Help Exchange | Teacher-moderated peer tutoring matched by topic and schedule |
| 09 | Invisible Student Alert | Explainable, non-diagnostic early-support rules |
| 10 | Multi-Role Experience | Views for students, teachers, parents and admins |
| 11 | Trust & Feasibility | How the system stays transparent and realistic |
| 12 | Closing | Summary and vision |

Jump straight to a scene with `?scene=<number>`, for example `http://localhost:3000/?scene=6`.

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- GSAP and Motion for animation
- Lucide icons, canvas-confetti

## Run locally

**Prerequisite:** Node.js (or Bun)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

Other scripts:

- `npm run build` — production build into `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — TypeScript type-check

## Demo data

This is a frontend prototype. All students, classes, tasks, lost items and alerts are sample data in `src/lib/demoData.ts`. Nothing is sent to a server and no real student data is used.

## Project structure

```
src/
  App.tsx                 scene navigation and shared state
  main.tsx                app entry
  index.css               global styles
  components/
    Header.tsx
    Navigation.tsx
    scenes/               Scene01Opening … Scene12Closing
  lib/
    types.ts              shared TypeScript types
    demoData.ts           sample data for every scene
    catchMeUp.ts          Catch Me Up recovery logic
    catchMeUp.test.ts     tests for the recovery logic
  assets/images/          scene images
```

## Environment variables

`.env.example` lists `GEMINI_API_KEY` and `APP_URL`, which come from the AI Studio template. The current app doesn't use them to run locally. Never commit a real `.env` or `.env.local` file; `.gitignore` already excludes them.
