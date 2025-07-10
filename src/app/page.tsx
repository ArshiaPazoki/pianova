"use client";

import { useEffect } from "react";
import { Piano } from "@/components/organisms/Piano";
import { initMIDI } from "@/lib/pianoEngine";
import { keyNoteMap } from "@/hooks/useKeyboardPiano";

export default function Home() {
  useEffect(() => {
    initMIDI();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-950 text-white font-sans">
      {/* Header */}
      <header className="p-5 ring-b ring-neutral-800 shadow-sm bg-neutral-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="">
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              PiaNova <span className="text-2xl">By Arshia Pazoki</span>
            </h1>
            <p className="text-sm text-neutral-400 mt-1 max-w-3xl">
              PiaNova is a multi-purpose interactive piano web app built with{" "}
              <a
                href="https://nextjs.org/"
                className="underline hover:text-blue-400"
                target="_blank"
              >
                Next.js 14
              </a>
              ,{" "}
              <a
                href="https://tailwindcss.com/"
                className="underline hover:text-blue-400"
                target="_blank"
              >
                Tailwind CSS
              </a>
              , and{" "}
              <a
                href="https://bradfrost.com/blog/post/atomic-web-design/"
                className="underline hover:text-blue-400"
                target="_blank"
              >
                Atomic Design
              </a>
              .
            </p>
          </div>
          <span className="text-xs text-neutral-500">v0.1.0 Alpha</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 overflow-auto no-scrollbar">
        <section className="max-w-3xl mx-auto">

          {/* 🎹 Full QWERTY Layout with Notes on Mapped Keys */}
          <div className="mt-0 px-4 py-6 ring ring-neutral-800 rounded-xl bg-neutral-900 w-full max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-4 text-center">
              🎮 Keyboard to Piano Keys Mapping
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {/* Row 1: Number row */}
              <div className="flex justify-center gap-1.5">
                {[
                  "~",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "0",
                  "-",
                  "=",
                ].map((key) => (
                  <kbd
                    key={key}
                    className={`w-10 h-10 flex items-center justify-center rounded ring ${
                      keyNoteMap[key]
                        ? "bg-neutral-950 text-white ring-neutral-600 hover:ring-red-600"
                        : "bg-neutral-950 text-neutral-700 ring-neutral-800"
                    }`}
                  >
                    {keyNoteMap[key] ?? key}
                  </kbd>
                ))}
                <kbd className="w-16 h-10 flex items-center justify-center rounded ring bg-neutral-950 text-neutral-500 ring-neutral-800">
                  ⌫
                </kbd>
              </div>

              {/* Row 2: QWERTY */}
              <div className="flex justify-center gap-1.5">
                <kbd className="w-14 h-10 flex items-center justify-center rounded ring bg-neutral-950 text-neutral-500 ring-neutral-800">
                  ⇥
                </kbd>
                {[
                  "q",
                  "w",
                  "e",
                  "r",
                  "t",
                  "y",
                  "u",
                  "i",
                  "o",
                  "p",
                  "[",
                  "]",
                  "\\",
                ].map((key) => (
                  <kbd
                    key={key}
                    className={`w-10 h-10 flex items-center justify-center rounded ring ${
                      keyNoteMap[key]
                        ? "bg-neutral-950 text-white ring-neutral-600 hover:ring-red-600"
                        : "bg-neutral-950 text-neutral-700 ring-neutral-800"
                    }`}
                  >
                    {keyNoteMap[key] ?? key}
                  </kbd>
                ))}
              </div>

              {/* Row 3: ASDF */}
              <div className="flex justify-center gap-1.5">
                <kbd className="w-16 h-10 flex items-center justify-center rounded ring bg-neutral-950 text-neutral-500 ring-neutral-800">
                  ⇪
                </kbd>
                {["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"].map(
                  (key) => (
                    <kbd
                      key={key}
                      className={`w-10 h-10 flex items-center justify-center rounded ring ${
                        keyNoteMap[key]
                          ? "bg-neutral-950 text-white ring-neutral-600 hover:ring-red-600"
                          : "bg-neutral-950 text-neutral-700 ring-neutral-800"
                      }`}
                    >
                      {keyNoteMap[key] ?? key}
                    </kbd>
                  )
                )}
                <kbd className="w-16 h-10 flex items-center justify-center rounded ring bg-neutral-950 text-neutral-500 ring-neutral-800">
                  ⏎
                </kbd>
              </div>

              {/* Row 4: ZXCV */}
              <div className="flex justify-center gap-1.5">
                <kbd className="w-20 h-10 flex items-center justify-center rounded ring bg-neutral-950 text-neutral-500 ring-neutral-800">
                  ⇧
                </kbd>
                {["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"].map(
                  (key) => (
                    <kbd
                      key={key}
                      className={`w-10 h-10 flex items-center justify-center rounded ring ${
                        keyNoteMap[key]
                          ? "bg-neutral-950 text-white ring-neutral-600 hover:ring-red-600"
                          : "bg-neutral-950 text-neutral-700 ring-neutral-800"
                      }`}
                    >
                      {keyNoteMap[key] ?? key}
                    </kbd>
                  )
                )}
                <kbd className="w-24 h-10 flex items-center justify-center rounded ring bg-neutral-950 text-neutral-500 ring-neutral-800">
                  ⇧
                </kbd>
              </div>
            </div>
          </div>

          {/* Placeholder: Future UI components */}
          <div className="mt-4 ring ring-neutral-800 rounded-lg p-4 bg-neutral-900 text-center">
            <p className="text-neutral-500">🎵 No project loaded.</p>
            <p className="text-sm mt-2 text-neutral-500">
              Start playing below — or drag a MIDI/audio file (coming soon).
            </p>
          </div>

          {/* MIDI Status (optional) */}
          <div className="mt-2 text-xs text-neutral-600 italic text-center">
            MIDI devices will auto-connect if supported by your browser.
          </div>
        </section>
      </main>

      {/* Bottom Piano */}
      <footer className="w-full h-[25vh] ring-t ring-neutral-800 bg-neutral-900">
        <Piano />
      </footer>
    </div>
  );
}
