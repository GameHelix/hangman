"use client";

interface Props {
  guessedLetters: Set<string>;
  correctLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled?: boolean;
}

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

export default function Keyboard({ guessedLetters, correctLetters, onGuess, disabled }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 sm:gap-2">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            const isCorrect = correctLetters.has(letter);
            const isWrong = isGuessed && !isCorrect;

            return (
              <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={isGuessed || disabled}
                aria-label={`Guess letter ${letter.toUpperCase()}`}
                aria-pressed={isGuessed}
                className={`
                  key-btn
                  w-8 h-10 sm:w-9 sm:h-11 md:w-10 md:h-12
                  rounded-lg font-bold text-sm sm:text-base
                  border transition-all
                  focus:outline-none focus:ring-2 focus:ring-purple-500/50
                  ${isCorrect
                    ? "bg-green-500/20 border-green-500/60 text-green-400 cursor-default shadow-[0_0_8px_rgba(74,222,128,0.3)]"
                    : isWrong
                    ? "bg-red-500/10 border-red-500/30 text-red-400/50 cursor-default"
                    : disabled
                    ? "bg-slate-800/50 border-slate-700/30 text-slate-600 cursor-not-allowed"
                    : "bg-white/5 border-white/10 text-slate-200 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-200 hover:shadow-[0_0_10px_rgba(168,85,247,0.25)] cursor-pointer"
                  }
                `}
              >
                {letter.toUpperCase()}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
