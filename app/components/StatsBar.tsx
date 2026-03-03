"use client";

interface Props {
  wins: number;
  losses: number;
  streak: number;
}

export default function StatsBar({ wins, losses, streak }: Props) {
  const total = wins + losses;
  const winPct = total === 0 ? 0 : Math.round((wins / total) * 100);

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 text-center">
      <Stat label="Wins" value={wins} color="text-green-400" />
      <div className="h-8 w-px bg-white/10" />
      <Stat label="Losses" value={losses} color="text-red-400" />
      <div className="h-8 w-px bg-white/10" />
      <Stat label="Win %" value={`${winPct}%`} color="text-purple-400" />
      <div className="h-8 w-px bg-white/10" />
      <Stat label="Streak" value={streak > 0 ? `${streak} 🔥` : streak} color="text-yellow-400" />
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`text-lg sm:text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">{label}</span>
    </div>
  );
}
