import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { GameStats } from './GuessLog';
import { FeedbackMessage } from './FeedbackMessage';
import { GameControls } from './GuessInput';
import { Button } from './ui/Button';
import { cn } from '../lib/utils';

interface GameScreenProps {
  onGameOver: (stats: { score: number; wins: number; attempts: number; maxStreak: number; closeCalls: number }) => void;
}

const GAME_DURATION = 15; // seconds

const generateTarget = () => {
  const operands = [1, 2, 3];
  const outcomes = new Set<number>();
  operands.forEach(a => {
    operands.forEach(b => {
      outcomes.add(a + b);
      outcomes.add(Math.abs(a - b));
    });
  });
  const possibleTargets = Array.from(outcomes);
  return possibleTargets[Math.floor(Math.random() * possibleTargets.length)];
};

export const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  
  // Stats
  const [score, setScore] = useState(0);
  const [wins, setWins] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [closeCalls, setCloseCalls] = useState(0);

  // Game State
  const [targetNumber, setTargetNumber] = useState<number>(generateTarget());
  const [leftOp, setLeftOp] = useState<number | null>(null);
  const [operator, setOperator] = useState<'+' | '-' | null>(null);
  const [rightOp, setRightOp] = useState<number | null>(null);
  
  const [lastResultStatus, setLastResultStatus] = useState<'idle' | 'won' | 'partial' | 'lost'>('idle');
  const [lastPointsEarned, setLastPointsEarned] = useState(0);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => onGameOver({ score, wins, attempts, maxStreak, closeCalls }), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score, wins, attempts, maxStreak, closeCalls, onGameOver]);

  const handleGuess = () => {
    if (leftOp === null || operator === null || rightOp === null) return;

    setAttempts(prev => prev + 1);

    let calculated = 0;
    if (operator === '+') calculated = leftOp + rightOp;
    if (operator === '-') calculated = leftOp - rightOp;
    calculated = Math.abs(calculated);

    const diff = Math.abs(calculated - targetNumber);
    let points = 0;

    if (diff === 0) {
      points = 100;
      setWins(prev => prev + 1);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setLastResultStatus('won');
      triggerConfetti();
    } else if (diff === 1) {
      points = 50;
      setCloseCalls(prev => prev + 1);
      setCurrentStreak(0);
      setLastResultStatus('partial');
    } else if (diff === 2) {
      points = 20;
      setCloseCalls(prev => prev + 1);
      setCurrentStreak(0);
      setLastResultStatus('partial');
    } else {
      points = 0;
      setCurrentStreak(0);
      setLastResultStatus('lost');
    }

    setScore(prev => prev + points);
    setLastPointsEarned(points);

    // Always reset and new target after a submission to keep flow
    setTimeout(() => {
      setTargetNumber(generateTarget());
      setLeftOp(null);
      setOperator(null);
      setRightOp(null);
      setLastResultStatus('idle');
      setLastPointsEarned(0);
    }, 500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#a78bfa', '#34d399', '#fbbf24'],
      disableForReducedMotion: true,
      zIndex: 100
    });
  };

  const isFormComplete = leftOp !== null && operator !== null && rightOp !== null;
  const currentUserResult = (leftOp !== null && rightOp !== null && operator)
    ? Math.abs(operator === '+' ? leftOp + rightOp : leftOp - rightOp)
    : null;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-10 h-full animate-slide-up p-4">
      
      {/* Left Panel - Target & Feedback */}
      <div className="w-full md:w-[35%] flex flex-col items-center justify-center">
        <GameStats timeLeft={timeLeft} score={score} />
        
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl w-full aspect-square flex flex-col items-center justify-center relative overflow-hidden ring-1 ring-white/5">
           <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent pointer-events-none"></div>
           <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-6">Target Number</h3>
           
           <div className="relative">
             <div className="scale-125 transform transition-all duration-300">
                <FeedbackMessage 
                  status={lastResultStatus === 'partial' ? 'won' : lastResultStatus === 'idle' ? 'idle' : lastResultStatus} 
                  targetNumber={targetNumber} 
                  userResult={currentUserResult}
                />
             </div>
             {lastPointsEarned > 0 && (
               <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 text-2xl font-black text-yellow-400 animate-pop drop-shadow-lg whitespace-nowrap">
                 +{lastPointsEarned} pts
               </div>
             )}
           </div>
           
           <div className="mt-8 flex gap-4 text-xs font-mono text-slate-500">
             <span>Streak: <strong className="text-white">{currentStreak}</strong></span>
             <span>Wins: <strong className="text-white">{wins}</strong></span>
           </div>
        </div>
      </div>

      {/* Right Panel - Controls */}
      <div className="w-full md:w-[65%] flex flex-col justify-center">
        <div className="bg-slate-900/40 backdrop-blur-lg rounded-3xl p-6 md:p-10 border border-white/5 shadow-xl h-full flex flex-col justify-center">
            <div className="flex-1 flex items-center">
                <GameControls 
                    leftOperand={leftOp}
                    operator={operator}
                    rightOperand={rightOp}
                    onSelectLeft={setLeftOp}
                    onSelectOperator={setOperator}
                    onSelectRight={setRightOp}
                    disabled={lastResultStatus !== 'idle'}
                />
            </div>
            
            <div className="mt-6 md:mt-8">
                <Button 
                    onClick={handleGuess}
                    disabled={!isFormComplete || lastResultStatus !== 'idle'}
                    variant={isFormComplete ? 'glow' : 'game-btn'}
                    size="lg"
                    className={cn(
                        "w-full py-4 text-xl shadow-xl transition-all",
                        isFormComplete ? "animate-pulse hover:animate-none" : ""
                    )}
                >
                    SUBMIT
                </Button>
            </div>
        </div>
      </div>

    </div>
  );
};