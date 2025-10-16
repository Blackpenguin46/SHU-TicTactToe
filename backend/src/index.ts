import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import {
  initializeDatabase,
  getLeaderboard,
  addWin,
  getCollegeFacts,
  addCollegeFact,
} from './database';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
initializeDatabase();

// Routes
app.get('/api/leaderboard', (req: Request, res: Response) => {
  try {
    const leaderboard = getLeaderboard();
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.post('/api/leaderboard', (req: Request, res: Response) => {
  try {
    const { playerName } = req.body;
    if (!playerName || typeof playerName !== 'string') {
      return res.status(400).json({ error: 'Invalid player name' });
    }
    addWin(playerName);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding win:', error);
    res.status(500).json({ error: 'Failed to add win' });
  }
});

app.get('/api/facts', (req: Request, res: Response) => {
  try {
    const facts = getCollegeFacts();
    res.json(facts);
  } catch (error) {
    console.error('Error fetching facts:', error);
    res.status(500).json({ error: 'Failed to fetch facts' });
  }
});

app.post('/api/facts', (req: Request, res: Response) => {
  try {
    const { fact } = req.body;
    if (!fact || typeof fact !== 'string') {
      return res.status(400).json({ error: 'Invalid fact' });
    }
    addCollegeFact(fact);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error adding fact:', error);
    res.status(500).json({ error: 'Failed to add fact' });
  }
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
