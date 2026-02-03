import { UserProgress } from '../types';

const STORAGE_KEY = 'wizmo_quiz_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  stars: 0,
  completedLevels: 0,
  highScores: {},
};

export const getProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : DEFAULT_PROGRESS;
  } catch (error) {
    console.error("Failed to load progress", error);
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress", error);
  }
};

export const addStars = (amount: number): UserProgress => {
  const current = getProgress();
  const updated = {
    ...current,
    stars: current.stars + amount
  };
  saveProgress(updated);
  return updated;
};

export const updateHighScore = (categoryId: string, score: number): UserProgress => {
  const current = getProgress();
  const oldScore = current.highScores[categoryId] || 0;
  
  if (score > oldScore) {
    const updated = {
      ...current,
      highScores: {
        ...current.highScores,
        [categoryId]: score
      }
    };
    saveProgress(updated);
    return updated;
  }
  return current;
};