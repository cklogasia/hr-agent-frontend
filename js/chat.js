/**
 * Chat controller for managing the chat interface
 */

const ChatController = {
  /**
   * Initialize the chat controller
   */
  init() {
    // Get DOM elements
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.chatContainer = document.getElementById('chat-container');
    this.chatMessages = document.getElementById('chat-messages');
    this.chatInputContainer = document.getElementById('chat-input-container');
    this.messageInput = document.getElementById('message-input');
    this.sendButton = document.getElementById('send-button');
    this.startChatButton = document.getElementById('start-chat');
    this.newChatButton = document.getElementById('new-chat');
    
    // Initialize state
    this.messages = Utils.getLocalStorage('messages', []);
    this.isLoading = false;
    
    // Initialize the UI
    this.updateUI();
    
    // Add event listeners
    this.messageInput.addEventListener('input', this.handleInputChange.bind(this));
    this.messageInput.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.sendButton.addEventListener('click', this.handleSend.bind(this));
    this.startChatButton.addEventListener('click', this.startNewChat.bind(this));
    this.newChatButton.addEventListener('click', this.startNewChat.bind(this));
    
    // Auto-resize textarea
    this.messageInput.addEventListener('input', () => {
      Utils.autoResizeTextarea(this.messageInput);
    });
  },
  
  /**
   * Update the UI based on the current state
   */
  updateUI() {
    if (this.messages.length > 0) {
      // Show chat UI
      this.welcomeScreen.classList.add('hidden');
      this.chatContainer.classList.remove('hidden');
      this.chatInputContainer.classList.remove('hidden');
      
      // Clear and render all messages
      this.chatMessages.innerHTML = '';
      this.messages.forEach(message => {
        this.appendMessage(message);
      });
      
      // Scroll to the bottom
      Utils.scrollToBottom(this.chatContainer);
    } else {
      // Show welcome screen
      this.welcomeScreen.classList.remove('hidden');
      this.chatContainer.classList.add('hidden');
      this.chatInputContainer.classList.add('hidden');
    }
  },
  
  /**
   * Handle input changes and enable/disable send button
   */
  handleInputChange() {
    // Enable the send button only if there's text input
    this.sendButton.disabled = !this.messageInput.value.trim();
  },
  
  /**
   * Handle keydown events in the message input
   * @param {KeyboardEvent} event - The keydown event
   */
  handleKeyDown(event) {
    // Send message on Enter (without Shift key)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!this.sendButton.disabled) {
        this.handleSend();
      }
    }
  },
  
  /**
   * Handle sending a message
   */
  async handleSend() {
    const messageText = this.messageInput.value.trim();
    if (!messageText || this.isLoading) return;
    
    // Clear the input
    this.messageInput.value = '';
    this.messageInput.style.height = 'auto';
    this.sendButton.disabled = true;
    
    // Create and add user message
    const userMessage = {
      id: Utils.generateId(),
      role: 'user',
      content: messageText,
      timestamp: Date.now()
    };
    
    this.addMessage(userMessage);
    
    // Show loading indicator
    this.isLoading = true;
    this.showLoadingIndicator();
    
    try {
      // Send to API and get response
      const assistantMessage = await ApiService.sendMessage(messageText);
      
      // Remove loading indicator and add assistant message
      this.hideLoadingIndicator();
      this.addMessage(assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message
      this.hideLoadingIndicator();
      const errorMessage = {
        id: Utils.generateId(),
        role: 'assistant',
        content: '**Sorry, I encountered an error.**\nPlease try again later.',
        timestamp: Date.now()
      };
      this.addMessage(errorMessage);
    } finally {
      this.isLoading = false;
    }
  },
  
  /**
   * Add a message to the chat
   * @param {object} message - The message to add
   */
  addMessage(message) {
    // Add to messages array
    this.messages.push(message);
    
    // Save to localStorage
    Utils.setLocalStorage('messages', this.messages);
    
    // Append to UI
    this.appendMessage(message);
    
    // Scroll to bottom
    Utils.scrollToBottom(this.chatContainer);
  },
  
  /**
   * Append a message to the chat UI
   * @param {object} message - The message to append
   */
  appendMessage(message) {
    const messageElement = MessageRenderer.createMessageElement(message);
    this.chatMessages.appendChild(messageElement);
  },
  
  /**
   * Show loading indicator
   */
  showLoadingIndicator() {
    const loadingIndicator = MessageRenderer.createLoadingIndicator();
    this.chatMessages.appendChild(loadingIndicator);
    Utils.scrollToBottom(this.chatContainer);
  },
  
  /**
   * Hide loading indicator
   */
  hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  },
  
  /**
   * Start a new chat
   */
  startNewChat() {
    if (this.isLoading) return;
    
    // Clear messages
    this.messages = [];
    Utils.setLocalStorage('messages', this.messages);
    
    // Update UI
    this.updateUI();
    
    // If welcome screen is shown, initialize chat with default message
    if (this.welcomeScreen.classList.contains('hidden')) {
      // Already in chat view, just cleared
      this.messageInput.focus();
    } else {
      // Show chat interface
      this.welcomeScreen.classList.add('hidden');
      this.chatContainer.classList.remove('hidden');
      this.chatInputContainer.classList.remove('hidden');
      
      // Auto-send the first message to start conversation
      this.messageInput.value = 'Hello! I need help with something.';
      this.handleSend();
    }
  }
};