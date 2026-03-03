"use client";

import { categories } from "@/app/lib/words";

interface Props {
  selected: string | null;
  onSelect: (name: string | null) => void;
}

export default function CategoryPicker({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`
          px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all
          ${selected === null
            ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
            : "bg-white/5 border-white/10 text-slate-400 hover:border-purple-500/40 hover:text-purple-300"
          }
        `}
      >
        🎲 Random
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className={`
            px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition-all
            ${selected === cat.name
              ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]"
              : "bg-white/5 border-white/10 text-slate-400 hover:border-purple-500/40 hover:text-purple-300"
            }
          `}
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
