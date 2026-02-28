<div align="center">

# 🎵 Code2Vibe

### Translate Your Code Into Emotions & Music 🚀

*A hilarious Gemini AI-powered web app that analyzes your code and recommends a funny, relatable 3-minute song.*

[Live Demo](#getting-started) • [How It Works](#what-it-does) • [Built With](#how-i-built-it)

</div>

---

## 🎯 What It Does

Code2Vibe is a fun, interactive web application that takes any code snippet you paste and:

1. **Analyzes the "Vibe"** — Uses Google's Gemini 2.5 Flash AI to detect the emotional energy and style of your code
2. **Recommends a Song** — Returns a specific, **real, 3-5 minute song** that's funny, satirical, or highly relatable to programming struggles (parody songs about debugging are encouraged!)
3. **Tells Your Story** — Generates a dramatic 2-sentence tale about the developer who wrote your code
4. **Plays the Track** — Provides a direct YouTube search link so you can immediately listen to your "code vibe soundtrack"

### Key Features

✨ **Modern Dark Theme** — Inspired by VS Code and Spotify  
🤖 **Powered by Gemini AI** — Real-time code analysis with humor  
⚡ **Zero Dependencies on Frontend** — Pure HTML, CSS, and Vanilla JavaScript  
🎵 **YouTube Integration** — One-click access to your vibe song  
🛡️ **Production-Grade Error Handling** — Graceful fallbacks and clear error messages  

---

## 🛠️ How I Built It

### Frontend Stack
- **HTML5** — Semantic structure with clean form elements
- **CSS3** — Dark theme with gradient buttons, responsive design
- **Vanilla JavaScript** — Async/await fetch API for backend communication

### Backend Stack
- **Node.js** — JavaScript runtime
- **Express.js** — Lightweight web framework with CORS support
- **@google/generative-ai SDK** — Official Google Gemini API client

### Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (index.html)               │
│  - Textarea for code input                           │
│  - Submit button ("Analyze Vibe")                    │
│  - Result card with emotion, song, story, link      │
└────────────────────┬────────────────────────────────┘
                     │ POST /api/analyze
                     │ (code snippet)
                     ▼
┌─────────────────────────────────────────────────────┐
│                Backend (server.js)                   │
│  - Express server on port 3000                       │
│  - Validates input, handles errors gracefully        │
│  - Calls Gemini 2.5 Flash API                        │
│  - Cleans AI response (removes markdown)             │
│  - Returns JSON (emotion, song_title, artist, etc)   │
└────────────────────┬────────────────────────────────┘
                     │ JSON Response
                     │ (song recommendation)
                     ▼
┌─────────────────────────────────────────────────────┐
│            Gemini AI (Google Cloud)                  │
│  - Analyzes code for "vibe"                          │
│  - Recommends funny/relatable song                   │
│  - Generates humorous developer story                │
│  - Formats YouTube playlist URL                      │
└─────────────────────────────────────────────────────┘
```

---

## 🤖 GitHub Copilot Usage

GitHub Copilot played a **critical role** in developing Code2Vibe efficiently. Here's exactly how:

### 1. **Project Scaffolding with Agent Mode**

I used **Copilot Agent Mode** to rapidly scaffold the entire project structure:
- Generated the initial `index.html` with semantic HTML layout
- Created `style.css` with a modern dark theme (VS Code + Spotify inspired)
- Wrote `server.js` with Express routing and middleware setup

**Benefit:** Instead of manually typing boilerplate, Agent Mode answered design questions and produced production-ready code in seconds.

### 2. **Troubleshooting the Gemini Model 404 Error**

When the Gemini API initially returned a 404 "model not found" error, I used **Copilot Chat** to:
- Explain the error and ask for the current available models
- Discovered the issue was using an older model name (`gemini-1.5-flash` vs `gemini-2.5-flash`)
- Got guidance on how to check the official Google documentation

**Benefit:** Copilot helped identify the root cause and suggested the solution without needing to manually search docs.

### 3. **Regex Pattern Development for Response Cleaning**

The Gemini API sometimes wraps JSON responses in markdown code blocks (````json ... ```). I used **Copilot Chat** to:
- Describe the problem: "How do I strip markdown formatting from AI responses?"
- Get regex patterns: `cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '')`
- Add a fallback JSON extraction pattern: `/\{[\s\S]*\}/`

**Benefit:** Instead of manually writing regex, Copilot suggested robust patterns and explained edge cases.

### 4. **Translation from Spanish to English**

When requirements changed to English, **Copilot Chat** helped translate:
- UI text ("Analizar Vibe" → "Analyze Vibe")
- Prompt instructions in `server.js`
- Error messages

**Benefit:** Quick, contextual translations that maintained tone and technical accuracy.

### 5. **API Response Handling & Frontend Integration**

