import { create } from "zustand";

interface NoteEvent {
  note: string;
  time: number;
  velocity: number;
  type: "on" | "off";
}

interface RecordStore {
  isRecording: boolean;
  events: NoteEvent[];
  startTime: number | null;
  startRecording: () => void;
  stopRecording: () => void;
  clearRecording: () => void;
  addEvent: (event: NoteEvent) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  isRecording: false,
  events: [],
  startTime: null,
  startRecording: () =>
    set({ isRecording: true, events: [], startTime: performance.now() }),
  stopRecording: () => set({ isRecording: false }),
  clearRecording: () => set({ events: [], startTime: null }),
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),
}));
