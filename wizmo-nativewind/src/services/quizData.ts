import { QuizCategory } from '../types';

// Quiz category IDs
export enum CategoryId {
    VOCABULARY = 'vocabulary',
    NUMBERS = 'numbers',
    COLORS = 'colors',
    ANIMALS = 'animals',
}

export const QUIZ_DATA: QuizCategory[] = [
    {
        id: CategoryId.VOCABULARY,
        title: 'Words',
        icon: '📚',
        color: '#10B981',
        gradientColors: ['#6EE7B7', '#10B981'],
        questions: [
            {
                id: '1',
                question: "What does 'Gigantic' mean?",
                options: ["Very small", "Very big", "Red color", "Tasty food"],
                correctAnswerIndex: 1,
            },
            {
                id: '2',
                question: "Which word is a fruit?",
                options: ["Carrot", "Potato", "Apple", "Broccoli"],
                correctAnswerIndex: 2,
            },
            {
                id: '3',
                question: "What is the opposite of 'Fast'?",
                options: ["Quick", "Slow", "Run", "Jump"],
                correctAnswerIndex: 1,
            },
            {
                id: '4',
                question: "Which word means 'happy'?",
                options: ["Sad", "Angry", "Joyful", "Tired"],
                correctAnswerIndex: 2,
            },
            {
                id: '5',
                question: "What do we call a baby dog?",
                options: ["Kitten", "Puppy", "Cub", "Chick"],
                correctAnswerIndex: 1,
            },
        ]
    },
    {
        id: CategoryId.NUMBERS,
        title: 'Numbers',
        icon: '🔢',
        color: '#3B82F6',
        gradientColors: ['#93C5FD', '#3B82F6'],
        questions: [
            {
                id: '1',
                question: "What is 5 + 3?",
                options: ["6", "7", "8", "9"],
                correctAnswerIndex: 2,
            },
            {
                id: '2',
                question: "Which number is the biggest?",
                options: ["10", "50", "2", "99"],
                correctAnswerIndex: 3,
            },
            {
                id: '3',
                question: "How many sides does a triangle have?",
                options: ["3", "4", "5", "6"],
                correctAnswerIndex: 0,
            },
            {
                id: '4',
                question: "What is 10 - 4?",
                options: ["5", "6", "7", "4"],
                correctAnswerIndex: 1,
            },
            {
                id: '5',
                question: "Count: 🍎🍎🍎🍎🍎",
                options: ["3", "4", "5", "6"],
                correctAnswerIndex: 2,
            },
        ]
    },
    {
        id: CategoryId.COLORS,
        title: 'Colors',
        icon: '🎨',
        color: '#A855F7',
        gradientColors: ['#D8B4FE', '#A855F7'],
        questions: [
            {
                id: '1',
                question: "What color is the sky?",
                options: ["Green", "Blue", "Red", "Yellow"],
                correctAnswerIndex: 1,
            },
            {
                id: '2',
                question: "Mix Red + Yellow = ?",
                options: ["Purple", "Green", "Orange", "Black"],
                correctAnswerIndex: 2,
            },
            {
                id: '3',
                question: "What color is grass?",
                options: ["Green", "Blue", "Pink", "Red"],
                correctAnswerIndex: 0,
            },
            {
                id: '4',
                question: "What color is a banana?",
                options: ["Red", "Blue", "Yellow", "Purple"],
                correctAnswerIndex: 2,
            },
            {
                id: '5',
                question: "Mix Blue + Yellow = ?",
                options: ["Orange", "Green", "Purple", "Pink"],
                correctAnswerIndex: 1,
            },
        ]
    },
    {
        id: CategoryId.ANIMALS,
        title: 'Animals',
        icon: '🦁',
        color: '#F59E0B',
        gradientColors: ['#FCD34D', '#F59E0B'],
        questions: [
            {
                id: '1',
                question: "Which animal says 'Moo'?",
                options: ["Dog", "Cow", "Cat", "Bird"],
                correctAnswerIndex: 1,
            },
            {
                id: '2',
                question: "Which animal has a trunk?",
                options: ["Lion", "Elephant", "Giraffe", "Zebra"],
                correctAnswerIndex: 1,
            },
            {
                id: '3',
                question: "Which animal can fly?",
                options: ["Fish", "Dog", "Bird", "Cat"],
                correctAnswerIndex: 2,
            },
            {
                id: '4',
                question: "What does a caterpillar become?",
                options: ["Fish", "Butterfly", "Spider", "Ant"],
                correctAnswerIndex: 1,
            },
            {
                id: '5',
                question: "Which animal lives in water?",
                options: ["Lion", "Eagle", "Fish", "Monkey"],
                correctAnswerIndex: 2,
            },
        ]
    }
];
