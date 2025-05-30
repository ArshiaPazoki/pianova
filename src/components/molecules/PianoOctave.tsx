//  ┌─┐ ┌─┐   ┌─┐ ┌─┐ ┌─┐
//  │ │ │ │   │ │ │ │ │ │  ← black keys on top
//  ┌┴─┴┬┴─┴┬┴─┴┬┴─┴┬┴─┴┐
//  │ C │ D │ E │ F │ G │ ... ← white keys
// components/molecules/PianoOctave.tsx
import PianoKey from '../atoms/PianoKey';

const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// Black keys and their left % relative to white key layout
const blackKeyMap = [
  { note: 'C#', leftPercent: 10 },
  { note: 'D#', leftPercent: 25 },
  // skip E
  { note: 'F#', leftPercent: 54 },
  { note: 'G#', leftPercent: 68 },
  { note: 'A#', leftPercent: 83 },
];

export default function PianoOctave({
  octave = 4,
  activeNote,
}: {
  octave?: number;
  activeNote?: string;
}) {
  return (
    <div 
    //     className="
    //     relative w-full sm:max-w-[700px]
    //     aspect-[7/2.5] sm:aspect-[7/2.5]
    //     rotate-90 sm:rotate-0 origin-top-left sm:origin-center
    //     scale-[0.9] sm:scale-100
    // "
        className='
            relative h-full w-full min-w-[500px]
        '
    >
      {/* White keys in flex layout */}
      <div className="flex h-full w-full z-10">
        {whiteKeys.map((note) => {
          const fullNote = `${note}${octave}`;
          return (
            <PianoKey
              key={fullNote}
              note={fullNote}
              type="white"
              isActive={activeNote === fullNote}
            />
          );
        })}
      </div>

      {/* Black keys absolutely positioned */}
      {blackKeyMap.map(({ note, leftPercent }) => {
        const fullNote = `${note}${octave}`;
        return (
          <PianoKey
            key={fullNote}
            note={fullNote}
            type="black"
            leftPercent={leftPercent}
            isActive={activeNote === fullNote}
          />
        );
      })}
    </div>
  );
}

