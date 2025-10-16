import { useState, useEffect } from 'react';
import type { CollegeFact } from '../types';

interface FactsDisplayProps {
  facts: CollegeFact[];
}

export default function FactsDisplay({ facts }: FactsDisplayProps) {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    if (facts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 10000); // Change fact every 10 seconds
    return () => clearInterval(interval);
  }, [facts]);

  return (
    <div className="bg-gradient-to-br from-shu-darkgrey/80 to-shu-black/90 backdrop-blur-sm rounded-[0.8vw] p-[1.5vh] border-[0.3vmin] border-shu-red shadow-2xl shadow-shu-red/30 h-full flex flex-col">
      <h3 className="text-responsive-xl font-black text-shu-red mb-[1vh] text-center border-b-[0.2vmin] border-shu-red pb-[1vh] text-shadow-glow px-[0.5vw]">
        Did You Know?
      </h3>
      <div className="flex-1 flex items-center justify-center p-[1vh]">
        {facts.length > 0 ? (
          <div className="space-y-[1vh]">
            <p className="text-responsive-sm text-white leading-relaxed text-center font-semibold">
              {facts[currentFactIndex]?.fact}
            </p>
            <div className="flex justify-center gap-[0.3vw]">
              {facts.map((_, index) => (
                <div
                  key={index}
                  className={`h-[0.3vw] rounded-full transition-all duration-300 ${
                    index === currentFactIndex
                      ? 'bg-shu-red w-[1vw] shadow-lg shadow-shu-red/60'
                      : 'bg-shu-grey/50 w-[0.3vw]'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-responsive-sm text-shu-grey text-center">Loading facts...</p>
        )}
      </div>
    </div>
  );
}
