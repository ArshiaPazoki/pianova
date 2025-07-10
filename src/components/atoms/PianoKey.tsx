import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { playNote, releaseNote } from "@/lib/pianoEngine";

interface PianoKeyProps {
  note: string;
  type: "white" | "black";
  active?: boolean; // from external keyboard/MIDI
}

export const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  type,
  active = false,
}) => {
  const [isHeld, setIsHeld] = useState(false);
  const isActive = active || isHeld;
  const keyRef = useRef<HTMLDivElement>(null); // ✅ ref to DOM
  // ✅ Scroll into view on active
  useEffect(() => {
    if (isActive && keyRef.current) {
      keyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [isActive]);

  if (isActive) {
    console.log(note);
  }

  const activeClass = isActive
    ? type === "white"
      ? "!bg-neutral-500 !ring-neutral-700 !shadow-lg"
      : "!bg-neutral-700 !shadow-lg"
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
      ref={keyRef}
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
        "w-full h-full p-1 ring flex justify-center items-end text-xs select-none rounded-b-md",
        type === "white"
          ? "bg-neutral-50 text-black ring-neutral-950 m-0.25 hover:bg-neutral-300"
          : "bg-neutral-950 text-white ring-neutral-950 hover:bg-neutral-700",
        activeClass
      )}
    >
      {note}
    </div>
  );
};
