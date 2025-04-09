/**
 * Main application entry point
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize components
  MessageRenderer.init();
  ThemeManager.init();
  ChatController.init();
  
  // Check for system theme preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // If user hasn't manually set a theme, follow system preference
    if (!Utils.getLocalStorage('userSetTheme', false)) {
      Utils.setLocalStorage('darkMode', true);
      ThemeManager.isDarkMode = true;
      ThemeManager.applyTheme();
    }
  }
});