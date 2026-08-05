// i18n.js - Internationalization (Farsi / English)
// Loads strings from /<lang>/strings.json, applies to [data-i18n] elements,
// handles RTL/LTR direction, persists user choice.

const I18n = {
  current: 'fa',
  strings: {},
  supported: ['fa', 'en'],
  fallback: 'en',

  async init() {
    // 1. Saved preference
    const saved = localStorage.getItem('ke_lang');
    if (saved && this.supported.includes(saved)) {
      this.current = saved;
    } else {
      // 2. Browser language detection
      const browserLang = (navigator.language || 'en').toLowerCase();
      this.current = browserLang.startsWith('fa') ? 'fa' : 'en';
    }

    await this.loadStrings(this.current);
    this.apply();
    this.updateButtons();
  },

  async loadStrings(lang) {
    try {
      const res = await fetch(`${lang}/strings.json`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.strings = await res.json();
    } catch (err) {
      console.error(`[i18n] Failed to load ${lang}/strings.json:`, err);
      if (lang !== this.fallback) {
        // Try fallback language
        this.strings = {};
        try {
          const res = await fetch(`${this.fallback}/strings.json`, { cache: 'no-store' });
          this.strings = await res.json();
        } catch (e2) {
          console.error('[i18n] Fallback also failed:', e2);
        }
      }
    }
  },

  t(key, fallback) {
    return this.strings[key] || fallback || key;
  },

  apply() {
    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    // Direction + lang attribute
    const isRTL = this.current === 'fa';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', this.current);

    // Title
    document.title = `${this.t('site.title', 'Koodak English')} - ${this.t('site.tagline', 'کودک انگلیسی')}`;
  },

  updateButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === this.current;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });
  },

  async setLang(lang) {
    if (!this.supported.includes(lang) || lang === this.current) return;
    this.current = lang;
    localStorage.setItem('ke_lang', lang);
    await this.loadStrings(lang);
    this.apply();
    this.updateButtons();
    // Re-render dynamic content
    if (window.App && typeof App.refreshContent === 'function') {
      App.refreshContent();
    }
    // Stop any in-flight TTS
    if (window.TTS) TTS.stop();
  }
};
