"use client";

import { Key } from "@/components/atoms/Key";
import { keyNoteMap } from "@/hooks/useKeyboardPiano";

interface KeyboardRowProps {
  keys: { label: string; flex?: string }[];
}

export const KeyboardRow = ({ keys }: KeyboardRowProps) => {
  return (
    <div className="flex w-full gap-1.5 justify-center">
      {keys.map(({ label, flex }) => (
        <Key
          key={label}
          label={label}
          flex={flex}
          isMapped={!!keyNoteMap[label]}
          note={keyNoteMap[label]}
        />
      ))}
    </div>
  );
};
