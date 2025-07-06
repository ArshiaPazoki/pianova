"use client";
import React from "react";
import { PianoOctave } from "../molecules/PianoOctave";

export const Piano: React.FC = () => {
  // const octaves = [1,2];
  const octaves = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="w-full h-full overflow-x-auto overflow-y-hidden bg-neutral-800 border-t-3 border-red-800 no-scrollbar">
    <div className="inline-flex h-full">
      {octaves.map((o) => (
          <PianoOctave key={o} octave={o} />
        ))}
    </div>
    </div>
  );
};
