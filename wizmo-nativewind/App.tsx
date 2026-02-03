import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { HomeScreen } from './src/screens/HomeScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';

import {
  Screen,
  QuizCategory,
  Question,
  WizmoMood,
  UserProgress,
} from './src/types';

import { getProgress, addStars, updateHighScore } from './src/services/storage';

const DEFAULT_PROGRESS: UserProgress = {
  stars: 0,
  highScores: {},
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const [wizmoMood, setWizmoMood] = useState<WizmoMood>(WizmoMood.IDLE);
  const [wizmoMessage, setWizmoMessage] = useState<string>("Hi! I'm Wizmo. Let's learn!");

  useEffect(() => {
    const loadProgress = async () => {
      const savedProgress = await getProgress();
      setProgress(savedProgress);
      setIsLoading(false);
    };
    loadProgress();
  }, []);

  const handleStartQuiz = useCallback((category: QuizCategory) => {
    setActiveCategory(category);
    setQuestions([...category.questions].sort(() => 0.5 - Math.random()));
    setCurrentQIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScreen('quiz');
    setWizmoMood(WizmoMood.HAPPY);
    setWizmoMessage(`Let's play ${category.title}!`);

    setTimeout(() => {
      setWizmoMessage("Good luck!");
      setWizmoMood(WizmoMood.IDLE);
    }, 2000);
  }, []);

  const getRandomPraise = () => {
    const praises = ["Awesome!", "Great Job!", "You got it!", "Super Smart!", "Correct!"];
    return praises[Math.floor(Math.random() * praises.length)];
  };

  const handleNextQuestion = useCallback(() => {
    setCurrentQIndex((prev) => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setWizmoMood(WizmoMood.THINKING);
    setWizmoMessage("");
    setTimeout(() => setWizmoMood(WizmoMood.IDLE), 800);
  }, []);

  const finishQuiz = useCallback(async (finalScore: number) => {
    if (!activeCategory) return;

    await updateHighScore(activeCategory.id, finalScore);
    const starsEarned = Math.floor(finalScore / 10);
    const updatedProgress = await addStars(starsEarned);

    setProgress(updatedProgress);
    setScreen('result');
    setWizmoMood(WizmoMood.HAPPY);
    setWizmoMessage(`You finished! Score: ${finalScore}`);
  }, [activeCategory]);

  const handleAnswer = useCallback((index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentQIndex];
    const isCorrect = index === currentQ.correctAnswerIndex;

    if (isCorrect) {
      setQuizScore((prev) => prev + 10);
      setWizmoMood(WizmoMood.EXCITED);
      setWizmoMessage(getRandomPraise());
    } else {
      setWizmoMood(WizmoMood.SAD);
      setWizmoMessage("Oops! Try again next time.");
    }

    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        handleNextQuestion();
      } else {
        finishQuiz(isCorrect ? quizScore + 10 : quizScore);
      }
    }, 2500);
  }, [isAnswered, questions, currentQIndex, quizScore, handleNextQuestion, finishQuiz]);

  const handleGoHome = useCallback(() => {
    setScreen('home');
    setWizmoMood(WizmoMood.IDLE);
    setWizmoMessage("Ready for another adventure?");
    setActiveCategory(null);
  }, []);

  const handleRetry = useCallback(() => {
    if (activeCategory) {
      handleStartQuiz(activeCategory);
    }
  }, [activeCategory, handleStartQuiz]);

  if (isLoading) {
    return <View style={styles.loading} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="dark" />

        {screen === 'home' && (
          <HomeScreen
            progress={progress}
            wizmoMood={wizmoMood}
            wizmoMessage={wizmoMessage}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {screen === 'quiz' && activeCategory && (
          <QuizScreen
            category={activeCategory}
            questions={questions}
            currentQIndex={currentQIndex}
            selectedOption={selectedOption}
            isAnswered={isAnswered}
            wizmoMood={wizmoMood}
            wizmoMessage={wizmoMessage}
            onAnswer={handleAnswer}
            onGoHome={handleGoHome}
          />
        )}

        {screen === 'result' && activeCategory && (
          <ResultScreen
            score={quizScore}
            category={activeCategory}
            onRetry={handleRetry}
            onGoHome={handleGoHome}
          />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
});
