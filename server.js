require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Check for required environment variables
if (!process.env.GEMINI_API_KEY) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY is missing. Please add it to your .env file.');
}

const app = express();
const PORT = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Code2Vibe server running');
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a hilarious developer and music expert. Analyze the provided code and recommend a specific, real, 3-5 minute song that is funny, satirical, or highly relatable to programming struggles. Parody songs about tech, debugging frustrations, or developer humor are HIGHLY encouraged!

Return ONLY a valid JSON object with four keys:
- emotion (a short emotion describing the code vibe)
- song_title (the exact title of the song you're recommending)
- artist (the artist/band who performs the song)
- story (a funny, dramatic 2-sentence story about the developer who wrote this code)
- playlist_url (a YouTube search URL in the format https://www.youtube.com/results?search_query=SONG+ARTIST where SONG and ARTIST are separated by +)

Return raw JSON without any markdown formatting. JUST the JSON object itself.

Code to analyze:
${code}`;

    const result = await model.generateContent(prompt);
    const content = result.response.text();

    // Remove markdown formatting with robust regex and string replacement
    let cleanedContent = content.trim();
    // Remove markdown code blocks (```json, ```, etc.)
    cleanedContent = cleanedContent.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    cleanedContent = cleanedContent.trim();
    
    // Extract JSON if wrapped in text
    const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanedContent = jsonMatch[0];
    }

    const analysisData = JSON.parse(cleanedContent);

    res.json({
      emotion: analysisData.emotion,
      song_title: analysisData.song_title,
      artist: analysisData.artist,
      story: analysisData.story,
      playlist_url: analysisData.playlist_url
    });
  } catch (error) {
    console.error('❌ Error analyzing code:', error.message);
    const errorResponse = {
      error: 'Failed to analyze code',
      message: error.message
    };
    return res.status(500).json(errorResponse);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});