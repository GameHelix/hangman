"use client";

import React from "react";

interface Props {
  wrongCount: number;
}

const BASE_STROKE = {
  stroke: "#94a3b8",
  strokeWidth: 4,
  strokeLinecap: "round" as const,
  fill: "none",
};

const BODY_STROKE = {
  ...BASE_STROKE,
  stroke: "#e94560",
  strokeWidth: 3,
};

// Each part appears when wrongCount reaches its index + 1
const parts: React.ReactElement[] = [
  // 1 – head
  <circle
    key="head"
    cx="130" cy="60" r="22"
    {...BODY_STROKE}
    className="hangman-stroke"
    style={{ animationDelay: "0ms" }}
  />,
  // 2 – body
  <line
    key="body"
    x1="130" y1="82" x2="130" y2="160"
    {...BODY_STROKE}
    className="hangman-stroke"
    style={{ animationDelay: "0ms" }}
  />,
  // 3 – left arm
  <line
    key="left-arm"
    x1="130" y1="105" x2="90" y2="140"
    {...BODY_STROKE}
    className="hangman-stroke"
    style={{ animationDelay: "0ms" }}
  />,
  // 4 – right arm
  <line
    key="right-arm"
    x1="130" y1="105" x2="170" y2="140"
    {...BODY_STROKE}
    className="hangman-stroke"
    style={{ animationDelay: "0ms" }}
  />,
  // 5 – left leg
  <line
    key="left-leg"
    x1="130" y1="160" x2="90" y2="205"
    {...BODY_STROKE}
    className="hangman-stroke"
    style={{ animationDelay: "0ms" }}
  />,
  // 6 – right leg
  <line
    key="right-leg"
    x1="130" y1="160" x2="170" y2="205"
    {...BODY_STROKE}
    className="hangman-stroke"
    style={{ animationDelay: "0ms" }}
  />,
];

export default function HangmanDrawing({ wrongCount }: Props) {
  return (
    <svg
      viewBox="0 0 240 260"
      className="w-full max-w-[220px] md:max-w-[260px] drop-shadow-lg"
      aria-label={`Hangman figure with ${wrongCount} wrong guesses`}
    >
      {/* Gallows structure */}
      {/* Base */}
      <line x1="10" y1="250" x2="230" y2="250" {...BASE_STROKE} strokeWidth={5} />
      {/* Pole */}
      <line x1="60" y1="250" x2="60" y2="10" {...BASE_STROKE} strokeWidth={5} />
      {/* Top bar */}
      <line x1="60" y1="10" x2="130" y2="10" {...BASE_STROKE} strokeWidth={5} />
      {/* Rope */}
      <line x1="130" y1="10" x2="130" y2="38" {...BASE_STROKE} strokeWidth={3} />

      {/* Body parts – rendered up to wrongCount */}
      {parts.slice(0, wrongCount)}
    </svg>
  );
}
