const express = require('express');
const path = require('path');
const app = express();


// Serve static files from the current directory
app.use(express.static('.'));

// API endpoint to securely provide API keys for Finnhub and Gemini
// API endpoint to securely provide API keys for Finnhub and Gemini
app.get('/api/config', (req, res) => {
  try {
    const finnhubKey = process.env.FINNHUB_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    console.log("DEBUG: finnhubKey:", finnhubKey ? "SET" : "UNSET");
    console.log("DEBUG: geminiKey:", geminiKey ? "SET" : "UNSET");

    if (!finnhubKey || !geminiKey) {
      throw new Error("One or more API keys are missing from environment variables.");
    }

    res.json({
      finnhubApiKey: finnhubKey,
      geminiApiKey: geminiKey,
      configured: true
    });
  } catch (err) {
    console.error("ERROR in /api/config:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});


// CORRECTED: Serve the main investments.html page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'investments.html'));
});

// Start the server
// Start the server
const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log(`Finnhub API Key configured: ${!!process.env.FINNHUB_API_KEY}`);
    console.log(`Gemini API Key configured: ${!!process.env.GEMINI_API_KEY}`);
});

