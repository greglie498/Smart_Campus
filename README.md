# Smart Campus Navigation System — USIU-Africa

A campus wayfinding prototype for USIU-Africa, built as an HCI/Software
Engineering project. Split into an independent Express API backend and a
React (Vite) frontend, with search, saved favourites, an interactive campus
map, stub turn-by-turn directions, and light/dark theming.

## Features

- **Browse & search** schools, cafeterias, and general campus locations
- **Get Directions** — expandable stub turn-by-turn steps generated from each
  location's own data, with an estimated walk time
- **Favourites** — save/remove locations locally (no account needed) via the
  star button on any detail page or the Favourites panel from the nav bar
- **Interactive campus map** — Leaflet map centered on USIU-Africa's real
  coordinates, with clickable pins for every school, cafeteria, and location
- **Light/dark mode** — toggle in the top-right of every page, remembers your
  choice, and defaults to your OS preference on first visit
- **Accessible by default** — skip-to-content link, visible keyboard focus
  rings, `aria-live` status updates, `prefers-reduced-motion` support, and
  Escape-to-close on every dialog/overlay

## Tech stack

**Backend:** Node.js, TypeScript, Express 5, esbuild (production bundling)
**Frontend:** React 18, Vite, TypeScript, Tailwind CSS, React Router,
TanStack Query, Leaflet, shadcn/ui, next-themes
**Shared:** a `shared/` folder of TypeScript types imported by both sides via
a `@shared/*` path alias, so a type change is felt on both ends at compile time

## Project structure

smart-campus-navigation/
├── backend/
│ └── src/
│ ├── data/ # seed data: schools, cafeterias, locations
│ ├── services/ # business logic (lookup, search, directions)
│ ├── routes/ # Express routers, one per resource
│ ├── app.ts # builds the Express app (no listen — testable)
│ └── server.ts # the only file that actually calls .listen()
├── frontend/
│ └── src/
│ ├── pages/ # Index, SchoolDetails, CafeteriaDetails, LocationDetails, NotFound
│ ├── components/ # DirectionsPanel, FavouriteButton, CampusMap, ThemeToggle, ui/
│ ├── hooks/ # use-campus-data (React Query), use-favourites
│ └── lib/api.ts # typed fetch wrapper — the only file that calls fetch()
└── shared/
└── types.ts # School, Cafeteria, Location, SearchResult, Directions


## Getting started

You need Node.js 18+ installed. Backend and frontend are separate npm
projects and run as two separate processes.

**1. Backend** (runs on `http://localhost:4000`)
```bash
cd backend
npm install
npm run dev
```

**2. Frontend** (runs on `http://localhost:5173`)
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. In development, Vite proxies any request to
`/api/*` straight through to the backend on port 4000 (see
`frontend/vite.config.ts`) — you don't need to configure anything extra.

### Production build
```bash
# backend — bundles to backend/dist/server.js
cd backend && npm run build && npm start

# frontend — outputs static files to frontend/dist/
cd frontend && npm run build && npm run preview
```
If frontend and backend are ever deployed to *different* hosts (e.g.
Netlify + Render), set `VITE_API_BASE_URL` in the frontend's environment to
the backend's full URL before building — see `frontend/src/lib/api.ts`.

## API reference

All routes are prefixed with `/api` and return JSON.

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/schools` | List all schools |
| GET | `/schools/:slug` | One school, or 404 |
| GET | `/cafeterias` | List all cafeterias |
| GET | `/cafeterias/:slug` | One cafeteria, or 404 |
| GET | `/locations` | List all general locations |
| GET | `/locations/:slug` | One location, or 404 |
| GET | `/search?q=` | Search across all three by name |
| GET | `/directions/:category/:slug` | Stub directions (`category` is `school` \| `cafeteria` \| `location`) |

## Known limitations (by design, disclosed in the UI)

- **Directions are a stub, not real routing.** There's no GPS/pathway data
  for the campus, so `/api/directions` generates plausible walking steps from
  each location's own `facilities`/`nearby` fields rather than a real routing
  engine. The walk-time estimate is deterministic (same slug → same number
  every time), not measured.
- **Map pin positions are illustrative, not surveyed.** USIU-Africa doesn't
  publish per-building coordinates, so each pin is placed at a deterministic
  approximate offset from the real, confirmed campus center (USIU Road,
  Kasarani, Nairobi). The map itself is centered on real coordinates; the
  individual pins are not.
- **Favourites are device-local, not account-based.** There's no
  authentication in this project, so "favourites" are stored in the
  browser's `localStorage` — they won't follow you to another device or
  browser.

## Scripts reference

| Location | Command | Does |
|---|---|---|
| `backend/` | `npm run dev` | Start with hot-reload (`tsx watch`) |
| `backend/` | `npm run build` | Bundle to `dist/server.js` (esbuild) |
| `backend/` | `npm start` | Run the built bundle |
| `backend/` | `npm run typecheck` | `tsc --noEmit` |
| `frontend/` | `npm run dev` | Start Vite dev server |
| `frontend/` | `npm run build` | Production build to `dist/` |
| `frontend/` | `npm run preview` | Serve the production build locally |
| `frontend/` | `npm run typecheck` | `tsc --noEmit` |

---
