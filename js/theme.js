/**
 * Theme management for the chat application
 */

const ThemeManager = {
  /**
   * Initialize the theme manager
   */
  init() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.isDarkMode = Utils.getLocalStorage('darkMode', false);
    
    // Apply the saved theme
    this.applyTheme();
    
    // Add event listeners
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Check for system preference changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', e => {
        if (Utils.getLocalStorage('userSetTheme', false) === false) {
          this.isDarkMode = e.matches;
          this.applyTheme();
        }
      });
    }
  },
  
  /**
   * Toggle between light and dark themes
   */
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    Utils.setLocalStorage('darkMode', this.isDarkMode);
    Utils.setLocalStorage('userSetTheme', true); // User manually set the theme
    this.applyTheme();
  },
  
  /**
   * Apply the current theme to the document
   */
  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
};