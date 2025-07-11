"use client";

import { RecordToolbar } from "../molecules/RecordToolbar";
import { useRecordStore } from "@/store/useRecordStore";
import { useRecordingListener } from "@/hooks/useRecordingListener";

export const RecordPanel = () => {
  useRecordingListener();
  const { events } = useRecordStore();

  return (
    <div className="px-4 py-6 rounded-xl bg-neutral-900 ring ring-neutral-800 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">🎙️ Recording Session</h2>
      <RecordToolbar />
      <div className="h-48 overflow-y-auto bg-neutral-950 rounded p-3 text-xs space-y-1 font-mono text-neutral-300">
        {events.length === 0 ? (
          <p className="text-center text-neutral-500">No events recorded yet.</p>
        ) : (
          events.map((e, idx) => (
            <div key={idx}>
              [{e.time.toFixed(0)}ms] {e.type === "on" ? "▶" : "■"} {e.note}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
