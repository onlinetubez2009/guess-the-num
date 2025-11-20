import React from 'react';
import { RotateCcw, Home, Trophy, Medal } from 'lucide-react';
import { Button } from './ui/Button';
import { LeaderboardEntry } from '../lib/storage';
import { cn } from '../lib/utils';

interface GameOverScreenProps {
  stats: { score: number; wins: number; attempts: number; maxStreak: number; closeCalls: number };
  leaderboard: LeaderboardEntry[];
  currentName: string;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ 
  stats, 
  leaderboard, 
  currentName,
  onRestart, 
  onHome 
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 animate-pop h-full">
      
      <div className="text-center mb-6 relative">
        <div className="absolute inset-0 bg-violet-500 blur-[60px] opacity-20 rounded-full pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-violet-300 mb-2 uppercase tracking-widest relative z-10">Time's Up!</h2>
        <h1 className="text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] relative z-10 leading-none">
          {stats.score}
        </h1>
        
        <div className="flex gap-6 justify-center mt-4 relative z-10">
            <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Wins</span>
                <span className="text-2xl font-bold text-emerald-400">{stats.wins}</span>
            </div>
             <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Streak</span>
                <span className="text-2xl font-bold text-yellow-400">{stats.maxStreak}</span>
            </div>
             <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Close</span>
                <span className="text-2xl font-bold text-orange-400">{stats.closeCalls}</span>
            </div>
             <div className="flex flex-col">
                <span className="text-slate-400 text-xs uppercase tracking-wider font-bold">Games</span>
                <span className="text-2xl font-bold text-blue-400">{stats.attempts}</span>
            </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full h-[400px]">
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-4 justify-center order-2 md:order-1 md:col-span-1">
          <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 h-full flex flex-col justify-center">
            <p className="text-slate-400 text-center mb-6 text-sm">Great effort, <span className="text-white font-bold">{currentName}</span>!</p>
            <Button 
                onClick={onRestart} 
                variant="glow" 
                size="lg" 
                className="w-full h-16 text-xl mb-4"
            >
                <RotateCcw className="w-6 h-6 mr-3" />
                PLAY AGAIN
            </Button>
            <Button 
                onClick={onHome} 
                variant="game-btn" 
                size="lg"
                className="w-full h-14 text-lg"
            >
                <Home className="w-5 h-5 mr-3" />
                TITLE SCREEN
            </Button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden order-1 md:order-2 md:col-span-2 flex flex-col">
          <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between sticky top-0 backdrop-blur-md z-10">
             <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                    <Trophy className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white tracking-wide text-lg">Leaderboard</h3>
             </div>
             
             {/* Headers matching data columns */}
             <div className="flex items-center gap-4">
                <div className="hidden md:flex gap-4 text-xs text-slate-500 uppercase font-bold tracking-wider">
                    <span className="w-12 text-center">Wins</span>
                    <span className="w-12 text-center">Streak</span>
                    <span className="w-12 text-center">Close</span>
                    <span className="w-12 text-center">Games</span>
                </div>
                <span className="w-20 text-right text-xs text-slate-500 uppercase font-bold tracking-wider">Score</span>
             </div>
          </div>
          
          <div className="p-2 overflow-y-auto flex-1 custom-scrollbar">
            {leaderboard.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-500 italic">No scores yet. Be the first!</div>
            ) : (
                leaderboard.map((entry, idx) => (
                <div 
                    key={`${entry.name}-${entry.timestamp}`}
                    className={cn(
                    "flex items-center justify-between p-3 rounded-xl mb-1 transition-colors",
                    entry.name === currentName && entry.score === stats.score 
                        ? "bg-violet-500/20 border border-violet-500/30" 
                        : "hover:bg-white/5 border border-transparent"
                    )}
                >
                    <div className="flex items-center gap-3 flex-1">
                    <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-inner shrink-0",
                        idx === 0 ? "bg-yellow-400 text-yellow-950" : 
                        idx === 1 ? "bg-slate-300 text-slate-900" : 
                        idx === 2 ? "bg-orange-400 text-orange-950" : 
                        "bg-white/5 text-slate-500 border border-white/5"
                    )}>
                        {idx < 3 ? <Medal className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="flex flex-col">
                         <span className={cn(
                            "font-semibold truncate max-w-[100px] md:max-w-[150px]",
                            entry.name === currentName ? "text-violet-300" : "text-slate-300"
                        )}>{entry.name}</span>
                         <span className="text-[10px] text-slate-500 md:hidden">
                            W:{entry.wins} S:{entry.maxStreak} C:{entry.closeCalls}
                         </span>
                    </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex gap-4 text-sm font-mono text-slate-400">
                             <span className="w-12 text-center text-emerald-400/80">{entry.wins}</span>
                             <span className="w-12 text-center text-yellow-400/80">{entry.maxStreak}</span>
                             <span className="w-12 text-center text-orange-400/80">{entry.closeCalls || 0}</span>
                             <span className="w-12 text-center text-blue-400/80">{entry.attempts}</span>
                        </div>
                        <span className="font-mono font-black text-white text-xl w-20 text-right">{entry.score}</span>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};