const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/create-schedule", async (req, res) => {
  const { topics, dailyHours, duration } = req.body;

  const prompt = `Generate a ${duration}-day study plan for: ${topics.join(", ")}. Each day should include ${dailyHours} hours of focused learning with breaks and objectives.`;

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ schedule: result.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).send("Error generating study plan.");
  }
});

app.listen(5500, () => console.log("✅ FocusGenius backend running on port 5500"));
