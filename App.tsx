import React, { useState, useEffect } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { getLeaderboard, saveScore, LeaderboardEntry } from './lib/storage';

type AppState = 'title' | 'playing' | 'gameover';

function App() {
  const [gameState, setGameState] = useState<AppState>('title');
  const [playerName, setPlayerName] = useState('');
  
  // Current run stats
  const [gameStats, setGameStats] = useState({
    score: 0,
    wins: 0,
    attempts: 0,
    maxStreak: 0,
    closeCalls: 0
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    setGameStats({ score: 0, wins: 0, attempts: 0, maxStreak: 0, closeCalls: 0 });
    setGameState('playing');
  };

  const handleGameOver = (stats: { score: number; wins: number; attempts: number; maxStreak: number; closeCalls: number }) => {
    setGameStats(stats);
    const updated = saveScore(playerName, stats.score, stats.wins, stats.attempts, stats.maxStreak, stats.closeCalls);
    setLeaderboard(updated);
    setGameState('gameover');
  };

  const handleRestart = () => {
    setGameStats({ score: 0, wins: 0, attempts: 0, maxStreak: 0, closeCalls: 0 });
    setGameState('playing');
  };

  const handleHome = () => {
    setGameState('title');
    setGameStats({ score: 0, wins: 0, attempts: 0, maxStreak: 0, closeCalls: 0 });
    setPlayerName('');
  };

  return (
    <div className="min-h-screen h-[100dvh] w-screen overflow-hidden bg-[#0f172a] font-sans text-white selection:bg-violet-500/30 relative flex flex-col">
      
      {/* Animated Ambient Background */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse animation-delay-2000 opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 w-full h-full">
        <div className="w-full max-w-[1400px] mx-auto h-full flex flex-col justify-center">
            {gameState === 'title' && (
            <TitleScreen onStart={handleStartGame} leaderboard={leaderboard} />
            )}

            {gameState === 'playing' && (
            <GameScreen onGameOver={handleGameOver} />
            )}

            {gameState === 'gameover' && (
            <GameOverScreen 
                stats={gameStats} 
                leaderboard={leaderboard} 
                currentName={playerName}
                onRestart={handleRestart}
                onHome={handleHome}
            />
            )}
        </div>
      </main>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default App;