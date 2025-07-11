"use client";

import { useEffect } from "react";
import { Piano } from "@/components/organisms/Piano";
import { initMIDI } from "@/lib/pianoEngine";
// import { keyNoteMap } from "@/hooks/useKeyboardPiano";
// import { RecordPanel } from "@/components/organisms/RecordPanel";
import { Keyboard } from "@/components/organisms/Keyboard";
import { Header } from "@/components/organisms/Header";

export default function Home() {
  useEffect(() => {
    initMIDI();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-neutral-950 text-white font-sans">
      {/* Header */}
      <Header/>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 overflow-auto no-scrollbar">
        {/* <RecordPanel/> */}
        <Keyboard/>
      </main>

      {/* Bottom Piano */}
      <footer className="w-full h-[25vh] ring-t ring-neutral-800 bg-neutral-900">
        <Piano />
      </footer>
    </div>
  );
}
