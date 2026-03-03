"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import HangmanDrawing from "@/app/components/HangmanDrawing";
import HangmanWord from "@/app/components/HangmanWord";
import Keyboard from "@/app/components/Keyboard";
import CategoryPicker from "@/app/components/CategoryPicker";
import StatsBar from "@/app/components/StatsBar";
import { getRandomWord, MAX_WRONG, Category } from "@/app/lib/words";

// ── State ──────────────────────────────────────────────────────────────────
type GameStatus = "playing" | "won" | "lost";

interface GameState {
  word: string;
  category: Category;
  guessedLetters: string[];
  wins: number;
  losses: number;
  streak: number;
  selectedCategory: string | null;
}

type Action =
  | { type: "GUESS"; letter: string }
  | { type: "NEW_GAME" }
  | { type: "SET_CATEGORY"; category: string | null };

function deriveStatus(word: string, guessed: string[]): GameStatus {
  const wrong = guessed.filter((l) => !word.includes(l)).length;
  if (wrong >= MAX_WRONG) return "lost";
  if (word.split("").every((l) => guessed.includes(l))) return "won";
  return "playing";
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GUESS": {
      if (
        state.guessedLetters.includes(action.letter) ||
        deriveStatus(state.word, state.guessedLetters) !== "playing"
      ) return state;
      const next = [...state.guessedLetters, action.letter];
      const status = deriveStatus(state.word, next);
      return {
        ...state,
        guessedLetters: next,
        wins:   status === "won"  ? state.wins + 1   : state.wins,
        losses: status === "lost" ? state.losses + 1 : state.losses,
        streak: status === "won"  ? state.streak + 1 : status === "lost" ? 0 : state.streak,
      };
    }
    case "NEW_GAME": {
      const { word, category } = getRandomWord(state.selectedCategory ?? undefined);
      return { ...state, word, category, guessedLetters: [] };
    }
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.category };
    default:
      return state;
  }
}

function init(selectedCategory: string | null): GameState {
  const { word, category } = getRandomWord(selectedCategory ?? undefined);
  return { word, category, guessedLetters: [], wins: 0, losses: 0, streak: 0, selectedCategory };
}

// ── Component ─────────────────────────────────────────────────────────────
export default function HangmanGame() {
  const [state, dispatch] = useReducer(reducer, null, () => init(null));
  const newGameBtnRef = useRef<HTMLButtonElement>(null);

  const guessedSet = new Set(state.guessedLetters);
  const wrongCount = state.guessedLetters.filter((l) => !state.word.includes(l)).length;
  const correctSet = new Set(state.guessedLetters.filter((l) => state.word.includes(l)));
  const status: GameStatus = deriveStatus(state.word, state.guessedLetters);
  const chancesLeft = MAX_WRONG - wrongCount;

  const guess = useCallback((letter: string) => {
    dispatch({ type: "GUESS", letter });
  }, []);

  const newGame = useCallback(() => {
    dispatch({ type: "NEW_GAME" });
  }, []);

  // Keyboard support
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" && status !== "playing") {
        newGame();
        return;
      }
      const letter = e.key.toLowerCase();
      if (/^[a-z]$/.test(letter) && status === "playing") {
        guess(letter);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [guess, newGame, status]);

  // Focus new-game button when game ends
  useEffect(() => {
    if (status !== "playing") {
      setTimeout(() => newGameBtnRef.current?.focus(), 300);
    }
  }, [status]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass border-b border-white/5 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-float inline-block">☠️</span>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">
              <span className="text-white">Hang</span>
              <span className="text-[#e94560]">man</span>
            </h1>
          </div>
          <StatsBar wins={state.wins} losses={state.losses} streak={state.streak} />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-6 sm:py-8 flex flex-col gap-6">

        {/* Category picker */}
        <section aria-label="Category selection">
          <CategoryPicker
            selected={state.selectedCategory}
            onSelect={(cat) => {
              dispatch({ type: "SET_CATEGORY", category: cat });
              dispatch({ type: "NEW_GAME" });
            }}
          />
        </section>

        {/* Game area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Left – drawing + meta */}
          <div className="glass rounded-2xl p-6 flex flex-col items-center gap-4">
            {/* Category badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-300 tracking-wide">
              <span>{state.category.emoji}</span>
              <span>{state.category.name}</span>
            </div>

            <HangmanDrawing wrongCount={wrongCount} />

            {/* Chance pills */}
            <div className="flex items-center gap-2">
              {Array.from({ length: MAX_WRONG }).map((_, i) => (
                <span
                  key={i}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${i < wrongCount
                      ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]"
                      : "bg-white/10 border border-white/15"
                    }
                  `}
                />
              ))}
              <span className="ml-2 text-xs text-slate-400">
                {chancesLeft} chance{chancesLeft !== 1 ? "s" : ""} left
              </span>
            </div>
          </div>

          {/* Right – word + keyboard */}
          <div className="flex flex-col gap-6 items-center">

            {/* Word display */}
            <div className="glass rounded-2xl p-6 w-full flex justify-center">
              <HangmanWord
                word={state.word}
                guessedLetters={guessedSet}
                reveal={status !== "playing"}
              />
            </div>

            {/* Status overlay */}
            {status !== "playing" && (
              <div
                className={`
                  glass rounded-2xl p-5 w-full text-center border animate-fade-in-up
                  ${status === "won"
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-red-500/30 bg-red-500/5"
                  }
                `}
              >
                {status === "won" ? (
                  <>
                    <div className="text-4xl mb-2 animate-win-bounce inline-block">🎉</div>
                    <p className="text-green-400 font-bold text-lg">You won!</p>
                    <p className="text-slate-400 text-sm mt-1">
                      The word was <strong className="text-green-300">{state.word.toUpperCase()}</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-2 animate-shake inline-block">💀</div>
                    <p className="text-red-400 font-bold text-lg">Game over!</p>
                    <p className="text-slate-400 text-sm mt-1">
                      The word was <strong className="text-red-300">{state.word.toUpperCase()}</strong>
                    </p>
                  </>
                )}
                <button
                  ref={newGameBtnRef}
                  onClick={newGame}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all hover:shadow-[0_0_16px_rgba(168,85,247,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Play Again
                </button>
              </div>
            )}

            {/* Keyboard */}
            <div className="glass rounded-2xl p-4 sm:p-5 w-full">
              <Keyboard
                guessedLetters={guessedSet}
                correctLetters={correctSet}
                onGuess={guess}
                disabled={status !== "playing"}
              />
              <p className="text-center text-[10px] text-slate-600 mt-3">
                You can also use your physical keyboard · Press Enter to restart
              </p>
            </div>

          </div>
        </div>

        {/* New game button (always visible while playing) */}
        {status === "playing" && (
          <div className="flex justify-center">
            <button
              onClick={newGame}
              className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20 text-sm font-medium transition-all"
            >
              Skip word
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-600 border-t border-white/5">
        Built with Next.js &amp; Tailwind CSS · ☠️ Hangman Game
      </footer>
    </div>
  );
}
