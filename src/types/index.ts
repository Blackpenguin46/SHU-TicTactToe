export type Player = 'X' | 'O' | null;

export type Board = Player[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  isDraw: boolean;
  isGameOver: boolean;
}

export interface PlayerInfo {
  name: string;
  symbol: Player;
  wins: number;
}

export interface LeaderboardEntry {
  id: number;
  playerName: string;
  wins: number;
  timestamp: string;
}

export interface CollegeFact {
  id: number;
  fact: string;
}

export type AppScreen = 'idle' | 'game';
