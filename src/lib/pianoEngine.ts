import * as Tone from "tone";

/**
 * Audio Chain:
 * Sampler → Envelope → Reverb → Destination
 */

// --- Reverb for spaciousness ---
const reverb = new Tone.Reverb({
  decay: 0.05,
  preDelay: 0.01,
  wet: 0.1,
}).toDestination();

// --- Envelope for shaping note dynamics ---
const envelope = new Tone.AmplitudeEnvelope({
  attack: 0.01,
  decay: 0.3,
  sustain: 0.5,
  release: 1.0,
}).connect(reverb);

// --- Single-sample Sampler (C4) ---
const sampler = new Tone.Sampler({
  urls: { C4: "C4.mp3" },
  baseUrl: "/samples/",
  onload: () => console.log("🎹 Sampler loaded"),
}).connect(envelope);

// --- State tracking ---
let sustainOn = true;
const heldNotes = new Set<string>();     // notes physically held
const sustainedNotes = new Set<string>(); // notes being sustained

/**
 * Play a note (triggered on key down or MIDI on)
 */
export async function playNote(note: string, velocity = 1) {
  await Tone.start(); // Required once

  const now = Tone.now();
  heldNotes.add(note);
  sampler.triggerAttack(note, now, velocity);
  envelope.triggerAttack(now);
}

/**
 * Release a note (triggered on key up or MIDI off)
 */
export function releaseNote(note: string) {
  heldNotes.delete(note);

  if (sustainOn) {
    // Don't release now; defer to sustain release
    sustainedNotes.add(note);
  } else {
    // Key is no longer held and sustain is off: release now
    triggerNoteRelease(note);
  }
}

/**
 * Enable or disable sustain pedal (MIDI CC 64)
 */
export function setSustain(enabled: boolean) {
  sustainOn = enabled;

  if (!enabled) {
    // Release all sustained notes that aren't currently held
    for (const note of sustainedNotes) {
      if (!heldNotes.has(note)) {
        triggerNoteRelease(note);
      }
    }
    sustainedNotes.clear();
  }
}

/**
 * Actually trigger note release
 */
function triggerNoteRelease(note: string) {
  const now = Tone.now();
  sampler.triggerRelease(note, now);
  envelope.triggerRelease(now);
}

/**
 * Update the ADSR envelope dynamically
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
 * Initialize Web MIDI support
 */
export async function initMIDI() {
  if (!navigator.requestMIDIAccess) {
    console.warn("Web MIDI not supported.");
    return;
  }

  try {
    const access = await navigator.requestMIDIAccess();
    access.inputs.forEach((input) => {
      input.onmidimessage = handleMIDIMessage;
    });
    console.log("🎹 MIDI ready");
  } catch (err) {
    console.error("MIDI init failed:", err);
  }
}

/**
 * MIDI message handler
 */
function handleMIDIMessage(msg: MIDIMessageEvent) {
  if (!msg.data) return;
  const [status, data1, data2] = msg.data;
  const command = status & 0xf0;

  const note = Tone.Frequency(data1, "midi").toNote();
  const velocity = data2 / 127;

  switch (command) {
    case 0x90: // Note on
      velocity > 0 ? playNote(note, velocity) : releaseNote(note);
      break;
    case 0x80: // Note off
      releaseNote(note);
      break;
    case 0xb0: // Control change
      if (data1 === 64) {
        setSustain(data2 >= 64);
      }
      break;
  }
}
