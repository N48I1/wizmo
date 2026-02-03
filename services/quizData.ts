import { CategoryId, QuizCategory } from '../types';

// In a real app, this would be loaded from separate .json files
// For this MVP, we bundle it here as requested.

export const QUIZ_DATA: QuizCategory[] = [
  {
    id: CategoryId.VOCABULARY,
    title: 'Words',
    icon: '📚',
    color: 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-200',
    questions: [
      {
        id: 1,
        question: "What does the word 'Gigantic' mean?",
        options: ["Very small", "Very big", "Red color", "Tasty food"],
        correctAnswerIndex: 1,
      },
      {
        id: 2,
        question: "Which word is a fruit?",
        options: ["Carrot", "Potato", "Apple", "Broccoli"],
        correctAnswerIndex: 2,
        image: "https://picsum.photos/seed/apple/400/300" 
      },
      {
        id: 3,
        question: "What is the opposite of 'Fast'?",
        options: ["Quick", "Slow", "Run", "Jump"],
        correctAnswerIndex: 1,
      }
    ]
  },
  {
    id: CategoryId.NUMBERS,
    title: 'Numbers',
    icon: '🔢',
    color: 'bg-gradient-to-br from-blue-400 to-indigo-500 shadow-blue-200',
    questions: [
      {
        id: 1,
        question: "What is 5 + 3?",
        options: ["6", "7", "8", "9"],
        correctAnswerIndex: 2,
      },
      {
        id: 2,
        question: "Which number is the biggest?",
        options: ["10", "50", "2", "99"],
        correctAnswerIndex: 3,
      },
      {
        id: 3,
        question: "How many sides does a triangle have?",
        options: ["3", "4", "5", "6"],
        correctAnswerIndex: 0,
        image: "https://picsum.photos/seed/triangle/400/300"
      }
    ]
  },
  {
    id: CategoryId.COLORS,
    title: 'Colors',
    icon: '🎨',
    color: 'bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-purple-200',
    questions: [
      {
        id: 1,
        question: "What color is the sky usually?",
        options: ["Green", "Blue", "Red", "Yellow"],
        correctAnswerIndex: 1,
      },
      {
        id: 2,
        question: "Mix Red and Yellow. What do you get?",
        options: ["Purple", "Green", "Orange", "Black"],
        correctAnswerIndex: 2,
      },
      {
        id: 3,
        question: "Which of these is typically Green?",
        options: ["Grass", "Sun", "Ocean", "Strawberry"],
        correctAnswerIndex: 0,
        image: "https://picsum.photos/seed/grass/400/300"
      }
    ]
  },
  {
    id: CategoryId.LOGIC,
    title: 'Logic',
    icon: '🧩',
    color: 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-orange-200',
    questions: [
      {
        id: 1,
        question: "A dog has puppies. A cat has...?",
        options: ["Calves", "Chicks", "Kittens", "Ducklings"],
        correctAnswerIndex: 2,
      },
      {
        id: 2,
        question: "Which object does not belong?",
        options: ["Car", "Bus", "Bike", "Banana"],
        correctAnswerIndex: 3,
      },
      {
        id: 3,
        question: "It is raining. What do you need?",
        options: ["Sunglasses", "Umbrella", "Sunscreen", "Ice cream"],
        correctAnswerIndex: 1,
      }
    ]
  }
];