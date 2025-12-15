const gameStateKey = "gameState";

type StoredGameState = {
  guesses: string[];
};

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const state = localStorage.getItem(gameStateKey);
  return state ? (JSON.parse(state) as StoredGameState) : null;
};

const gameStatKey = "gameStats";

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats));
};

export const loadStatsFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const stats = localStorage.getItem(gameStatKey);
  return stats ? (JSON.parse(stats) as GameStats) : null;
};

const visitedKey = "palabra_hasVisited";

export const saveVisitedToLocalStorage = () => {
  localStorage.setItem(visitedKey, "true");
};

export const loadVisitedFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem(visitedKey) === "true";
};
