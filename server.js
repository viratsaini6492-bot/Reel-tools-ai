import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/generate", async (req, res) => {
  try {
    const { type, topic } = req.body;
    if (!topic?.trim()) return res.status(400).json({ error: "Topic is required." });
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: "OPENAI_API_KEY is not configured on the server." });

    const prompts = {
      script: `Create a short, engaging Instagram Reel script in Hinglish about: ${topic}. Include a strong first-3-second hook, 5-7 short lines, and a memorable ending. Do not use markdown.`,
      caption: `Write 5 catchy Instagram captions in Hinglish about: ${topic}. Keep them concise, emotional/relatable, and suitable for Reels.`,
      story: `Write a 20-25 line emotional Hinglish Instagram story about: ${topic}. Make the first 2 lines hook the viewer and make the ending memorable.`,
      hashtag: `Suggest 15 relevant Instagram hashtags for: ${topic}. Return only hashtags separated by spaces.`,
      bio: `Create 5 short, attractive Instagram bios for a creator whose niche is: ${topic}. Use emojis sparingly.`
    };

    const prompt = prompts[type] || prompts.script;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-mini",
        input: prompt
      })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data?.error?.message || "AI request failed." });

    res.json({ result: data.output_text || "No result returned." });
  } catch (e) {
    res.status(500).json({ error: "Server error." });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ReelTools running on port ${port}`));
