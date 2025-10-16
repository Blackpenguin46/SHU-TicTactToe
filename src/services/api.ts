import type { LeaderboardEntry, CollegeFact } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await fetch(`${API_URL}/leaderboard`);
    if (!response.ok) throw new Error('Failed to fetch leaderboard');
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}

export async function addWin(playerName: string): Promise<void> {
  try {
    await fetch(`${API_URL}/leaderboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerName }),
    });
  } catch (error) {
    console.error('Error adding win:', error);
  }
}

export async function getCollegeFacts(): Promise<CollegeFact[]> {
  try {
    const response = await fetch(`${API_URL}/facts`);
    if (!response.ok) throw new Error('Failed to fetch facts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching facts:', error);
    return [];
  }
}
