import { usePianoStore } from "@/store/usePianoStore";
import { useKeyboardPiano } from "@/hooks/useKeyboardPiano";
import { PianoOctave } from "../molecules/PianoOctave";

export const Piano: React.FC = () => {
  useKeyboardPiano(); // just for key event registration
  const activeNotes = usePianoStore((state) => state.activeNotes);
  const octaves = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden bg-neutral-800 border-t-3 border-red-800 no-scrollbar">
      <div className="inline-flex h-full">
        {octaves.map((o) => (
          <PianoOctave key={o} octave={o} activeNotes={activeNotes} />
        ))}
      </div>
    </div>
  );
};