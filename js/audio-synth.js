/**
 * ==============================================================================
 * PROCEDURAL COSMIC AUDIO SYNTHESIZER — WEB AUDIO API
 * ==============================================================================
 * Zero external audio files. 100% procedurally synthesized in the browser.
 * Generates soft, relaxing cosmic chimes, tactile UI micro-clicks, and 
 * harmonic chords with smooth exponential decay.
 * Respects user preferences and modern browser autoplay policies.
 * ==============================================================================
 */

class CosmicAudio {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.masterGain = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggle() {
    this.ensureContext();
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.playChime(659.25, 0.6); // E5 chord note
      setTimeout(() => this.playChime(987.77, 0.8), 120); // B5 note
    }
    return this.isEnabled;
  }

  // Play a soft crystal chime
  playChime(freq = 528, duration = 0.8) {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Soft tactile UI click
  playClick() {
    if (!this.isEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Celestial chord for easter egg / warp
  playCosmicChord() {
    if (!this.isEnabled) return;
    const notes = [440, 554.37, 659.25, 830.61, 1108.73]; // A Major 9 celestial voicing
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 1.8);
      }, idx * 110);
    });
  }
}

// Global audio singleton
window.cosmicAudio = new CosmicAudio();

