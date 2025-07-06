import clsx from "clsx";
import { playNote } from "@/lib/pianoEngine";
interface PianoKeyProps {
  note: string;
  type: "white" | "black";
  onClick?: () => void;
}

export const PianoKey: React.FC<PianoKeyProps> = ({ note, type, onClick }) => (
  <div
    onClick={() => playNote(note)}
    className={clsx(
      "w-full h-full p-1 ring flex justify-center items-end text-xs select-none rounded-b",
      type === "white" && "bg-neutral-50 text-black ring-neutral-950 m-0.25 hover:bg-neutral-300",
      type === "black" && "bg-neutral-950 text-white ring-neutral-950 hover:bg-neutral-700"
    )}
  >
    {note}
  </div>
);