I used **Copilot** to write the fetch logic in `index.html`:
- Async/await pattern for cleaner code
- Destructuring JSON response (`const { emotion, song_title, artist, ... } = data`)
- Try/catch error handling with user-friendly messages

**Benefit:** Copilot suggested idiomatic JavaScript patterns that are clean and maintainable.

### 6. **Prompt Engineering for Gemini**

When refining the Gemini prompt to get funnier song recommendations, **Copilot Chat** helped:
- Structure the system instructions clearly
- Emphasize "real songs" and "parody songs about debugging"
- Format the expected JSON schema in the prompt itself
- Add specific instrumentation (emotion, song_title, artist, story, playlist_url)

**Benefit:** Strategic prompt suggestions that directly improved output quality.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **Google Gemini API Key** — [Get one here](https://ai.google.dev/tutorials/setup)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/code2vibe.git
   cd code2vibe
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This installs:
   - `express` — Web framework
   - `cors` — Cross-Origin Resource Sharing
   - `dotenv` — Environment variable management
   - `@google/generative-ai` — Google Gemini SDK

3. **Set Up Environment Variables**
   
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Replace `your_actual_api_key_here` with your real Google Gemini API key.

4. **Start the Server**
   ```bash
   node server.js
   ```
   
   You should see:
   ```
   Server listening on port 3000
   ```

5. **Open the Frontend**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000/index.html
   ```
   
   Or simply open the `index.html` file directly in your browser (it will still function, though the fetch requests will communicate with `localhost:3000`).

### Usage

1. **Paste Your Code** — Copy and paste any code snippet into the textarea
2. **Click "Analyze Vibe"** — The app sends your code to the Gemini AI backend
3. **Get Results** — See your emotion, song recommendation, developer story, and YouTube link
4. **Listen** — Click the YouTube button to find and listen to your vibe song!

---

## 📁 Project Structure

```
code2vibe/
├── index.html          # Frontend - HTML structure
├── style.css           # Frontend - Dark theme styling
├── server.js           # Backend - Express API server
├── .env                # Environment variables (GEMINI_API_KEY)
├── .gitignore          # Git ignore file
├── package.json        # Node.js dependencies
└── README.md           # This file
```

---

## 🔑 API Endpoints

### `GET /`
Returns a simple status message.

**Response:**
```
Code2Vibe server running
```

### `POST /api/analyze`

Analyzes code and returns a song recommendation.

**Request Body:**
```json
{
  "code": "console.log('Hello, World!');"
}
```

**Response:**
```json
{
  "emotion": "Joyful simplicity",
  "song_title": "Hello World",
  "artist": "8 Bit Weapon",
  "story": "This dev forgot that whitespace was optional. Their linter cried.",
  "playlist_url": "https://www.youtube.com/results?search_query=Hello+World+8+Bit+Weapon"
}
```

**Error Response (400 - No code):**
```json
{
  "error": "No code provided"
}
```

**Error Response (500 - Server error):**
```json
{
  "error": "Failed to analyze code",
  "message": "[error details]"
}
```

---

## 🎨 Design Inspiration

- **Color Scheme** — Dark theme inspired by VS Code (`#1e1e2f` background, `#9d50bb` accent)
- **Spotify Influence** — Gradient buttons, rounded corners, modern sans-serif fonts
- **User Experience** — Large textarea, prominent call-to-action, elegant result card

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY is missing" Warning
- Make sure you created a `.env` file in the project root
- Verify your API key is correct and not expired
- Restart the server after updating `.env`

### 404 Model Error from Gemini API
- Ensure you're using `gemini-2.5-flash` (current model)
- If you see "Model not found", check [Google's documentation](https://ai.google.dev/models) for available models

### CORS Errors in Browser Console
- The backend must be running (`node server.js`)
- Verify the frontend fetch URL matches your server address (`http://localhost:3000`)

### Fetch Returns "Failed to analyze code"
- Check the server logs for detailed error messages
- Verify your Gemini API key is valid and has quota remaining
- Ensure your code snippet isn't empty

---

## 🏆 Hackathon Submission

This project was built for the **Agents League Hackathon** and showcases:

✅ **AI Integration** — Real-time Gemini API usage  
✅ **Creative Problem-Solving** — Song recommendations as code vibes  
✅ **Full-Stack Development** — Frontend + Backend + 3rd-party API  
✅ **Error Resilience** — Graceful handling of edge cases  
✅ **Modern Frontend** — Responsive dark theme with smooth UX  
✅ **GitHub Copilot Leverage** — Efficient development with AI assistance  

---

## 📄 License

This project is open-source and available under the MIT License.

---

## 🎤 Feedback & Contributions

Have ideas to make Code2Vibe funnier or more useful? Feel free to:
- Open an issue
- Submit a pull request
- Suggest parody songs that should be in the AI's training data!

---

<div align="center">

**Made with ❤️ and Gemini AI**  
*Analyzing your code one song at a time.*

</div>