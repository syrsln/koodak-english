// progress.js - localStorage progress tracking
// Stores learned items per category. Pure localStorage, no server.

const Progress = {
  KEY: 'ke_progress_v1',

  _read() {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (err) {
      console.warn('[progress] read failed:', err);
      return {};
    }
  },

  _write(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('[progress] write failed:', err);
    }
  },

  isLearned(category, id) {
    const data = this._read();
    return !!(data[category] && data[category][id]);
  },

  mark(category, id) {
    const data = this._read();
    if (!data[category]) data[category] = {};
    data[category][id] = Date.now();
    this._write(data);
  },

  unmark(category, id) {
    const data = this._read();
    if (data[category] && data[category][id]) {
      delete data[category][id];
      // Clean up empty category
      if (Object.keys(data[category]).length === 0) {
        delete data[category];
      }
      this._write(data);
    }
  },

  toggle(category, id) {
    if (this.isLearned(category, id)) {
      this.unmark(category, id);
      return false;
    } else {
      this.mark(category, id);
      return true;
    }
  },

  countLearned(category) {
    const data = this._read();
    if (!data[category]) return 0;
    return Object.keys(data[category]).length;
  },

  resetCategory(category) {
    const data = this._read();
    if (data[category]) {
      delete data[category];
      this._write(data);
    }
  },

  resetAll() {
    localStorage.removeItem(this.KEY);
  },

  exportData() {
    return this._read();
  }
};
