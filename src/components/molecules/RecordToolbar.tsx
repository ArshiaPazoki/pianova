import { Button } from "@/components/atoms/Button";
import { useRecordStore } from "@/store/useRecordStore";

export const RecordToolbar = () => {
  const {
    isRecording,
    startRecording,
    stopRecording,
    clearRecording,
    events,
  } = useRecordStore();

  const durationMs = events.length ? events.at(-1)?.time ?? 0 : 0;
  const durationSec = (durationMs / 1000).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 justify-between mb-6">
      <div className="flex gap-2 flex-wrap">
        {!isRecording ? (
          <Button onClick={startRecording}>🎙️ Start Recording</Button>
        ) : (
          <Button onClick={stopRecording} variant="danger">
            ⏹️ Stop
          </Button>
        )}
        <Button onClick={clearRecording} variant="danger">
          🗑 Clear
        </Button>
      </div>

      <p className="text-xs text-neutral-400 text-center sm:text-right">
        Recorded Notes: <span className="text-white">{events.length}</span> | Duration:{" "}
        <span className="text-white">{durationSec}s</span>
      </p>
    </div>
  );
};
