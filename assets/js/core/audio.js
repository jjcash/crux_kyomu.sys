/**
 * Sadcore & Darkcore Audio Synthesizer (Web Audio API)
 * Generates melancholic ambient drones, sorrow bell pings, and glitch tape clicks.
 */
class KyomuSadcoreAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.droneGain = null;
    this.droneOscs = [];
    this.ambientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playKeypress() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Dark tape tick
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320 + Math.random() * 120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Melancholy bell ping (C-minor harmonic)
    const freqs = [523.25, 622.25, 783.99]; // C5, Eb5, G5
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 1.2);
  }

  playBleedAlert() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.4);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(now + 0.4);
  }

  toggleAmbientDrone() {
    this.init();
    if (!this.ctx) return false;

    if (this.ambientPlaying) {
      if (this.droneGain) {
        this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      }
      this.ambientPlaying = false;
      return false;
    } else {
      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.04, now + 2);

      // Low melancholic C-minor drone (65.41 Hz, 77.78 Hz, 98.00 Hz)
      const freqs = [65.41, 77.78, 98.00, 130.81];
      this.droneOscs = freqs.map(f => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        osc.connect(this.droneGain);
        osc.start();
        return osc;
      });

      this.droneGain.connect(this.ctx.destination);
      this.ambientPlaying = true;
      return true;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted && this.ambientPlaying) {
      this.toggleAmbientDrone();
    }
    return this.muted;
  }
}

export const sysAudio = new KyomuSadcoreAudio();
