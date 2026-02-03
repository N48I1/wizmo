export enum CategoryId {
  VOCABULARY = 'vocabulary',
  NUMBERS = 'numbers',
  COLORS = 'colors',
  LOGIC = 'logic',
  MIXED = 'mixed'
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  image?: string; // Optional local image reference
}

export interface QuizCategory {
  id: CategoryId;
  title: string;
  icon: string; // Emoji or Lucide icon name
  color: string; // Tailwind color class stub (e.g. 'blue')
  questions: Question[];
}

export interface UserProgress {
  stars: number;
  completedLevels: number;
  highScores: Record<string, number>; // CategoryId -> Score
}

export enum WizmoMood {
  IDLE = 'idle',
  HAPPY = 'happy',
  THINKING = 'thinking',
  SAD = 'sad',
  EXCITED = 'excited'
}

export type Screen = 'home' | 'quiz' | 'result';