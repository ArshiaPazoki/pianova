import * as Tone from "tone";

// --- State tracking ---
let sustainOn = true;
const heldNotes = new Set<string>();
const sustainedNotes = new Set<string>();

// --- Lazy-initialized synth components ---
let reverb: Tone.Reverb;
let envelope: Tone.AmplitudeEnvelope;
let sampler: Tone.Sampler;
let initialized = false;

/**
 * Initialize the synth engine (safe for browser only)
 */
export function initSynth() {
  if (initialized || typeof window === "undefined") return;

  reverb = new Tone.Reverb({
    decay: 0.05,
    preDelay: 0.01,
    wet: 0.1,
  }).toDestination();

  envelope = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.3,
    sustain: 0.5,
    release: 1.0,
  }).connect(reverb);

  sampler = new Tone.Sampler({
    urls: { C4: "C4.wav" },
    baseUrl: "/samples/",
    onload: () => console.log("🎹 Sampler loaded"),
  }).connect(envelope);

  initialized = true;
}

/**
 * Play a note (triggered on key down or MIDI on)
 */
export async function playNote(note: string, velocity = 1) {
  if (!initialized) initSynth();

  await Tone.start();

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
    sustainedNotes.add(note);
  } else {
    triggerNoteRelease(note);
  }
}

/**
 * Enable or disable sustain pedal (MIDI CC 64)
 */
export function setSustain(enabled: boolean) {
  sustainOn = enabled;

  if (!enabled) {
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
  if (!initialized) return;

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
  if (!initialized) return;

  if (attack !== undefined) envelope.attack = attack;
  if (decay !== undefined) envelope.decay = decay;
  if (sustain !== undefined) envelope.sustain = sustain;
  if (release !== undefined) envelope.release = release;
}

/**
 * Initialize Web MIDI support
 */
export async function initMIDI() {
  if (typeof window === "undefined" || !navigator.requestMIDIAccess) {
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
      if (velocity > 0) {
        playNote(note, velocity);
      } else {
        releaseNote(note);
      }
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
