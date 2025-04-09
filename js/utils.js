/**
 * Utility functions for the chat application
 */

const Utils = {
  /**
   * Generate a unique ID
   * @returns {string} A unique ID
   */
  generateId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  },

  /**
   * Format a timestamp to a human-readable string
   * @param {number} timestamp - The timestamp to format
   * @returns {string} A formatted time string (e.g., "2:30 PM")
   */
  formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  },

  /**
   * Scroll an element to the bottom
   * @param {HTMLElement} element - The element to scroll
   */
  scrollToBottom(element) {
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  },

  /**
   * Store data in localStorage
   * @param {string} key - The key to store the data under
   * @param {any} data - The data to store
   */
  setLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error storing data in localStorage:', error);
    }
  },

  /**
   * Retrieve data from localStorage
   * @param {string} key - The key to retrieve data from
   * @param {any} defaultValue - The default value to return if the key doesn't exist
   * @returns {any} The retrieved data or defaultValue
   */
  getLocalStorage(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return defaultValue;
    }
  },

  /**
   * Auto-resize a textarea based on its content
   * @param {HTMLTextAreaElement} textarea - The textarea element to resize
   */
  autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  }
};