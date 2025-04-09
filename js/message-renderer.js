/**
 * Message renderer for chat messages with markdown support
 */

const MessageRenderer = {
  /**
   * Initialize the message renderer
   */
  init() {
    // Configure marked.js options
    marked.setOptions({
      breaks: true, // Enable line breaks
      gfm: true,    // Enable GitHub Flavored Markdown
      highlight: function(code, language) {
        // If the language is specified and hljs recognizes it, highlight the code
        if (language && hljs.getLanguage(language)) {
          try {
            return hljs.highlight(code, { language }).value;
          } catch (err) {
            console.error('Error highlighting code:', err);
          }
        }
        // Otherwise, just return the code as is
        return code;
      }
    });
  },
  
  /**
   * Create a chat message element
   * @param {object} message - The message object
   * @returns {HTMLElement} The message element
   */
  createMessageElement(message) {
    const element = document.createElement('div');
    element.className = `message message-${message.role}`;
    element.id = `message-${message.id}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    if (message.role === 'user') {
      // Regular text for user messages
      content.textContent = message.content;
    } else {
      // Rendered markdown for assistant messages
      content.innerHTML = this.renderMarkdown(message.content);
      
      // Apply syntax highlighting to code blocks
      content.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
    
    const timestamp = document.createElement('div');
    timestamp.className = 'message-timestamp';
    timestamp.textContent = Utils.formatTimestamp(message.timestamp);
    
    bubble.appendChild(content);
    bubble.appendChild(timestamp);
    element.appendChild(bubble);
    
    return element;
  },
  
  /**
   * Create a loading indicator element
   * @returns {HTMLElement} The loading indicator element
   */
  createLoadingIndicator() {
    const element = document.createElement('div');
    element.className = 'message message-assistant';
    element.id = 'loading-indicator';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    const loadingDots = document.createElement('div');
    loadingDots.className = 'loading-dots';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      loadingDots.appendChild(dot);
    }
    
    bubble.appendChild(loadingDots);
    element.appendChild(bubble);
    
    return element;
  },
  
  /**
   * Render markdown to HTML
   * @param {string} markdown - The markdown content
   * @returns {string} The rendered HTML
   */
  renderMarkdown(markdown) {
    return marked.parse(markdown);
  }
};