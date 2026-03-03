import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman – Word Guessing Game",
  description: "A beautiful, responsive hangman word-guessing game built with Next.js and Tailwind CSS.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
