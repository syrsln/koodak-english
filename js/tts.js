// tts.js - Text-to-Speech with multiple backends
// Priority: Web Speech API (browser) → Google Translate TTS (online) → silent fallback
// Supports English and Farsi.

const TTS = {
  voices: { en: null, fa: null },
  webSpeechAvailable: false,
  preferredVoices: {
    en: ['Google US English', 'Microsoft Aria Online', 'Samantha', 'Karen', 'Daniel'],
    fa: ['Microsoft Persian', 'Google فارسی', 'Fa-IR', 'fa-IR']
  },
  googleTTSBase: 'https://translate.google.com/translate_tts',
  _currentAudio: null,

  init() {
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) {
      console.warn('[tts] Web Speech API not available');
      this.webSpeechAvailable = false;
    } else {
      this.webSpeechAvailable = true;
      this.loadVoices();
      if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  },

  loadVoices() {
    if (!this.webSpeechAvailable) return;
    const voices = speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;
    this.voices.en = this._pickVoice(voices, this.preferredVoices.en) ||
                     voices.find(v => v.lang.toLowerCase().startsWith('en')) || null;
    this.voices.fa = this._pickVoice(voices, this.preferredVoices.fa) ||
                     voices.find(v => v.lang.toLowerCase().startsWith('fa')) || null;
    if (this.voices.en) console.log('[tts] EN voice:', this.voices.en.name);
    if (this.voices.fa) console.log('[tts] FA voice:', this.voices.fa.name);
  },

  _pickVoice(voices, names) {
    for (const n of names) {
      const m = voices.find(v => v.name === n || v.name.includes(n));
      if (m) return m;
    }
    return null;
  },

  speak(text, lang = 'en', opts = {}) {
    if (!text) return;
    const textStr = String(text);

    // Stop any ongoing speech/audio
    this.stop();

    // 1. Try Web Speech API (best quality, offline, but limited Farsi on Windows)
    if (this.webSpeechAvailable && this.voices[lang]) {
      this._speakWebSpeech(textStr, lang, opts);
      return;
    }

    // 2. Try Google Translate TTS (online, supports Farsi well)
    this._speakGoogleTTS(textStr, lang);
  },

  _speakWebSpeech(text, lang, opts = {}) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fa' ? 'fa-IR' : 'en-US';
    utterance.rate = opts.rate ?? 0.85;
    utterance.pitch = opts.pitch ?? 1.1;
    utterance.volume = opts.volume ?? 1.0;
    if (this.voices[lang]) utterance.voice = this.voices[lang];

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('[tts] WebSpeech error:', e.error);
      }
    };
    try { speechSynthesis.speak(utterance); } catch (e) { /* ignore */ }
  },

  _speakGoogleTTS(text, lang) {
    try {
      const langCode = lang === 'fa' ? 'fa' : 'en';
      const url = `${this.googleTTSBase}?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${langCode}&client=tw-ob`;
      const audio = new Audio();
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      this._currentAudio = audio;
      audio.onended = () => { if (this._currentAudio === audio) this._currentAudio = null; };
      audio.onerror = () => {
        console.warn('[tts] GoogleTTS failed, falling back to Web Speech');
        if (this.webSpeechAvailable) this._speakWebSpeech(text, lang);
      };
      audio.src = url;
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch(err => {
          console.warn('[tts] GoogleTTS play() rejected:', err.message);
          if (this.webSpeechAvailable) this._speakWebSpeech(text, lang);
        });
      }
    } catch (e) {
      console.warn('[tts] GoogleTTS exception:', e);
      if (this.webSpeechAvailable) this._speakWebSpeech(text, lang);
    }
  },

  stop() {
    if (this.webSpeechAvailable) {
      try { speechSynthesis.cancel(); } catch (e) { /* ignore */ }
    }
    if (this._currentAudio) {
      try { this._currentAudio.pause(); this._currentAudio.src = ''; } catch (e) { /* ignore */ }
      this._currentAudio = null;
    }
  },

  isAvailable() { return this.webSpeechAvailable; }
};
