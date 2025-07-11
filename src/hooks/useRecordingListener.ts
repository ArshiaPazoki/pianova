import { useEffect } from "react";
import { usePianoStore } from "@/store/usePianoStore";
import { useRecordStore } from "@/store/useRecordStore";

export const useRecordingListener = () => {
  const { isRecording, addEvent, startTime } = useRecordStore();
  const { activeNotes } = usePianoStore();

  useEffect(() => {
    if (!isRecording || !startTime) return;

    const handleNote = (note: string, type: "on" | "off") => {
      const now = performance.now();
      addEvent({
        note,
        time: now - startTime,
        velocity: 1,
        type,
      });
    };

    const unsub = usePianoStore.subscribe((state, prev) => {
      const added = [...state.activeNotes].filter((n) => !prev.activeNotes.has(n));
      const removed = [...prev.activeNotes].filter((n) => !state.activeNotes.has(n));
      added.forEach((n) => handleNote(n, "on"));
      removed.forEach((n) => handleNote(n, "off"));
    });

    return () => unsub();
  }, [isRecording, startTime, addEvent]);
};
