// Screen types
export type Screen = 'home' | 'quiz' | 'result';

// Wizmo mood states
export enum WizmoMood {
    IDLE = 'idle',
    HAPPY = 'happy',
    SAD = 'sad',
    EXCITED = 'excited',
    THINKING = 'thinking',
}

// Quiz question
export interface Question {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
    image?: string;
}

// Quiz category
export interface QuizCategory {
    id: string;
    title: string;
    icon: string;
    color: string;
    gradientColors: [string, string];
    questions: Question[];
}

// User progress
export interface UserProgress {
    stars: number;
    highScores: Record<string, number>;
}
