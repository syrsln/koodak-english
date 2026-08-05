// app.js - Main application (refactored for multi-category)
// Wires i18n, TTS, progress, and category rendering.

const App = {
  currentCategory: 'alphabet',

  init() {
    TTS.init();
    I18n.init().then(() => {
      this.bindEvents();
      this.activateCategory(this.currentCategory);
    });
  },

  bindEvents() {
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => I18n.setLang(btn.dataset.lang));
    });

    // Category tabs (only enabled ones)
    document.querySelectorAll('.cat-btn:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => this.activateCategory(btn.dataset.category));
    });

    // Reset progress
    const resetBtn = document.getElementById('reset-progress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const msg = I18n.t('progress.confirmReset', 'Are you sure?');
        if (confirm(msg)) {
          Progress.resetCategory(this.currentCategory);
          this.renderCurrent();
        }
      });
    }

    // Contact form
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Song modal close
    const modal = document.getElementById('song-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.style.display = 'none';
      });
    }

    // Multi-tab language sync
    window.addEventListener('storage', (e) => {
      if (e.key === 'ke_lang' && e.newValue && e.newValue !== I18n.current) {
        I18n.setLang(e.newValue);
      }
    });
  },

  activateCategory(catId) {
    if (!Data[catId]) return;
    this.currentCategory = catId;

    // Tabs
    document.querySelectorAll('.cat-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.category === catId);
    });

    // Sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(`${catId}-section`);
    if (section) section.classList.add('active');

    // Update total count
    const totalEl = document.getElementById('progress-total');
    if (totalEl) totalEl.textContent = Data.count(catId);

    this.renderCurrent();
  },

  renderCurrent() {
    const catId = this.currentCategory;
    if (catId === 'songs') {
      this.renderSongs();
    } else {
      this.renderCategory(catId);
    }
    this.updateProgress();
  },

  renderCategory(catId) {
    const grid = document.getElementById(`${catId}-grid`);
    if (!grid) return;
    const items = Data[catId] || [];
    grid.innerHTML = '';

    const frag = document.createDocumentFragment();
    items.forEach(item => {
      const learned = Progress.isLearned(catId, item.id);
      const card = this.createCard(catId, item, learned);
      frag.appendChild(card);
    });
    grid.appendChild(frag);
    this.bindCardEvents(catId);
  },

  createCard(catId, item, learned) {
    const card = document.createElement('div');
    card.className = 'letter-card' + (learned ? ' learned' : '');
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.dataset.id = item.id;

    // Alfabe özel: büyük harf göster
    const bigChar = item.letter ? `<div class="letter-char" style="color: ${item.color}">${item.letter}</div>` : '';
    const cardTypeClass = item.letter ? 'letter-card' : 'letter-card word-card';

    card.className = cardTypeClass + (learned ? ' learned' : '');

    card.innerHTML = `
      ${bigChar}
      <div class="letter-emoji" aria-hidden="true">${item.emoji}</div>
      <div class="letter-word">${this._escape(item.word)}</div>
      <div class="letter-fa">${this._escape(item.fa)}</div>
      <div class="letter-actions">
        <button class="action-btn" data-action="speak-en" data-word="${this._escape(item.word)}" aria-label="English">🔊 EN</button>
        <button class="action-btn" data-action="speak-fa" data-word="${this._escape(item.fa)}" aria-label="فارسی">🔊 FA</button>
        <button class="action-btn learned-btn ${learned ? 'active' : ''}" data-action="toggle" data-id="${item.id}">
          ${learned ? '✓' : '⭐'}
        </button>
      </div>
    `;
    return card;
  },

  bindCardEvents(catId) {
    const grid = document.getElementById(`${catId}-grid`);
    if (!grid) return;

    grid.querySelectorAll('.letter-card, .word-card').forEach(card => {
      const onActivate = (e) => {
        if (e.target.closest('.action-btn')) return;
        const word = card.querySelector('.letter-word')?.textContent;
        if (word) TTS.speak(word, 'en');
      };
      card.addEventListener('click', onActivate);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(e); }
      });
    });

    grid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'speak-en') TTS.speak(btn.dataset.word, 'en');
        else if (action === 'speak-fa') TTS.speak(btn.dataset.word, 'fa');
        else if (action === 'toggle') {
          Progress.toggle(catId, btn.dataset.id);
          this.renderCurrent();
        }
      });
    });
  },

  renderSongs() {
    const grid = document.getElementById('songs-grid');
    if (!grid) return;
    grid.innerHTML = '';
    Data.songs.forEach(song => {
      const learned = Progress.isLearned('songs', song.id);
      const card = document.createElement('div');
      card.className = 'letter-card' + (learned ? ' learned' : '');
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.dataset.id = song.id;
      card.innerHTML = `
        <div class="letter-emoji" aria-hidden="true" style="font-size:4rem">${song.emoji}</div>
        <div class="letter-word" style="color: ${song.color}">${this._escape(song.title)}</div>
        <div class="letter-fa">${this._escape(song.faTitle)}</div>
        <div class="letter-actions">
          <button class="action-btn" data-action="open-song" data-id="${song.id}">📖 ${I18n.t('btn.viewLyrics', 'View lyrics')}</button>
          <button class="action-btn learned-btn ${learned ? 'active' : ''}" data-action="toggle" data-id="${song.id}">
            ${learned ? '✓' : '⭐'}
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    grid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.dataset.action === 'open-song') this.openSong(btn.dataset.id);
        else if (btn.dataset.action === 'toggle') {
          Progress.toggle('songs', btn.dataset.id);
          this.renderCurrent();
        }
      });
    });

    // Update total
    const totalEl = document.getElementById('progress-total');
    if (totalEl) totalEl.textContent = Data.songs.length;
  },

  openSong(songId) {
    const song = Data.songs.find(s => s.id === songId);
    if (!song) return;
    const modal = document.getElementById('song-modal');
    if (!modal) return;
    const body = document.getElementById('song-modal-body');
    body.innerHTML = `
      <h3 style="color: ${song.color}; font-family: 'Fredoka', 'Vazirmatn', sans-serif; margin-bottom: 0.3rem;">${this._escape(song.title)}</h3>
      <p style="color: #888; margin-bottom: 1.2rem;">${this._escape(song.faTitle)}</p>
      <div class="song-lines">
        ${song.lines.map(line => `<p class="song-line">${this._escape(line)}</p>`).join('')}
      </div>
      <div style="margin-top: 1.5rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button class="action-btn" data-action="speak-en" data-word="${this._escape(song.title)}" style="font-size: 0.9rem; padding: 0.5rem 1rem;">🔊 ${I18n.t('btn.speakTitle', 'Speak title')}</button>
        <button class="action-btn" data-action="speak-fa" data-word="${this._escape(song.faTitle)}" style="font-size: 0.9rem; padding: 0.5rem 1rem;">🔊 ${I18n.t('btn.speakTitleFA', 'Speak Farsi title')}</button>
        <button class="action-btn" data-action="toggle" data-id="${song.id}" style="font-size: 0.9rem; padding: 0.5rem 1rem;">${Progress.isLearned('songs', song.id) ? '✓ ' + I18n.t('btn.learned', 'Learned') : '⭐ ' + I18n.t('btn.markLearned', 'Mark learned')}</button>
      </div>
    `;
    modal.style.display = 'flex';
    modal.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.action === 'speak-en') TTS.speak(btn.dataset.word, 'en');
        else if (btn.dataset.action === 'speak-fa') TTS.speak(btn.dataset.word, 'fa');
        else if (btn.dataset.action === 'toggle') {
          Progress.toggle('songs', btn.dataset.id);
          this.openSong(songId);
        }
      });
    });
  },

  updateProgress() {
    const count = Progress.countLearned(this.currentCategory);
    const countEl = document.getElementById('progress-count');
    if (countEl) countEl.textContent = count;
  },

  async handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-btn');
    const accessKey = form.querySelector('[name="access_key"]').value;

    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY_HERE') {
      status.className = 'form-status success';
      status.textContent = I18n.t('contact.demoSuccess', 'Message received! (preview)');
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
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        status.className = 'form-status success';
        status.textContent = I18n.t('contact.success', 'Your message has been sent!');
        form.reset();
      } else {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = I18n.t('contact.error', 'Failed to send.') + (err.message ? ` (${err.message})` : '');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  },

  _escape(str) {
    return String(str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
