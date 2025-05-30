"use client";

import { useEffect, useState } from "react";
import PianoOctave from "../molecules/PianoOctave";
import { keyboardToNote } from "../../utils/noteMap";

export default function Piano({ octaves = 1 }: { octaves?: number }) {
  const [activeNote, setActiveNote] = useState<string | null>(null);

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key.toLocaleLowerCase());
      const note = keyboardToNote[e.key.toLowerCase()];
      if (note) {
        setActiveNote(note);
        // TODO: play sound
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const note = keyboardToNote[e.key.toLowerCase()];
      if (note) {
        setActiveNote(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle click/touch piano key
  const handleNoteClick = (note: string) => {
    setActiveNote(note);
    // TODO: play sound
    setTimeout(() => setActiveNote(null), 150); // visually deactivate after click
  };

  // Generate desired octaves
  const startOctave = 4 - Math.floor(octaves / 2);
  const octaveRange = Array.from(
    { length: octaves },
    (_, i) => startOctave + i
  );

  return (
    <div className="flex flex-col sm:flex-row justify-center p-4 rounded-sm gap-2 overflow-x-auto max-w-full h-60">
      {octaveRange.map((octave) => (
        <PianoOctave
          key={octave}
          octave={octave}
          activeNote={activeNote}
          onKeyPress={handleNoteClick}
        />
      ))}
    </div>
  );
}
