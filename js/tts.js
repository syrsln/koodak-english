// tts.js - Web Speech API wrapper
// Uses the browser's built-in speech synthesis (no server, no audio files).
// Supports English (en-US) and Persian/Farsi (fa-IR).

const TTS = {
  voices: { en: null, fa: null },
  available: false,
  preferredVoices: {
    en: ['Google US English', 'Microsoft Aria Online', 'Samantha', 'Karen', 'Daniel'],
    fa: ['Microsoft Persian', 'Google فارسی', 'Fa-IR']
  },

  init() {
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) {
      console.warn('[tts] Web Speech API not available in this browser');
      this.available = false;
      return;
    }
    this.available = true;

    // Voices may load async on some browsers (Chrome)
    this.loadVoices();
    if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
  },

  loadVoices() {
    if (!this.available) return;
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Try preferred voices first, then fall back to any voice with matching lang
    this.voices.en = this.pickVoice(voices, 'en', this.preferredVoices.en) ||
                     voices.find(v => v.lang.toLowerCase().startsWith('en')) || null;
    this.voices.fa = this.pickVoice(voices, 'fa', this.preferredVoices.fa) ||
                     voices.find(v => v.lang.toLowerCase().startsWith('fa')) || null;

    if (this.voices.en) console.log('[tts] EN voice:', this.voices.en.name);
    if (this.voices.fa) console.log('[tts] FA voice:', this.voices.fa.name);
  },

  pickVoice(voices, langCode, preferredNames) {
    for (const name of preferredNames) {
      const match = voices.find(v => v.name === name || v.name.includes(name));
      if (match) return match;
    }
    return null;
  },

  speak(text, lang = 'en', opts = {}) {
    if (!this.available) {
      console.warn('[tts] Not available');
      return;
    }
    if (!text) return;

    // Cancel any ongoing speech so new utterances start immediately
    try { speechSynthesis.cancel(); } catch (e) { /* ignore */ }

    const utterance = new SpeechSynthesisUtterance(String(text));
    utterance.lang = lang === 'fa' ? 'fa-IR' : 'en-US';
    // Slower + slightly higher pitch for kids
    utterance.rate = opts.rate ?? 0.85;
    utterance.pitch = opts.pitch ?? 1.1;
    utterance.volume = opts.volume ?? 1.0;

    const voice = this.voices[lang];
    if (voice) utterance.voice = voice;

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('[tts] error:', e.error);
      }
    };

    try {
      speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('[tts] speak() failed:', e);
    }
  },

  stop() {
    if (this.available) {
      try { speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    }
  },

  isAvailable() { return this.available; }
};
