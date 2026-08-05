// app.js - Main application
// Wires everything together: i18n, TTS, progress, content rendering.

const App = {
  init() {
    TTS.init();
    I18n.init().then(() => {
      this.bindEvents();
      this.refreshContent();
      this.handleRedirectFlag();
    });
  },

  bindEvents() {
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => I18n.setLang(btn.dataset.lang));
    });

    // Category tabs (only enabled ones for now)
    document.querySelectorAll('.cat-btn:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => this.activateCategory(btn.dataset.category));
    });

    // Reset progress
    const resetBtn = document.getElementById('reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const msg = I18n.t('progress.confirmReset', 'Are you sure?');
        if (confirm(msg)) {
          Progress.resetCategory('alphabet');
          this.refreshContent();
        }
      });
    }

    // Contact form
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Re-render on storage change (multi-tab sync)
    window.addEventListener('storage', (e) => {
      if (e.key === 'ke_lang' && e.newValue && e.newValue !== I18n.current) {
        I18n.setLang(e.newValue);
      }
    });
  },

  activateCategory(categoryId) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-category="${categoryId}"]`)?.classList.add('active');
    // For now only alphabet is implemented
  },

  refreshContent() {
    this.renderAlphabet();
  },

  renderAlphabet() {
    const grid = document.getElementById('alphabet-grid');
    const totalEl = document.getElementById('progress-total');
    if (!grid) return;

    grid.innerHTML = '';

    const frag = document.createDocumentFragment();

    Data.alphabet.forEach(item => {
      const learned = Progress.isLearned('alphabet', item.id);
      const card = document.createElement('div');
      card.className = 'letter-card' + (learned ? ' learned' : '');
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="letter-char" style="color: ${item.color}">${item.letter}</div>
        <div class="letter-emoji" aria-hidden="true">${item.emoji}</div>
        <div class="letter-word">${this._escape(item.word)}</div>
        <div class="letter-fa">${this._escape(item.fa)}</div>
        <div class="letter-actions">
          <button class="action-btn" data-action="speak-en" data-word="${this._escape(item.word)}" aria-label="Pronounce in English">🔊 EN</button>
          <button class="action-btn" data-action="speak-fa" data-word="${this._escape(item.fa)}" aria-label="Pronounce in Farsi">🔊 FA</button>
          <button class="action-btn learned-btn ${learned ? 'active' : ''}" data-action="toggle" data-id="${item.id}">
            ${learned ? '✓' : '⭐'}
          </button>
        </div>
      `;
      frag.appendChild(card);
    });

    grid.appendChild(frag);
    if (totalEl) totalEl.textContent = Data.alphabet.length;
    this.updateProgress();
    this.bindCardEvents();
  },

  bindCardEvents() {
    const grid = document.getElementById('alphabet-grid');
    if (!grid) return;

    // Card-level click (speak English word) - skip if action button
    grid.querySelectorAll('.letter-card').forEach(card => {
      const onActivate = (e) => {
        if (e.target.closest('.action-btn')) return;
        const word = card.querySelector('.letter-word').textContent;
        TTS.speak(word, 'en');
      };
      card.addEventListener('click', onActivate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate(e);
        }
      });
    });

    // Action buttons
    grid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'speak-en') {
          TTS.speak(btn.dataset.word, 'en');
        } else if (action === 'speak-fa') {
          TTS.speak(btn.dataset.word, 'fa');
        } else if (action === 'toggle') {
          Progress.toggle('alphabet', btn.dataset.id);
          this.refreshContent();
        }
      });
    });
  },

  updateProgress() {
    const count = Progress.countLearned('alphabet');
    const countEl = document.getElementById('progress-count');
    if (countEl) countEl.textContent = count;
  },

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-btn');
    const accessKey = form.querySelector('[name="access_key"]').value;

    // Demo mode: if access key not configured yet, simulate success locally
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      status.className = 'form-status success';
      status.textContent = I18n.t('contact.demoSuccess', 'Message received! (Web3Forms not yet configured - this is a preview)');
      form.reset();
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = I18n.t('contact.sending', 'Sending...');
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const formData = new FormData(form);
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        status.className = 'form-status success';
        status.textContent = I18n.t('contact.success', 'Your message has been sent!');
        form.reset();
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('[form] submit failed:', err);
      status.className = 'form-status error';
      status.textContent = I18n.t('contact.error', 'Failed to send. Please try again.') + (err.message ? ` (${err.message})` : '');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  },

  handleRedirectFlag() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      const status = document.getElementById('form-status');
      if (status) {
        status.className = 'form-status success';
        status.textContent = I18n.t('contact.success', 'Your message has been sent!');
      }
      // Clean URL
      const url = new URL(window.location);
      url.searchParams.delete('sent');
      window.history.replaceState({}, '', url);
      // Scroll to form status
      status?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },

  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
