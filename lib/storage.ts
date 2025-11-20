export interface LeaderboardEntry {
  name: string;
  score: number;
  wins: number;      // Exact matches (100 pts)
  attempts: number;  // Total submissions
  maxStreak: number; // Highest streak of exact matches
  closeCalls: number; // Partial matches (+50 or +20 pts)
  timestamp: number;
}

const STORAGE_KEY = 'guess-that-num-leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

export const saveScore = (
  name: string, 
  score: number, 
  wins: number, 
  attempts: number, 
  maxStreak: number,
  closeCalls: number
) => {
  const current = getLeaderboard();
  const newEntry: LeaderboardEntry = { 
    name, 
    score, 
    wins, 
    attempts, 
    maxStreak, 
    closeCalls,
    timestamp: Date.now() 
  };
  
  // Add new score, sort by score descending, keep top 10
  const updated = [...current, newEntry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
    
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};