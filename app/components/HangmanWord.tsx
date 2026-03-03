"use client";

interface Props {
  word: string;
  guessedLetters: Set<string>;
  reveal?: boolean;
}

export default function HangmanWord({ word, guessedLetters, reveal = false }: Props) {
  return (
    <div
      className="flex flex-wrap justify-center gap-2 sm:gap-3"
      aria-label={`Word: ${word.split("").map((l) => (guessedLetters.has(l) || reveal ? l : "_")).join(" ")}`}
    >
      {word.split("").map((letter, i) => {
        const guessed = guessedLetters.has(letter);
        const show = guessed || reveal;
        const missed = reveal && !guessed;

        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={`
                text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest min-w-[1.6rem] sm:min-w-[2rem] text-center
                transition-all duration-300
                ${show
                  ? missed
                    ? "text-red-400 animate-fade-in-up"
                    : "text-green-400 animate-fade-in-up"
                  : "text-transparent"
                }
              `}
            >
              {show ? letter.toUpperCase() : "A"}
            </span>
            {/* Underline */}
            <span
              className={`
                block h-[3px] w-full rounded-full
                ${missed ? "bg-red-500/70" : "bg-slate-500/60"}
              `}
            />
          </div>
        );
      })}
    </div>
  );
}
