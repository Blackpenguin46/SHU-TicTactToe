import type { Player, Board } from '../types';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

export function checkWinner(board: Board): Player {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function checkDraw(board: Board): boolean {
  return board.every((cell) => cell !== null) && !checkWinner(board);
}

export function getEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function makeMove(board: Board, index: number, player: Player): Board {
  if (board[index] !== null) {
    return board;
  }
  const newBoard = [...board];
  newBoard[index] = player;
  return newBoard;
}

export function getNextPlayer(currentPlayer: 'X' | 'O'): 'X' | 'O' {
  return currentPlayer === 'X' ? 'O' : 'X';
}
