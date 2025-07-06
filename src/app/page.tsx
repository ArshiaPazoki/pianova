"use client";
import { Piano } from "@/components/organisms/Piano";
import { useEffect } from "react";
import { initMIDI } from "@/lib/pianoEngine";

export default function Home() {
  useEffect(() => {
    initMIDI();
  }, []);
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Content above the piano (if any) */}
      <div className="flex-1 overflow-auto">
        {/* You can put your page content here */}
      </div>

      {/* Piano fixed at the bottom */}
      <div className="w-full h-[25vh] sm:h-[25vh] bg-neutral-800 overflow-x-auto">
        <Piano />
      </div>
    </div>
  );
}
