import { useEffect, useRef, useState } from "react";
import { playNote, releaseNote } from "@/lib/pianoEngine";

const keyNoteMap: Record<string, string> = {
  q: "C3",
  "2": "C#3",
  w: "D3",
  "3": "D#3",
  e: "E3",
  r: "F3",
  "5": "F#3",
  t: "G3",
  "6": "G#3",
  y: "A3",
  "7": "A#3",
  u: "B3",
  z: "C4",
  s: "C#4",
  x: "D4",
  d: "D#4",
  c: "E4",
  v: "F4",
  g: "F#4",
  b: "G4",
  h: "G#4",
  n: "A4",
  j: "A#4",
  m: "B4",
};

export function useKeyboardPiano() {
  const pressedKeys = useRef(new Set<string>());
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();

      if (pressedKeys.current.has(key)) return;

      const note = keyNoteMap[key];
      if (note) {
        e.preventDefault();
        pressedKeys.current.add(key);
        playNote(note);
        setActiveNotes(new Set(pressedKeys.current)); // update with keys pressed
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (!pressedKeys.current.has(key)) return;

      const note = keyNoteMap[key];
      if (note) {
        e.preventDefault();
        pressedKeys.current.delete(key);
        releaseNote(note);
        setActiveNotes(new Set(pressedKeys.current)); // update with keys pressed
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return activeNotes;
}
