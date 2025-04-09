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
  
  // Add home link functionality
  const homeLink = document.getElementById('home-link');
  homeLink.addEventListener('click', () => {
    ChatController.resetChat();
  });
  
  // Also support keyboard navigation for accessibility
  homeLink.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      ChatController.resetChat();
    }
  });
});