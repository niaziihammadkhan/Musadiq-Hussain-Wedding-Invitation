/**
 * Web Audio API synthesizer for luxury celebration ambience.
 * Zero external audio files required — runs natively in any browser.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientInterval: number | null = null;
  private isPlayingAmbient: boolean = false;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Delicate royal chimes & warm harp strum when the invitation unseals
   */
  public playUnsealSound() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      // Traditional raag notes for celebration: C4, E4, G4, B4, C5, D5, G5
      const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 587.33, 783.99];

      notes.forEach((freq, index) => {
        const osc = this.ctx!.createOscillator();
        const noteGain = this.ctx!.createGain();

        // Warm harmonic tone (between sine and triangle)
        osc.type = index % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        // Gentle envelope with golden shimmer decay
        const startTime = now + index * 0.08;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.8);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain!);

        osc.start(startTime);
        osc.stop(startTime + 2.0);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Start or stop gentle looping traditional ambient soundscape
   */
  public toggleAmbience(enabled: boolean) {
    this.isMuted = !enabled;
    if (this.isMuted) {
      this.stopAmbience();
    } else {
      this.startAmbience();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingAmbient;
  }

  private startAmbience() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isPlayingAmbient) return;
    this.isPlayingAmbient = true;

    // Play a gentle traditional santoor / sitar melody cycle
    const raagNotes = [
      261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99
    ];

    let step = 0;
    const playNote = () => {
      if (!this.isPlayingAmbient || !this.ctx || !this.masterGain) return;

      const noteFreq = raagNotes[step % raagNotes.length];
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.5);

      step++;
    };

    playNote();
    this.ambientInterval = window.setInterval(playNote, 900);
  }

  private stopAmbience() {
    this.isPlayingAmbient = false;
    if (this.ambientInterval !== null) {
      clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const weddingAudio = new WeddingAudioManager();
