const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();


const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, "scores.json");

app.use(cors());
app.use(express.json());

// Helper to read/write scores
function readScores() {
  if (!fs.existsSync(DATA_FILE)) return {};
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}
function writeScores(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// POST /api/score { game, name, score }
app.post("/api/score", (req, res) => {
  const { game, name, score } = req.body;
  if (!game || !name || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }
  const data = readScores();
  if (!data[game]) data[game] = [];
  data[game].push({ name, score, time: Date.now() });
  writeScores(data);
  res.json({ success: true });
});

// GET /api/hall-of-fame/:game
app.get("/api/hall-of-fame/:game", (req, res) => {
  const game = req.params.game;
  const data = readScores();
  let scores = data[game] || [];
  // For memory, lower score (time) is better; for others, higher is better
  if (game === "memory") {
    scores = scores.sort((a, b) => a.score - b.score || a.time - b.time);
  } else {
    scores = scores.sort((a, b) => b.score - a.score || a.time - b.time);
  }
  res.json(scores.slice(0, 3));
});

// GET /api/github-token — Sends only the GitHub token
app.get("/api/github-token", (req, res) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "Token not set" });
  }
  res.json({ token: GITHUB_TOKEN }); // Only sends the token
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
