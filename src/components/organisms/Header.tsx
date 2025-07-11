"use client";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full border-b border-neutral-800 bg-neutral-900 shadow-sm text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        {/* App Name & Credit */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <h1 className="text-2xl font-bold tracking-tight">PiaNova</h1>
          <span className="text-sm text-neutral-500 font-medium hidden sm:inline hover:text-red-500">
            A Symphony of Codes & Notes Orchestrated with ❤️ By Arshia Pazoki
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-5 text-sm font-medium text-neutral-400">
          <Link
            href="#keyboard"
            className="hover:text-white transition-colors"
          >
            Keyboard
          </Link>
          <Link
            href="#record"
            className="hover:text-white transition-colors"
          >
            Record
          </Link>
          <Link
            href="#waterfall"
            className="hover:text-white transition-colors"
          >
            Sythesia
          </Link>
        </nav>
      </div>
    </header>
  );
};
