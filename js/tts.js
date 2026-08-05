// tts.js - Text-to-Speech using Web Speech API only
// Note: Windows browsers don't have Farsi voices installed by default,
// so FA button was removed from the UI. EN is the primary learning language.

const TTS = {
  voice: null,
  available: false,
  preferredVoices: [
    'Google US English', 'Microsoft Aria Online', 'Microsoft Jenny Online',
    'Samantha', 'Karen', 'Daniel', 'Alex'
  ],

  init() {
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) {
      console.warn('[tts] Web Speech API not available');
      this.available = false;
      return;
    }
    this.available = true;
    this.loadVoices();
    if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  },

  loadVoices() {
    if (!this.available) return;
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Try preferred English voices in order
    for (const name of this.preferredVoices) {
      const match = voices.find(v => (v.name === name || v.name.includes(name)) && v.lang.toLowerCase().startsWith('en'));
      if (match) { this.voice = match; break; }
    }
    // Fallback: any English voice
    if (!this.voice) this.voice = voices.find(v => v.lang.toLowerCase().startsWith('en')) || null;

    if (this.voice) console.log('[tts] Using voice:', this.voice.name, '(' + this.voice.lang + ')');
  },

  speak(text) {
    if (!this.available || !text) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = 'en-US';
    utterance.rate = 0.85;   // Slower for kids
    utterance.pitch = 1.1;   // Slightly higher
    utterance.volume = 1.0;
    if (this.voice) utterance.voice = this.voice;

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('[tts] error:', e.error);
      }
    };
    try { speechSynthesis.speak(utterance); } catch (e) { /* ignore */ }
  },

  stop() {
    if (this.available) {
      try { speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    }
  },

  isAvailable() { return this.available; }
};
