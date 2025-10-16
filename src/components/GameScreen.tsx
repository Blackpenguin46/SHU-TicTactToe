import { useState, useEffect } from 'react';
import type { PlayerInfo, LeaderboardEntry, CollegeFact, Board } from '../types';
import { getLeaderboard, getCollegeFacts, addWin } from '../services/api';
import {
  checkWinner,
  checkDraw,
  getEmptyBoard,
  makeMove,
  getNextPlayer,
} from '../utils/gameLogic';
import TicTacToeGrid from './TicTacToeGrid';
import Leaderboard from './Leaderboard';
import FactsDisplay from './FactsDisplay';

interface GameScreenProps {
  onBackToIdle: () => void;
}

export default function GameScreen({ onBackToIdle }: GameScreenProps) {
  const [players, setPlayers] = useState<PlayerInfo[]>([
    { name: '', symbol: 'X', wins: 0 },
    { name: '', symbol: 'O', wins: 0 },
  ]);
  const [isNamesSet, setIsNamesSet] = useState(false);
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<'X' | 'O' | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [facts, setFacts] = useState<CollegeFact[]>([]);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const [leaderboardData, factsData] = await Promise.all([
      getLeaderboard(),
      getCollegeFacts(),
    ]);
    setLeaderboard(leaderboardData);
    setFacts(factsData);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (players[0].name.trim() && players[1].name.trim()) {
      setIsNamesSet(true);
    }
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || isDraw) return;

    const newBoard = makeMove(board, index, currentPlayer);
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    const gameDraw = checkDraw(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      const winnerPlayer = players.find((p) => p.symbol === gameWinner);
      if (winnerPlayer) {
        setPlayers((prev) =>
          prev.map((p) =>
            p.symbol === gameWinner ? { ...p, wins: p.wins + 1 } : p
          )
        );
        addWin(winnerPlayer.name);
      }
    } else if (gameDraw) {
      setIsDraw(true);
    } else {
      setCurrentPlayer(getNextPlayer(currentPlayer));
    }
  };

  const handleNewGame = () => {
    setBoard(getEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  const handleNewPlayers = () => {
    setIsNamesSet(false);
    setPlayers([
      { name: '', symbol: 'X', wins: 0 },
      { name: '', symbol: 'O', wins: 0 },
    ]);
    handleNewGame();
  };

  if (!isNamesSet) {
    return (
      <div className="h-screen w-screen bg-gradient-to-br from-shu-black via-shu-darkgrey to-shu-black flex items-center justify-center p-[2vh] overflow-hidden">
        <div className="bg-shu-darkgrey/50 backdrop-blur-sm rounded-[1vw] p-[3vh] border-2 border-shu-red shadow-2xl max-w-[70vw] w-full">
          <h2 className="text-responsive-5xl font-bold text-shu-red mb-[2vh] text-center">
            Enter Player Names
          </h2>
          <form onSubmit={handleNameSubmit} className="space-y-[2vh]">
            <div>
              <label className="block text-responsive-2xl font-semibold text-shu-white mb-[1vh]">
                Player 1 (X)
              </label>
              <input
                type="text"
                value={players[0].name}
                onChange={(e) =>
                  setPlayers((prev) => [
                    { ...prev[0], name: e.target.value },
                    prev[1],
                  ])
                }
                className="w-full px-[1vw] py-[1.5vh] text-responsive-2xl bg-shu-black border-2 border-shu-grey rounded-lg text-shu-white focus:border-shu-red focus:outline-none transition-colors touch-none"
                placeholder="Enter name"
                maxLength={20}
                required
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-responsive-2xl font-semibold text-shu-white mb-[1vh]">
                Player 2 (O)
              </label>
              <input
                type="text"
                value={players[1].name}
                onChange={(e) =>
                  setPlayers((prev) => [
                    prev[0],
                    { ...prev[1], name: e.target.value },
                  ])
                }
                className="w-full px-[1vw] py-[1.5vh] text-responsive-2xl bg-shu-black border-2 border-shu-grey rounded-lg text-shu-white focus:border-shu-red focus:outline-none transition-colors touch-none"
                placeholder="Enter name"
                maxLength={20}
                required
                autoComplete="off"
              />
            </div>
            <div className="flex gap-[1vw] pt-[1vh]">
              <button
                type="submit"
                className="flex-1 bg-shu-red hover:bg-red-700 active:bg-red-800 text-white font-bold text-responsive-3xl py-[2vh] rounded-lg active:scale-95 transition-all duration-300 touch-none"
              >
                Start Game
              </button>
              <button
                type="button"
                onClick={onBackToIdle}
                className="px-[2vw] bg-shu-grey hover:bg-gray-600 active:bg-gray-700 text-white font-bold text-responsive-2xl py-[2vh] rounded-lg active:scale-95 transition-all duration-300 touch-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-shu-black via-shu-darkgrey to-shu-black p-[1.5vh] overflow-hidden flex flex-col">
      <div className="max-w-full mx-auto flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="text-center mb-[1vh]">
          <h1 className="text-responsive-3xl font-black text-shu-red leading-tight text-shadow-glow">
            Sacred Heart University Tic-Tac-Toe
          </h1>
        </div>

        {/* Main Game Area */}
        <div className="flex gap-[1.5vw] flex-1 overflow-hidden min-h-0">
          {/* Left Sidebar - Leaderboard */}
          <div className="hidden lg:block w-[18vw] flex-shrink-0">
            <Leaderboard entries={leaderboard} />
          </div>

          {/* Center - Game Board */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Player Info */}
            <div className="flex justify-between mb-[1vh] gap-[1vw]">
              <div
                className={`flex-1 bg-gradient-to-br from-shu-darkgrey to-shu-black rounded-[0.8vw] p-[1vh] border-[0.3vmin] ${
                  currentPlayer === 'X' && !winner && !isDraw
                    ? 'border-shu-red shadow-lg shadow-shu-red/50 animate-glow'
                    : 'border-shu-grey/50'
                } transition-all duration-300`}
              >
                <div className="text-center">
                  <div className="text-responsive-3xl font-black text-shu-red mb-[0.3vh] drop-shadow-[0_0_10px_rgba(206,17,65,0.8)]">X</div>
                  <div className="text-responsive-base font-bold text-white mb-[0.2vh] truncate px-[0.5vw]">
                    {players[0].name}
                  </div>
                  <div className="text-responsive-lg font-bold text-shu-red">
                    {players[0].wins} {players[0].wins === 1 ? 'Win' : 'Wins'}
                  </div>
                </div>
              </div>

              <div
                className={`flex-1 bg-gradient-to-br from-shu-darkgrey to-shu-black rounded-[0.8vw] p-[1vh] border-[0.3vmin] ${
                  currentPlayer === 'O' && !winner && !isDraw
                    ? 'border-shu-red shadow-lg shadow-shu-red/50 animate-glow'
                    : 'border-shu-grey/50'
                } transition-all duration-300`}
              >
                <div className="text-center">
                  <div className="text-responsive-3xl font-black text-white mb-[0.3vh] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">O</div>
                  <div className="text-responsive-base font-bold text-white mb-[0.2vh] truncate px-[0.5vw]">
                    {players[1].name}
                  </div>
                  <div className="text-responsive-lg font-bold text-shu-red">
                    {players[1].wins} {players[1].wins === 1 ? 'Win' : 'Wins'}
                  </div>
                </div>
              </div>
            </div>

            {/* Game Status */}
            {(winner || isDraw) && (
              <div className="mb-[1vh] bg-gradient-to-r from-shu-red via-red-600 to-shu-red backdrop-blur-sm rounded-[0.8vw] p-[1vh] text-center border-[0.3vmin] border-white shadow-2xl shadow-shu-red/60 animate-glow">
                <h2 className="text-responsive-xl font-black text-white text-shadow-white-glow">
                  {winner
                    ? `${players.find((p) => p.symbol === winner)?.name} Wins!`
                    : "It's a Draw!"}
                </h2>
              </div>
            )}

            {/* Tic-Tac-Toe Grid */}
            <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden">
              <TicTacToeGrid board={board} onCellClick={handleCellClick} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[1vw] mt-[1vh]">
              <button
                onClick={handleNewGame}
                className="flex-1 bg-gradient-to-br from-shu-red to-red-700 hover:from-red-600 hover:to-red-800 active:from-red-800 active:to-red-900 text-white font-black text-responsive-base py-[1vh] rounded-[0.8vw] active:scale-95 transition-all duration-200 touch-none shadow-lg shadow-shu-red/40 border-[0.2vmin] border-red-400"
              >
                New Game
              </button>
              <button
                onClick={handleNewPlayers}
                className="flex-1 bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 active:from-gray-700 active:to-gray-900 text-white font-black text-responsive-base py-[1vh] rounded-[0.8vw] active:scale-95 transition-all duration-200 touch-none shadow-lg border-[0.2vmin] border-gray-400"
              >
                New Players
              </button>
              <button
                onClick={onBackToIdle}
                className="px-[2vw] bg-gradient-to-br from-shu-darkgrey to-shu-black hover:from-gray-700 hover:to-black active:from-gray-800 active:to-black text-white font-black text-responsive-base py-[1vh] rounded-[0.8vw] active:scale-95 transition-all duration-200 border-[0.2vmin] border-shu-grey touch-none shadow-lg"
              >
                Exit
              </button>
            </div>
          </div>

          {/* Right Sidebar - Facts */}
          <div className="hidden lg:block w-[18vw] flex-shrink-0">
            <FactsDisplay facts={facts} />
          </div>
        </div>
      </div>
    </div>
  );
}
