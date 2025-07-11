"use client";

import clsx from "clsx";

interface KeyProps {
  label: string;
  isMapped?: boolean;
  flex?: string; // e.g. "flex-[2]", "flex-[1.5]"
  note?: string;
}

export const Key = ({ label, isMapped = false, flex = "flex-[1]", note }: KeyProps) => {
  return (
    <kbd
      className={clsx(
        "h-10 flex items-center justify-center rounded ring transition-all",
        flex,
        isMapped
          ? "bg-neutral-950 text-white ring-neutral-600 hover:ring-red-600"
          : "bg-neutral-950 text-neutral-700 ring-neutral-800"
      )}
    >
      {note || label}
    </kbd>
  );
};
