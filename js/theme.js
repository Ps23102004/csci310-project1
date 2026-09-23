/**
 * ==========================================================================
 * SKYLINE RELIGION — DYNAMIC SYSTEM-ADAPTIVE THEME MANAGER
 * Synchronizes with OS prefers-color-scheme & Supports Manual Override
 * ==========================================================================
 */

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'skyline_religion_theme';
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize Theme
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.applyTheme(savedTheme);
    } else {
      // Auto-match system preference
      this.applyTheme(this.mediaQuery.matches ? 'dark' : 'light', false);
    }

    // Listen to OS-level theme changes in real time
    this.mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.applyTheme(e.matches ? 'dark' : 'light', false);
      }
    });

    // Wire up all theme toggle buttons across the DOM
    this.bindButtons();
  }

  applyTheme(theme, persist = true) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }

    // Update button icons/labels
    this.updateToggleUI(theme);
  }

  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || (this.mediaQuery.matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme, true);
  }

  updateToggleUI(theme) {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      if (theme === 'dark') {
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <span>Light</span>
        `;
      } else {
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span>Dark</span>
        `;
      }
    });
  }

  bindButtons() {
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => this.toggle());
    });
  }
}

// Global Theme Instance
window.themeManager = new ThemeManager();
