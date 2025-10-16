import { useEffect, useState } from 'react';
import type { LeaderboardEntry, CollegeFact } from '../types';
import { getLeaderboard, getCollegeFacts } from '../services/api';

interface IdleScreenProps {
  onStart: () => void;
}

export default function IdleScreen({ onStart }: IdleScreenProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [facts, setFacts] = useState<CollegeFact[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (facts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 8000); // Change fact every 8 seconds
    return () => clearInterval(interval);
  }, [facts]);

  const loadData = async () => {
    const [leaderboardData, factsData] = await Promise.all([
      getLeaderboard(),
      getCollegeFacts(),
    ]);
    setLeaderboard(leaderboardData);
    setFacts(factsData);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-shu-black via-shu-darkgrey to-shu-black flex flex-col items-center justify-center p-[2vh] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-[2vh]">
        <h1 className="text-responsive-8xl font-bold text-shu-red mb-[1vh] text-shadow-glow leading-tight">
          Sacred Heart University
        </h1>
        <h2 className="text-responsive-6xl font-semibold text-shu-white leading-tight">
          Tic-Tac-Toe Challenge
        </h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-[2vw] w-full max-w-[95vw] mb-[2vh] flex-1 overflow-hidden min-h-0">
        {/* Leaderboard */}
        <div className="flex-1 bg-shu-darkgrey/50 backdrop-blur-sm rounded-[1vw] p-[2vh] border-2 border-shu-red shadow-2xl overflow-hidden flex flex-col min-h-0">
          <h3 className="text-responsive-4xl font-bold text-shu-red mb-[1vh] text-center border-b-2 border-shu-red pb-[1vh]">
            All-Time Leaderboard
          </h3>
          <div className="space-y-[0.5vh] overflow-y-auto flex-1">
            {leaderboard.slice(0, 10).map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between bg-shu-black/50 p-[1vh] rounded-lg border border-shu-grey/30 active:border-shu-red transition-colors touch-none"
              >
                <div className="flex items-center gap-[1vw] min-w-0">
                  <span
                    className={`text-responsive-2xl font-bold flex-shrink-0 ${
                      index === 0
                        ? 'text-yellow-400'
                        : index === 1
                        ? 'text-gray-300'
                        : index === 2
                        ? 'text-orange-400'
                        : 'text-shu-grey'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="text-responsive-xl text-shu-white font-medium truncate">
                    {entry.playerName}
                  </span>
                </div>
                <span className="text-responsive-2xl font-bold text-shu-red ml-[1vw] flex-shrink-0">
                  {entry.wins}
                </span>
              </div>
            ))}
            {leaderboard.length === 0 && (
              <p className="text-center text-shu-grey text-responsive-lg py-[2vh]">
                No games played yet. Be the first!
              </p>
            )}
          </div>
        </div>

        {/* College Facts */}
        <div className="flex-1 bg-shu-darkgrey/50 backdrop-blur-sm rounded-[1vw] p-[2vh] border-2 border-shu-red shadow-2xl flex flex-col">
          <h3 className="text-responsive-4xl font-bold text-shu-red mb-[1vh] text-center border-b-2 border-shu-red pb-[1vh]">
            Did You Know?
          </h3>
          <div className="flex items-center justify-center flex-1 p-[1vh]">
            {facts.length > 0 ? (
              <p className="text-responsive-3xl text-shu-white leading-relaxed text-center">
                {facts[currentFactIndex]?.fact}
              </p>
            ) : (
              <p className="text-responsive-lg text-shu-grey text-center">
                Loading facts...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <button
        onClick={onStart}
        className="bg-shu-red hover:bg-red-700 active:bg-red-800 text-white font-bold text-responsive-6xl px-[5vw] py-[2vh] rounded-[1vw] shadow-2xl active:scale-95 transition-all duration-300 border-4 border-white animate-pulse touch-none my-[2vh]"
      >
        TOUCH TO START
      </button>

      {/* Footer */}
      <div className="text-shu-grey text-responsive-lg">
        Touch the screen to begin your game
      </div>
    </div>
  );
}
