# AI Chat UI (Apple-style)

A clean, responsive, and modern chat UI built with vanilla JavaScript. Features an Apple-inspired design with markdown support for rich responses.

![AI Chat UI Screenshot](https://via.placeholder.com/800x450.png?text=AI+Chat+UI+Screenshot)

## Features

- 🎨 **Apple-inspired design** - Clean, minimal interface with Apple design cues
- 📱 **Fully responsive** - Works on mobile, tablet, and desktop
- 🔄 **Pure JavaScript** - No frameworks or build tools required
- 📝 **Markdown support** - Display rich text, code blocks, and formatted content
- 🌓 **Light/dark mode** - Toggle between themes with automatic system preference detection
- 💾 **Local storage** - Chat history persists across browser sessions
- 🚀 **Lightweight** - Fast loading and execution

## Usage

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd hr-agent-frontend
   ```

2. Open the `index.html` file in your browser
   - You can use a local development server like Live Server for VS Code
   - Or simply double-click the file to open it in your browser

3. Alternatively, host the files on any static web server.

## Project Structure

```
/
├── assets/            # Static assets like images
├── css/               # Stylesheets
│   ├── reset.css      # CSS reset
│   └── styles.css     # Main styles
├── js/                # JavaScript modules
│   ├── api.js         # API service for communication with backend
│   ├── app.js         # Main application entry point
│   ├── chat.js        # Chat controller
│   ├── message-renderer.js # Message rendering with markdown
│   ├── theme.js       # Theme management
│   └── utils.js       # Utility functions
└── index.html         # Main HTML file
```

## Connecting to a Real Backend

To connect this UI to a real AI API backend:

1. Update the `sendMessage` function in `js/api.js`
2. Replace the mock implementation with actual API calls
3. Handle authentication and any additional parameters required by your API

## Dependencies

This project uses a few lightweight dependencies loaded via CDN:

- **marked.js** - Markdown parser and compiler for JavaScript
- **highlight.js** - Syntax highlighting for code blocks

## Browser Compatibility

This application is built with modern JavaScript and CSS and should work in all recent browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Next Steps

Future enhancements could include:

- Multiple chat sessions/conversations
- User authentication
- Voice input
- File attachments
- Conversation export
- More advanced UI animations
- Accessibility improvements

## License

This project is available under the MIT License.