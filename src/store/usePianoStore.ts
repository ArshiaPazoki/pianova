import { create } from "zustand";

type PianoState = {
  activeNotes: Set<string>;
  addNote: (note: string) => void;
  removeNote: (note: string) => void;
  reset: () => void;
};

export const usePianoStore = create<PianoState>((set) => ({
  activeNotes: new Set(),
  addNote: (note) =>
    set((state) => {
      const updated = new Set(state.activeNotes);
      updated.add(note);
      return { activeNotes: updated };
    }),
  removeNote: (note) =>
    set((state) => {
      const updated = new Set(state.activeNotes);
      updated.delete(note);
      return { activeNotes: updated };
    }),
  reset: () => set({ activeNotes: new Set() }),
}));
