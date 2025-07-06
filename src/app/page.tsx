"use client";

import { useEffect } from "react";
import { Piano } from "@/components/organisms/Piano";
import { initMIDI } from "@/lib/pianoEngine";

export default function Home() {
  useEffect(() => {
    initMIDI();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-950 text-white font-sans">
      {/* Header */}
      <header className="p-5 border-b border-neutral-800 shadow-sm bg-neutral-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">PiaNova By Arshia Pazoki</h1>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              PiaNova is a multi-purpose interactive piano web app built with{" "}
              <a href="https://nextjs.org/" className="underline hover:text-blue-400" target="_blank">Next.js 14</a>,{" "}
              <a href="https://tailwindcss.com/" className="underline hover:text-blue-400" target="_blank">Tailwind CSS</a>, and{" "}
              <a href="https://bradfrost.com/blog/post/atomic-web-design/" className="underline hover:text-blue-400" target="_blank">Atomic Design</a>.
            </p>
          </div>
          <span className="text-xs text-neutral-500">v0.1.0 Alpha</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-8 overflow-auto">
        <section className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-white">🚀 Features</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-neutral-300">
            <li>🎹 Play piano using keyboard, MIDI devices, or touch input</li>
            <li>📝 Create, read, and play music from digital sheet notation</li>
            <li>🎥 Piano waterfall mode with visual feedback while playing and recording</li>
            <li>🎧 Record what you play directly to sheet mode</li>
            <li>📥 (Coming Soon) Convert audio (MP3) to piano sheet</li>
            <li>📚 (Coming Soon) Learn real songs with audio-visual feedback</li>
          </ul>

          {/* Placeholder: Future UI components */}
          <div className="mt-8 border border-neutral-800 rounded-lg p-6 bg-neutral-900 text-center">
            <p className="text-neutral-500">🎵 No project loaded.</p>
            <p className="text-sm mt-2 text-neutral-500">
              Start playing below — or drag a MIDI/audio file (coming soon).
            </p>
          </div>

          {/* MIDI Status (optional) */}
          <div className="mt-4 text-xs text-neutral-600 italic text-center">
            MIDI devices will auto-connect if supported by your browser.
          </div>
        </section>
      </main>

      {/* Bottom Piano */}
      <footer className="w-full h-[25vh] border-t border-neutral-800 bg-neutral-900">
        <Piano />
      </footer>
    </div>
  );
}
