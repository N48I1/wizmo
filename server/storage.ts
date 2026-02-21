import { db } from "./db";
import { quizResults, type QuizResult, type InsertQuizResult, type QuizCategory } from "@shared/schema";
import { eq } from "drizzle-orm";

const MOCK_QUIZZES: QuizCategory[] = [
  {
    id: "vocab-1",
    title: "Vocabulary",
    level: 1,
    description: "Learn new words!",
    icon: "BookOpen",
    questions: [
      {
        id: 1,
        question: "What does 'Happy' mean?",
        options: ["Feeling sad", "Feeling good", "Feeling angry", "Feeling tired"],
        correctAnswerIndex: 1
      },
      {
        id: 2,
        question: "Which animal says 'Meow'?",
        options: ["Dog", "Cow", "Cat", "Duck"],
        correctAnswerIndex: 2
      },
      {
        id: 3,
        question: "What is the opposite of 'Big'?",
        options: ["Large", "Huge", "Small", "Tall"],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    id: "math-1",
    title: "Numbers & Math",
    level: 1,
    description: "Count and calculate!",
    icon: "Calculator",
    questions: [
      {
        id: 1,
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswerIndex: 1
      },
      {
        id: 2,
        question: "Which number comes after 5?",
        options: ["4", "6", "7", "3"],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "How many fingers do you have on one hand?",
        options: ["4", "5", "6", "10"],
        correctAnswerIndex: 1
      }
    ]
  },
  {
    id: "colors-1",
    title: "Colors",
    level: 1,
    description: "Do you know your colors?",
    icon: "Palette",
    questions: [
      {
        id: 1,
        question: "What color is a banana?",
        options: ["Red", "Blue", "Yellow", "Green"],
        correctAnswerIndex: 2
      },
      {
        id: 2,
        question: "What color is the sky?",
        options: ["Blue", "Green", "Red", "Purple"],
        correctAnswerIndex: 0
      },
      {
        id: 3,
        question: "Mix Red and Yellow to get...",
        options: ["Green", "Purple", "Orange", "Black"],
        correctAnswerIndex: 2
      }
    ]
  },
  {
    id: "logic-1",
    title: "Logic",
    level: 1,
    description: "Think smart!",
    icon: "Puzzle",
    questions: [
      {
        id: 1,
        question: "Which one can fly?",
        options: ["Cat", "Bird", "Dog", "Fish"],
        correctAnswerIndex: 1
      },
      {
        id: 2,
        question: "Which shape is round?",
        options: ["Square", "Circle", "Triangle", "Star"],
        correctAnswerIndex: 1
      },
      {
        id: 3,
        question: "Ice cream is...",
        options: ["Hot", "Cold", "Spicy", "Salty"],
        correctAnswerIndex: 1
      }
    ]
  }
];

export interface IStorage {
  getQuizzes(): Promise<QuizCategory[]>;
  getQuiz(id: string): Promise<QuizCategory | undefined>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(): Promise<QuizResult[]>;
}

export class DatabaseStorage implements IStorage {
  async getQuizzes(): Promise<QuizCategory[]> {
    return MOCK_QUIZZES;
  }

  async getQuiz(id: string): Promise<QuizCategory | undefined> {
    return MOCK_QUIZZES.find(q => q.id === id);
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const [result] = await db!
      .insert(quizResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getQuizResults(): Promise<QuizResult[]> {
    return await db!.select().from(quizResults);
  }
}

export class MemStorage implements IStorage {
  private quizResults: QuizResult[];
  private currentId: number;

  constructor() {
    this.quizResults = [];
    this.currentId = 1;
  }

  async getQuizzes(): Promise<QuizCategory[]> {
    return MOCK_QUIZZES;
  }

  async getQuiz(id: string): Promise<QuizCategory | undefined> {
    return MOCK_QUIZZES.find((q) => q.id === id);
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = this.currentId++;
    const result: QuizResult = { ...insertResult, id };
    this.quizResults.push(result);
    return result;
  }

  async getQuizResults(): Promise<QuizResult[]> {
    return this.quizResults;
  }
}

export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
