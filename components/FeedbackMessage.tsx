import React from 'react';
import { cn } from '../lib/utils';

interface FeedbackMessageProps {
  status: 'idle' | 'won' | 'lost';
  targetNumber: number | null;
  userResult: number | null;
}

export const FeedbackMessage: React.FC<FeedbackMessageProps> = ({ status, targetNumber, userResult }) => {
  if (status === 'idle') {
    return (
      <div className="text-center h-24 flex flex-col items-center justify-center animate-pop">
        <div className="w-20 h-20 bg-white/5 border-2 border-white/10 rounded-2xl flex items-center justify-center text-4xl font-bold text-white/20">
          ?
        </div>
      </div>
    );
  }

  return (
    <div className="text-center h-24 flex flex-col items-center justify-center animate-pop">
      <div className={cn(
        "w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-2xl mb-2",
        status === 'won' ? "bg-emerald-500 text-white shadow-emerald-500/50" : "bg-rose-500 text-white shadow-rose-500/50"
      )}>
        {targetNumber}
      </div>
      <p className={cn(
        "text-sm font-bold uppercase tracking-widest",
        status === 'won' ? "text-emerald-400" : "text-rose-400"
      )}>
        {status === 'won' ? 'Correct!' : `You calculated ${userResult}`}
      </p>
    </div>
  );
};