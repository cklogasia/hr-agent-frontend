/**
 * API service for interacting with the AI backend
 */

const ApiService = {
  /**
   * Send a message to the AI agent
   * @param {string} message - The message to send
   * @returns {Promise<object>} The response from the agent
   */
  async sendMessage(message) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response with markdown content
    const responses = [
      `## Hello there!

I'm your AI assistant. How can I help you today?

* I can answer questions
* Help with various tasks
* Provide information`,

      `## Analysis Complete

Based on your request, here's what I found:

1. **Key Insights**
   - The data shows a positive trend
   - Several anomalies were detected
   - Recommendations are available

2. **Next Steps**
   - Review the detailed report
   - Consider implementing suggested changes
   - Schedule a follow-up analysis`,

      `Here's a code sample you requested:

\`\`\`javascript
function createChatMessage(message) {
  const element = document.createElement('div');
  element.className = \`message message-\${message.role}\`;
  
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  
  const content = document.createElement('div');
  content.className = 'message-content';
  content.innerHTML = marked.parse(message.content);
  
  bubble.appendChild(content);
  element.appendChild(bubble);
  
  return element;
}
\`\`\`

Does this help with what you were looking for?`
    ];

    // Select a random response
    const responseContent = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Utils.generateId(),
      role: 'assistant',
      content: responseContent,
      timestamp: Date.now()
    };
  }
};