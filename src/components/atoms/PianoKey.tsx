import clsx from "clsx";
import { useState } from "react";
import { playNote, releaseNote } from "@/lib/pianoEngine";

interface PianoKeyProps {
  note: string;
  type: "white" | "black";
  active?: boolean; // from external keyboard/MIDI
}

export const PianoKey: React.FC<PianoKeyProps> = ({ note, type, active = false }) => {
  const [isHeld, setIsHeld] = useState(false);

  const isActive = active || isHeld;

  const activeClass = isActive
    ? type === "white"
      ? "bg-blue-400 border-blue-700 shadow-lg"
      : "bg-blue-700 shadow-lg"
    : "";

  const startNote = () => {
    playNote(note);
    setIsHeld(true);
  };

  const endNote = () => {
    releaseNote(note);
    setIsHeld(false);
  };

  return (
    <div
      onMouseDown={startNote}
      onMouseUp={endNote}
      onMouseLeave={endNote}
      onTouchStart={(e) => {
        e.preventDefault(); // prevent double fire
        startNote();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        endNote();
      }}
      className={clsx(
        activeClass,
        "w-full h-full p-1 ring flex justify-center items-end text-xs select-none rounded-b",
        type === "white"
          ? "bg-neutral-50 text-black ring-neutral-950 m-0.25 hover:bg-neutral-300"
          : "bg-neutral-950 text-white ring-neutral-950 hover:bg-neutral-700"
      )}
    >
      {note}
    </div>
  );
};
