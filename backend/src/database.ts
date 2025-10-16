import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(__dirname, '../data/tictactoe.db'));

// Initialize database tables
export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL,
      wins INTEGER DEFAULT 1,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS facts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fact TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_leaderboard_wins ON leaderboard(wins DESC);
  `);

  // Insert default facts if the table is empty
  const factCount = db.prepare('SELECT COUNT(*) as count FROM facts').get() as { count: number };

  if (factCount.count === 0) {
    const defaultFacts = [
      'Sacred Heart University was founded in 1963.',
      'SHU has over 90 undergraduate and graduate programs.',
      'The university mascot is the Pioneer.',
      'SHU is located in Fairfield, Connecticut.',
      'Sacred Heart University has a student-to-faculty ratio of 14:1.',
      'The university offers Division I athletics programs.',
      'SHU is home to more than 9,000 students.',
      'The Frank and Marisa Martire Business & Communications Center opened in 2014.',
      'Sacred Heart University has campuses in Connecticut, Luxembourg, and Ireland.',
      'SHU was the first Catholic university in the United States founded by laity.',
    ];

    const insertFact = db.prepare('INSERT INTO facts (fact) VALUES (?)');
    for (const fact of defaultFacts) {
      insertFact.run(fact);
    }
  }
}

export function getLeaderboard(): Array<{ id: number; playerName: string; wins: number; timestamp: string }> {
  const stmt = db.prepare(`
    SELECT id, player_name as playerName, SUM(wins) as wins, MAX(timestamp) as timestamp
    FROM leaderboard
    GROUP BY player_name
    ORDER BY wins DESC, timestamp DESC
    LIMIT 50
  `);
  return stmt.all() as Array<{ id: number; playerName: string; wins: number; timestamp: string }>;
}

export function addWin(playerName: string): void {
  const stmt = db.prepare('INSERT INTO leaderboard (player_name, wins) VALUES (?, 1)');
  stmt.run(playerName);
}

export function getCollegeFacts(): Array<{ id: number; fact: string }> {
  const stmt = db.prepare('SELECT id, fact FROM facts ORDER BY id');
  return stmt.all() as Array<{ id: number; fact: string }>;
}

export function addCollegeFact(fact: string): void {
  const stmt = db.prepare('INSERT INTO facts (fact) VALUES (?)');
  stmt.run(fact);
}

export default db;
