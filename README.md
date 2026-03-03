# ☠️ Hangman – Word Guessing Game

A beautiful, fully-responsive **Hangman** game built with **Next.js 15**, **TypeScript**, and **Tailwind CSS v4**.

---

## Features

- **Animated SVG gallows** — each wrong guess draws the next body part with a smooth stroke animation
- **6 word categories** — Animals, Countries, Technology, Food, Movies, Science (120+ words total)
- **Category picker** — filter by category or go full random
- **Full keyboard support** — click on-screen keys *or* type on your physical keyboard; press **Enter** to restart
- **Live stats** — wins, losses, win %, and current streak tracked in-session
- **Chances indicator** — colour-coded pills showing remaining lives at a glance
- **Responsive layout** — works great on phones, tablets, and desktops
- **Dark theme** — deep navy/purple palette with glowing accents and glassmorphism cards
- **Custom SVG favicon** — matches the game's aesthetic
- **Accessible** — ARIA labels on all interactive elements; fully keyboard-navigable

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/hangman.git
cd hangman

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
hangman/
├── app/
│   ├── components/
│   │   ├── CategoryPicker.tsx   # Category filter buttons
│   │   ├── HangmanDrawing.tsx   # Animated SVG hangman figure
│   │   ├── HangmanWord.tsx      # Letter blanks / reveal
│   │   ├── Keyboard.tsx         # On-screen A–Z keyboard
│   │   └── StatsBar.tsx         # Win / loss / streak display
│   ├── lib/
│   │   └── words.ts             # Word list + getRandomWord helper
│   ├── globals.css              # Global styles & custom animations
│   ├── layout.tsx               # Root layout + metadata / favicon
│   └── page.tsx                 # Main game page (useReducer state machine)
├── public/
│   └── favicon.svg              # Custom SVG favicon
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## How to Play

1. **Choose a category** (or leave it on Random).
2. **Guess letters** by clicking the on-screen keyboard or pressing keys on your physical keyboard.
3. You have **6 wrong guesses** before the hangman is fully drawn — try not to run out!
4. **Win** by revealing the entire word before the figure is complete.
5. Press **Enter** or click **Play Again** to start a new round.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |

---

## License

MIT — free to use, modify, and distribute.
