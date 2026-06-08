# Qubitcoin Hub

Beginner-friendly onboarding for the [Qubitcoin](https://superquantum.io/qubitcoin) ecosystem. Learn qPoW, set up a wallet, start mining, or buy QTC through guided paths, interactive lessons, and verified links.

Built with Next.js 16, Tailwind CSS 4, and a safety-first content model (official URLs, DYOR disclaimers, scam warnings).

---

## Features

- **Three onboarding paths** at `/start`: understand qPoW, mine QTC, or buy and hold
- **Learn** — visual curriculum with circuit simulator, mining loop, and halving chart
- **Academy** — quizzes, XP, badges, and wallet-first lesson chaining
- **Mining wizard** — 5-step guided setup with pool-verified config generation
- **Resource hubs** — pools, wallets, exchanges, community, and network updates
- **Help** — FAQ, glossary, site search, troubleshooting guide, Quantum Tutor widget
- **Themes** — light, dark, and system mode
- **SEO** — sitemap, JSON-LD (Course, FAQ, HowTo), Open Graph metadata

---

## Quick start

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn)

Optional for asset scripts:

- Python 3 + Pillow (`pip install pillow`)

### Install and run

```bash
git clone https://github.com/YOUR_USERNAME/qubitcoin-hub.git
cd qubitcoin-hub
npm install
cp .env.example .env.local   # optional for local dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Environment variables

Copy `.env.example` to `.env.local`. **Nothing is required for local development** — the app ships with sensible defaults.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Sanity project for mining wizard config (default: `32dlbkdi`) |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Sanity dataset (default: `production`) |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical URL for sitemap, OG tags, and JSON-LD |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | Enables Plausible analytics when set |
| `QTC_PROGRESS_STORE` | No | Set to `1` to enable optional `/api/progress` backup |

Set production values in your hosting provider (e.g. Vercel project settings). Never commit `.env.local`.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |
| `npm run assets:logo` | Regenerate logo, favicon, and app icon from source |
| `npm run assets:hero` | Regenerate homepage hero video |
| `npm run assets` | Run both asset scripts |

---

## Project structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── start/           # Path picker + mining wizard
│   ├── learn/           # Visual curriculum
│   ├── academy/         # Quizzes and XP
│   ├── help/            # Troubleshooting
│   └── api/             # Tutor + optional progress sync
├── components/          # UI, layout, learn, mining, academy
├── lib/                 # Content, links, search index, Sanity
└── store/               # Zustand (academy, learn, mining progress)

public/                  # Logo, favicon, hero video, static assets
scripts/                 # Python asset pipelines
sanity/schemas/          # CMS schema definitions (optional Studio deploy)
```

---

## Key routes

| Path | Purpose |
|------|---------|
| `/` | Video landing + scrolly hero |
| `/start` | Pick your onboarding path |
| `/learn` | qPoW and tokenomics explainers |
| `/academy` | Lessons and quizzes |
| `/start/mine` | Mining setup wizard |
| `/pool`, `/wallet`, `/buy` | Verified resource directories |
| `/community`, `/updates` | Official channels and patch history |
| `/faq`, `/glossary`, `/search` | Help and discovery |
| `/help/troubleshooting` | Common setup fixes |
| `/ecosystem` | Interactive ecosystem map |

---

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add environment variables from `.env.example` (at minimum `NEXT_PUBLIC_SITE_URL`).
4. Deploy. Vercel will run `npm run build` on each push to `main`.

---

## Content and safety

- Pool, wallet, and exchange links are curated from official [Superquantum](https://superquantum.io/qubitcoin) sources.
- Mining configs are validated against official pool documentation (with Sanity CMS + static fallback).
- This site is a **community onboarding project**, not financial advice. Qubitcoin is experimental. DYOR.

---

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand.docs.pmnd.rs/) (client progress)
- [Sanity](https://www.sanity.io/) (mining wizard CMS)
- [next-themes](https://github.com/pacocoursey/next-themes)

---

## License

Private project. All rights reserved unless otherwise specified by the repository owner.
