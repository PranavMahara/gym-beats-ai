# GymBeats AI

Pick an activity, duration and intensity (plus optional music tastes) and get a workout playlist.
Live: https://gym-beats-ai.vercel.app

## Stack
Next.js 14 (App Router), TypeScript, Tailwind + shadcn/Radix, Clerk (auth), Prisma + MongoDB, Google Gemini, hosted on Vercel.

## How it works
- `/activity` is the form. It POSTs to `app/api/ai/route.ts`.
- The route validates input (zod), applies rate limits (`lib/rate-limit.ts`, stored in MongoDB), then asks Gemini
  for a JSON list of songs. It tries each model in `MODELS` in turn, with a 20s timeout each.
- If AI is unavailable or the user is over the limit, `lib/fallback-songs.ts` builds a playlist from a built-in
  library (rock, hip-hop, rap, EDM) matched on genre and intensity. A playlist is always returned.
- Signed-in users get playlists saved (`Recommendation` model) and shown on `/recommendations` and `/grid`.

## Running locally
```bash
cp .env.example .env.local   # fill in the values
npm install                  # also runs prisma generate
npm run dev
```
Requires Node 24 (`engines` is pinned; Vercel rejects discontinued Node versions).

## Operations notes
- Rate limits: signed-in 20 AI playlists/hour per user, guests 5/hour per IP, 400/day site-wide. Edit in the route.
- Gemini model names change often. If logs show 404 or 503 from Google, update `MODELS` or set `GEMINI_MODEL`.
- Check production logs: `npx vercel logs gym-beats-ai.vercel.app --no-follow`.
- Known follow-ups: Next 14 -> latest, Clerk 5 -> latest, Tailwind 3 -> 4 (major upgrades flagged by `npm audit`).
