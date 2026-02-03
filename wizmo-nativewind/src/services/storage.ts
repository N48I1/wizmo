import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress } from '../types';

const STORAGE_KEY = 'wizmo_quiz_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
    stars: 0,
    highScores: {},
};

export const getProgress = async (): Promise<UserProgress> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : DEFAULT_PROGRESS;
    } catch (error) {
        console.error("Failed to load progress", error);
        return DEFAULT_PROGRESS;
    }
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress", error);
    }
};

export const addStars = async (amount: number): Promise<UserProgress> => {
    const current = await getProgress();
    const updated = {
        ...current,
        stars: current.stars + amount
    };
    await saveProgress(updated);
    return updated;
};

export const updateHighScore = async (categoryId: string, score: number): Promise<UserProgress> => {
    const current = await getProgress();
    const oldScore = current.highScores[categoryId] || 0;

    if (score > oldScore) {
        const updated = {
            ...current,
            highScores: {
                ...current.highScores,
                [categoryId]: score
            }
        };
        await saveProgress(updated);
        return updated;
    }
    return current;
};
