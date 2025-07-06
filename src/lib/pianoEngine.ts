import * as Tone from "tone";

/**
 * Audio chain:
 * Sampler -> Envelope -> Reverb -> Destination
 */

// --- Reverb for spaciousness ---
const reverb = new Tone.Reverb({
  decay: 2.5,
  preDelay: 0.01,
  wet: 0.3,
}).toDestination();

// --- Amplitude envelope controls note dynamics ---
const envelope = new Tone.AmplitudeEnvelope({
  attack: 0.01,
  decay: 0.3,
  sustain: 0.5,
  release: 1.0,
}).connect(reverb);

// --- Sampler with one C4 sample ---
const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.wav", // Ensure this file is in /public/samples/
  },
  baseUrl: "/samples/",
  onload: () => console.log("🎹 Piano Sampler Loaded"),
}).connect(envelope);

// --- Sustain flag and active note tracker ---
let sustainOn = false;
const activeNotes = new Map<string, boolean>();

/**
 * Play a note with optional velocity (0 to 1)
 */
export async function playNote(note: string, velocity = 1) {
  await Tone.start(); // Required to unlock audio context on first user interaction

  const now = Tone.now();

  // Trigger envelope attack and sampler note
  envelope.triggerAttack(now);
  sampler.triggerAttack(note, now, velocity);

  if (sustainOn) {
    activeNotes.set(note, true);
  } else {
    // Calculate hold time based on envelope times (in seconds)
    const holdTime =
      Tone.Time(envelope.decay).toSeconds() +
      Tone.Time(envelope.release).toSeconds() +
      0.3;

    setTimeout(() => {
      sampler.triggerRelease(note);
      envelope.triggerRelease();
      activeNotes.delete(note);
    }, holdTime * 1000);
  }
}

/**
 * Release a note manually (used when sustain is on)
 */
export function releaseNote(note: string) {
  if (!sustainOn) return;

  const now = Tone.now();
  sampler.triggerRelease(note, now);
  envelope.triggerRelease(now);
  activeNotes.delete(note);
}

/**
 * Enable or disable sustain pedal
 * When disabling sustain, release all held notes
 */
export function setSustain(enabled: boolean) {
  sustainOn = enabled;
  if (!enabled) {
    // Release all notes still held
    for (const note of activeNotes.keys()) {
      releaseNote(note);
    }
    activeNotes.clear();
  }
}

/**
 * Update ADSR envelope parameters dynamically
 */
export function setEnvelope({
  attack,
  decay,
  sustain,
  release,
}: {
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
}) {
  if (attack !== undefined) envelope.attack = attack;
  if (decay !== undefined) envelope.decay = decay;
  if (sustain !== undefined) envelope.sustain = sustain;
  if (release !== undefined) envelope.release = release;
}

/**
 * Initialize Web MIDI and connect MIDI events to piano functions
 */
export async function initMIDI() {
  if (!navigator.requestMIDIAccess) {
    console.warn("Web MIDI API not supported in this browser.");
    return;
  }

  try {
    const midiAccess = await navigator.requestMIDIAccess();

    midiAccess.inputs.forEach((input) => {
      input.onmidimessage = handleMIDIMessage;
    });

    console.log("🎹 MIDI ready.");
  } catch (err) {
    console.error("Failed to access MIDI devices:", err);
  }
}

/**
 * MIDI message handler
 * Supports:
 * - Note On (0x90) with velocity > 0 → playNote()
 * - Note Off (0x80) or Note On with velocity 0 → releaseNote()
 * - Sustain pedal (CC 64 on control change 0xb0) → setSustain()
 */
function handleMIDIMessage(msg: MIDIMessageEvent) {
  if (!msg.data) return; // early exit if null
  const [status, data1, data2] = msg.data;
  const command = status & 0xf0;

  // Convert MIDI note number to note name (e.g., 60 → "C4")
  const note = Tone.Frequency(data1, "midi").toNote();
  const velocity = data2 / 127;

  switch (command) {
    case 0x90: // Note On
      if (velocity > 0) {
        playNote(note, velocity);
      } else {
        releaseNote(note); // Velocity 0 treated as Note Off
      }
      break;

    case 0x80: // Note Off
      releaseNote(note);
      break;

    case 0xb0: // Control Change
      if (data1 === 64) {
        // Sustain pedal (on if velocity >= 64)
        setSustain(data2 >= 64);
      }
      break;

    default:
      // Other MIDI messages ignored
      break;
  }
}
