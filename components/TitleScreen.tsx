import React, { useState } from 'react';
import { Play, HelpCircle, Brain, Calculator, Trophy, Medal } from 'lucide-react';
import { Button } from './ui/Button';
import { LeaderboardEntry } from '../lib/storage';
import { cn } from '../lib/utils';

interface TitleScreenProps {
  onStart: (name: string) => void;
  leaderboard: LeaderboardEntry[];
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, leaderboard }) => {
  const [name, setName] = useState('');
  const [activeTab, setActiveTab] = useState<'tutorial' | 'leaderboard'>('tutorial');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) onStart(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 animate-slide-up h-full">
      
      {/* Hero Title */}
      <div className="text-center mb-8 relative shrink-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px] -z-10" />
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white via-violet-200 to-violet-400 drop-shadow-[0_0_30px_rgba(139,92,246,0.4)]">
          GUESS THAT NUM
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-violet-200 text-sm font-medium">
          <Brain className="w-4 h-4" />
          <span>Speed Math Challenge</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl h-full max-h-[500px]">
        
        {/* Left Panel: Tabs (Tutorial / Leaderboard) */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/5 flex flex-col overflow-hidden">
          
          {/* Tab Switcher */}
          <div className="flex p-2 gap-2 border-b border-white/5">
            <button
              onClick={() => setActiveTab('tutorial')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === 'tutorial' 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              )}
            >
              <HelpCircle className="w-4 h-4" />
              HOW TO PLAY
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === 'leaderboard' 
                  ? "bg-white/10 text-white shadow-lg" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              )}
            >
              <Trophy className="w-4 h-4" />
              LEADERBOARD
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative">
            {activeTab === 'tutorial' ? (
              <div className="space-y-5 animate-pop">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30 shrink-0">1</div>
                  <div>
                    <p className="font-bold text-white">15 Second Timer</p>
                    <p className="text-sm text-slate-400 mt-1">Solve as many puzzles as possible. Every guess counts!</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30 shrink-0">2</div>
                  <div>
                    <p className="font-bold text-white">Scoring Rules</p>
                    <ul className="text-sm text-slate-400 mt-1 space-y-1">
                      <li className="flex justify-between"><span className="text-emerald-400">Exact Match</span> <span>+100 pts</span></li>
                      <li className="flex justify-between"><span className="text-yellow-400">±1 Difference</span> <span>+50 pts</span></li>
                      <li className="flex justify-between"><span className="text-orange-400">±2 Difference</span> <span>+20 pts</span></li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30 shrink-0">3</div>
                  <div>
                    <p className="font-bold text-white">Mechanics</p>
                    <p className="text-sm text-slate-400 mt-1">Use numbers 1-3 and +/-. Results are always absolute (positive).</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 animate-pop">
                {leaderboard.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 italic">
                    No champions yet.<br/>Be the first!
                  </div>
                ) : (
                  leaderboard.map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                          idx === 0 ? "bg-yellow-400 text-yellow-900" : 
                          idx === 1 ? "bg-slate-300 text-slate-900" : 
                          idx === 2 ? "bg-orange-400 text-orange-900" : 
                          "bg-white/10 text-slate-400"
                        )}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white truncate max-w-[100px]">{entry.name}</p>
                          <p className="text-[10px] text-slate-400 uppercase">{entry.wins} Wins • {entry.maxStreak} Streak</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-emerald-400">{entry.score}</p>
                        <p className="text-[10px] text-slate-500">{entry.attempts} Games</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl ring-1 ring-white/5 flex flex-col justify-center h-full">
          <div className="mb-8 text-center md:text-left">
             <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center mb-4 text-violet-400 mx-auto md:mx-0">
                <Calculator className="w-6 h-6" />
             </div>
             <h2 className="text-2xl font-bold text-white">New Game</h2>
             <p className="text-slate-400 text-sm">Enter your name to start the challenge.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-wider">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name..."
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                maxLength={12}
                autoFocus
              />
            </div>
            
            <Button 
              type="submit" 
              variant="glow" 
              size="lg" 
              className="w-full py-5 text-lg shadow-xl"
              disabled={!name.trim()}
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              START GAME
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
};