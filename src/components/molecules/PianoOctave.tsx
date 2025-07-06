// White keys: ┃C┃D┃E┃F┃G┃A┃B┃  → grid-cols-7 (under)
// Black keys: ┃ ⎯C#⎯ D#┃   ⎯F#⎯ G#⎯ A#┃  → grid-cols-5 + grid-cols-7 (above, inline)

import React from "react";
import { PianoKey } from "../atoms/PianoKey";

export const PianoOctave: React.FC<{ octave: number }> = ({ octave }) => {
  const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];

  return (
    <div className="relative sm:w-[33dvw]">
      {/* White keys */}
      <div className="grid grid-cols-7 w-full h-full z-0">
        {whiteNotes.map((note) => (
          <div key={note} className="flex items-end justify-center h-full">
            <PianoKey note={note + octave} type="white" />
          </div>
        ))}
      </div>

      {/* Black keys (2-part grid in single row) */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none flex">
        {/* Part 1: 5-column grid for C# and D# */}
        <div className="grid grid-cols-5 w-3/7 h-full">
          {[0, 1, 2, 3, 4].map((i) => {
            const note = i === 1 ? "C#" : i === 3 ? "D#" : null;
            return note ? (
              <div
                key={i}
                className="flex items-start justify-center pointer-events-auto"
              >
                <div className="h-[60%] w-full">
                  <PianoKey note={note + octave} type="black" />
                </div>
              </div>
            ) : (
              <div key={i} />
            );
          })}
        </div>

        {/* Part 2: 7-column grid for F#, G#, A# */}
        <div className="grid grid-cols-7 w-4/7 h-full">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const note =
              i === 1 ? "F#" : i === 3 ? "G#" : i === 5 ? "A#" : null;
            return note ? (
              <div
                key={i}
                className="flex items-start justify-center pointer-events-auto"
              >
                <div className="h-[60%] w-full">
                  <PianoKey note={note + octave} type="black" />
                </div>
              </div>
            ) : (
              <div key={i} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
