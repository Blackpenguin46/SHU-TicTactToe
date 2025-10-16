import type { Board } from '../types';

interface TicTacToeGridProps {
  board: Board;
  onCellClick: (index: number) => void;
}

export default function TicTacToeGrid({ board, onCellClick }: TicTacToeGridProps) {
  return (
    <div className="aspect-square w-full max-w-[min(40vh,50vw)] mx-auto">
      <div className="grid grid-cols-3 gap-[0.5vmin] w-full h-full p-[0.5vmin] bg-shu-black/30 rounded-[1vmin] shadow-2xl">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            className={`aspect-square backdrop-blur-sm border-[0.3vmin] rounded-[0.8vmin] flex items-center justify-center transition-all duration-200 active:scale-90 disabled:active:scale-100 disabled:cursor-not-allowed touch-none overflow-hidden ${
              cell === null
                ? 'bg-gradient-to-br from-shu-darkgrey/80 to-shu-black/90 border-shu-grey/50 hover:border-shu-red/70 hover:shadow-lg hover:shadow-shu-red/30'
                : cell === 'X'
                ? 'bg-gradient-to-br from-shu-darkgrey to-shu-black border-shu-red shadow-lg shadow-shu-red/40'
                : 'bg-gradient-to-br from-shu-darkgrey to-shu-black border-shu-red shadow-lg shadow-shu-red/40'
            }`}
            disabled={cell !== null}
            style={{ minHeight: 0, minWidth: 0 }}
          >
            {cell ? (
              <img
                src={cell === 'X' ? `/pioneer-head.png?v=${Date.now()}` : `/shu-logo.png?v=${Date.now()}`}
                alt={cell === 'X' ? 'Pioneer Head' : 'SHU Logo'}
                className="w-[80%] h-[80%] object-contain select-none pointer-events-none animate-pulse"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(206, 17, 65, 0.6))',
                }}
              />
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
