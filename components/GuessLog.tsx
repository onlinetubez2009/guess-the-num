import React from 'react';
import { Timer, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

interface GameStatsProps {
  timeLeft: number;
  score: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ timeLeft, score }) => {
  const isLowTime = timeLeft <= 5;

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8 mb-6 w-full">
      {/* Timer */}
      <div className={cn(
        "flex flex-col items-center justify-center p-3 md:p-4 w-28 md:w-36 rounded-2xl border backdrop-blur-md transition-all duration-300",
        isLowTime 
          ? "bg-red-500/20 border-red-500/50 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.2)]" 
          : "bg-white/5 border-white/10"
      )}>
        <div className={cn("flex items-center gap-2 mb-1", isLowTime ? "text-red-300" : "text-blue-300")}>
          <Timer className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Time</span>
        </div>
        <span className={cn("text-3xl md:text-4xl font-black font-mono tabular-nums", isLowTime ? "text-red-100" : "text-white")}>
          {timeLeft}
        </span>
      </div>

      {/* Score */}
      <div className="flex flex-col items-center justify-center p-3 md:p-4 w-28 md:w-36 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-2 text-yellow-400 mb-1">
          <Trophy className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Score</span>
        </div>
        <span className="text-3xl md:text-4xl font-black text-white tabular-nums">{score}</span>
      </div>
    </div>
  );
};