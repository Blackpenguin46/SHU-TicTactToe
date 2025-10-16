import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="bg-gradient-to-br from-shu-darkgrey/80 to-shu-black/90 backdrop-blur-sm rounded-[0.8vw] p-[1.5vh] border-[0.3vmin] border-shu-red shadow-2xl shadow-shu-red/30 h-full flex flex-col min-h-0">
      <h3 className="text-responsive-xl font-black text-shu-red mb-[1vh] text-center border-b-[0.2vmin] border-shu-red pb-[1vh] text-shadow-glow px-[0.5vw]">
        Leaderboard
      </h3>
      <div className="space-y-[0.5vh] overflow-y-auto flex-1">
        {entries.slice(0, 15).map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center justify-between bg-gradient-to-r from-shu-black/70 to-shu-darkgrey/50 p-[0.8vh] rounded-[0.5vw] border-[0.2vmin] border-shu-grey/40 hover:border-shu-red/60 transition-all duration-200 touch-none shadow-md"
          >
            <div className="flex items-center gap-[0.5vw] min-w-0">
              <span
                className={`text-responsive-lg font-black flex-shrink-0 ${
                  index === 0
                    ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                    : index === 1
                    ? 'text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]'
                    : index === 2
                    ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)]'
                    : 'text-shu-grey'
                }`}
              >
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
              </span>
              <span className="text-responsive-sm text-white font-bold truncate">
                {entry.playerName}
              </span>
            </div>
            <span className="text-responsive-lg font-black text-shu-red ml-[0.5vw] flex-shrink-0">{entry.wins}</span>
          </div>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-shu-grey text-responsive-sm py-[2vh]">
            No entries yet
          </p>
        )}
      </div>
    </div>
  );
}
