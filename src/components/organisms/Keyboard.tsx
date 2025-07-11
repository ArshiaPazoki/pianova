"use client";

import { KeyboardRow } from "@/components/molecules/KeyboardRow";

export const Keyboard = () => {
  return (
    <div className="hidden sm:block space-y-2 font-mono text-xs w-full max-w-[60dvw] mx-auto mt-6 px-4 py-6 bg-neutral-900 ring ring-neutral-800 rounded-xl">
      <h3 className="text-lg font-bold text-white mb-4 text-center">
        Keyboard to Piano Keys Mapping
      </h3>

      {/* Row 1: Number row */}
      <KeyboardRow
        keys={[
          { label: "~" },
          { label: "1" },
          { label: "2" },
          { label: "3" },
          { label: "4" },
          { label: "5" },
          { label: "6" },
          { label: "7" },
          { label: "8" },
          { label: "9" },
          { label: "0" },
          { label: "-" },
          { label: "=" },
          { label: "⌫", flex: "flex-[1.5]" },
        ]}
      />

      {/* Row 2: QWERTY */}
      <KeyboardRow
        keys={[
          { label: "tab ⇥", flex: "flex-[1.2]" },
          { label: "q" },
          { label: "w" },
          { label: "e" },
          { label: "r" },
          { label: "t" },
          { label: "y" },
          { label: "u" },
          { label: "i" },
          { label: "o" },
          { label: "p" },
          { label: "[" },
          { label: "]" },
          { label: "\\", flex: "flex-[1.2]" },
        ]}
      />

      {/* Row 3: ASDF */}
      <KeyboardRow
        keys={[
          { label: "caps", flex: "flex-[1.4]" },
          { label: "a" },
          { label: "s" },
          { label: "d" },
          { label: "f" },
          { label: "g" },
          { label: "h" },
          { label: "j" },
          { label: "k" },
          { label: "l" },
          { label: ";" },
          { label: "'", flex: "flex-[1]" },
          { label: "enter ⏎", flex: "flex-[2]" },
        ]}
      />

      {/* Row 4: ZXCV */}
      <KeyboardRow
        keys={[
          { label: "shift ⇧", flex: "flex-[2]" },
          { label: "z" },
          { label: "x" },
          { label: "c" },
          { label: "v" },
          { label: "b" },
          { label: "n" },
          { label: "m" },
          { label: "," },
          { label: "." },
          { label: "/" },
          { label: "⇧ shift", flex: "flex-[2]" },
        ]}
      />

      {/* Row 5: Bottom row with space */}
      <KeyboardRow
        keys={[
          { label: "ctrl", flex: "flex-[1.3]" },
          { label: "win", flex: "flex-[1.1]" },
          { label: "alt", flex: "flex-[1.1]" },
          { label: "space", flex: "flex-[6]" },
          { label: "alt/gr", flex: "flex-[1.1]" },
          { label: "fn1", flex: "flex-[1.1]" },
          { label: "fn2", flex: "flex-[1.3]" },
        ]}
      />
    </div>
  );
};
