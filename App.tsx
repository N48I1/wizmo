import React, { useState, useEffect } from 'react';
// @ts-ignore
import confetti from 'canvas-confetti';
import {
  Screen,
  QuizCategory,
  Question,
  WizmoMood,
  UserProgress
} from './types';
import { QUIZ_DATA } from './services/quizData';
import { getProgress, addStars, updateHighScore } from './services/storage';
import { Wizmo } from './components/Wizmo';
import { CategoryCard } from './components/CategoryCard';
import { QuizOption } from './components/QuizOption';
import { Star, ArrowLeft, RotateCcw, Home, Trophy, Volume2 } from 'lucide-react';

const App: React.FC = () => {
  // App State
  const [screen, setScreen] = useState<Screen>('home');
  const [progress, setProgress] = useState<UserProgress>(getProgress());

  // Quiz State
  const [activeCategory, setActiveCategory] = useState<QuizCategory | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Wizmo State
  const [wizmoMood, setWizmoMood] = useState<WizmoMood>(WizmoMood.IDLE);
  const [wizmoMessage, setWizmoMessage] = useState<string>("Hi! I'm Wizmo. Let's learn!");

  // --- Effects ---
  useEffect(() => {
    // Load progress on mount
    setProgress(getProgress());
  }, []);

  // --- Handlers ---

  const handleStartQuiz = (category: QuizCategory) => {
    setActiveCategory(category);
    setQuestions([...category.questions].sort(() => 0.5 - Math.random())); // Shuffle
    setCurrentQIndex(0);
    setQuizScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScreen('quiz');
    setWizmoMood(WizmoMood.HAPPY);
    setWizmoMessage(`Let's play ${category.title}!`);

    // Clear message after 2s
    setTimeout(() => {
      setWizmoMessage("Good luck!");
      setWizmoMood(WizmoMood.IDLE);
    }, 2000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#00FFFF', '#7FFF00']
    });
  };

  const triggerBigConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF69B4', '#00FFFF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#FF69B4', '#00FFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleAnswer = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    const currentQ = questions[currentQIndex];
    const isCorrect = index === currentQ.correctAnswerIndex;

    if (isCorrect) {
      setQuizScore(prev => prev + 10);
      setWizmoMood(WizmoMood.EXCITED);
      setWizmoMessage(getRandomPraise());
      triggerConfetti();
    } else {
      setWizmoMood(WizmoMood.SAD);
      setWizmoMessage("Oops! Try again next time.");
    }

    // Auto advance
    setTimeout(() => {
      if (currentQIndex < questions.length - 1) {
        handleNextQuestion();
      } else {
        finishQuiz(isCorrect ? quizScore + 10 : quizScore);
      }
    }, 2500);
  };

  const handleNextQuestion = () => {
    setCurrentQIndex(prev => prev + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setWizmoMood(WizmoMood.THINKING);
    setWizmoMessage("");
    // After a brief moment, return to idle
    setTimeout(() => setWizmoMood(WizmoMood.IDLE), 800);
  };

  const finishQuiz = (finalScore: number) => {
    if (!activeCategory) return;

    // Save data
    const newProgress = updateHighScore(activeCategory.id, finalScore);
    const starsEarned = Math.floor(finalScore / 10);
    const updatedWithStars = addStars(starsEarned);

    setProgress(updatedWithStars);
    setScreen('result');
    setWizmoMood(WizmoMood.HAPPY);
    setWizmoMessage(`You finished! Score: ${finalScore}`);

    setTimeout(() => {
      triggerBigConfetti();
    }, 500);
  };

  const handleGoHome = () => {
    setScreen('home');
    setWizmoMood(WizmoMood.IDLE);
    setWizmoMessage("Ready for another adventure?");
    setActiveCategory(null);
  };

  // --- Helpers ---
  const getRandomPraise = () => {
    const praises = ["Awesome!", "Great Job!", "You got it!", "Super Smart!", "Correct!"];
    return praises[Math.floor(Math.random() * praises.length)];
  };

  // --- Render Sections ---

  const renderHome = () => (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto p-4 md:p-6">
      {/* Glassy Header */}
      <div className="flex justify-between items-center mb-8 bg-white/40 backdrop-blur-md p-4 rounded-[2rem] shadow-lg border-2 border-white/50">
        <div className="flex items-center gap-3">
          <div className="bg-sky-500 text-white p-2 rounded-xl">
            <Trophy size={24} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Wizmo Quiz</h1>
        </div>
        <div className="flex items-center gap-2 bg-white text-yellow-500 px-5 py-2 rounded-full font-black shadow-md border-b-4 border-slate-100">
          <Star className="w-6 h-6 fill-current" />
          <span className="text-xl text-slate-700">{progress.stars}</span>
        </div>
      </div>

      {/* Wizmo Area */}
      <div className="flex-grow flex flex-col items-center justify-center mb-10 animate-float">
        <Wizmo mood={wizmoMood} message={wizmoMessage} />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 pb-8">
        {QUIZ_DATA.map((cat) => (
          <CategoryCard
            key={cat.id}
            category={cat}
            onClick={handleStartQuiz}
            highScore={progress.highScores[cat.id]}
          />
        ))}
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (!activeCategory || questions.length === 0) return null;
    const currentQ = questions[currentQIndex];
    const progressPercent = ((currentQIndex) / questions.length) * 100;

    return (
      <div className="flex flex-col min-h-screen max-w-5xl mx-auto p-3 md:p-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-2 md:mb-8">
          <button
            onClick={handleGoHome}
            className="p-2 md:p-3 rounded-2xl bg-white/80 hover:bg-white text-slate-600 shadow-md border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 transition-all"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex-1 mx-3 md:mx-4 h-3 md:h-6 bg-white/50 rounded-full overflow-hidden shadow-inner p-1">
            <div
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>

          <div className="font-black text-slate-700 bg-white/60 px-3 py-1 md:px-4 md:py-2 rounded-xl text-sm md:text-base">
            {currentQIndex + 1} / {questions.length}
          </div>
        </div>

        {/* Content Area - Side by Side on Tablet+, Stacked Compact on Mobile */}
        <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-0 md:gap-12">

          {/* Wizmo Side (Left/Top) */}
          <div className="flex-shrink-0 relative mt-0 -mb-12 md:mb-0 md:mt-20 z-20 pointer-events-none">
            <Wizmo
              mood={wizmoMood}
              message={wizmoMessage}
              className="w-44 h-44 md:w-80 md:h-80"
            />
          </div>

          {/* Question Side (Right/Bottom) */}
          <div className="w-full flex-1 max-w-2xl z-10">
            {/* Question Card */}
            <div className="w-full bg-white/90 backdrop-blur-md rounded-[2rem] pt-14 p-5 md:p-8 shadow-2xl border-4 border-white mb-4 md:mb-6">
              {currentQ.image && (
                <div className="mb-4 md:mb-6 rounded-2xl overflow-hidden shadow-md border-4 border-sky-100 rotate-1 hover:rotate-0 transition-transform">
                  <img src={currentQ.image} alt="Question" className="w-full h-32 md:h-56 object-cover" />
                </div>
              )}
              <h2 className="text-lg md:text-3xl font-black text-slate-800 text-center leading-tight">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="flex-col space-y-3 pb-8">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isRevealed = isAnswered;
                const isCorrect = isRevealed && idx === currentQ.correctAnswerIndex;
                const isWrong = isRevealed && isSelected && idx !== currentQ.correctAnswerIndex;

                return (
                  <QuizOption
                    key={idx}
                    index={idx}
                    text={opt}
                    isDisabled={isAnswered}
                    isSelected={isSelected}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
                    onSelect={handleAnswer}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const starsEarned = Math.floor(quizScore / 10);

    return (
      <div className="flex flex-col min-h-screen items-center justify-center p-6">
        <Wizmo mood={WizmoMood.EXCITED} message="WOW! Amazing!" className="scale-125 mb-8" />

        <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-md text-center animate-fade-in-up border-4 border-white">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-purple-500 mb-2">Quiz Complete!</h2>
          <p className="text-slate-500 mb-8 font-medium text-lg">You are getting smarter every day!</p>

          <div className="flex justify-center gap-2 mb-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative">
                <Star
                  className={`w-16 h-16 ${i < starsEarned ? 'fill-yellow-400 text-yellow-500 animate-bounce' : 'fill-slate-200 text-slate-300'} filter drop-shadow-md`}
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              </div>
            ))}
          </div>

          <div className="bg-slate-100 rounded-3xl p-6 mb-8">
            <div className="text-sm text-slate-400 uppercase font-bold tracking-wider mb-1">Total Score</div>
            <div className="text-6xl font-black text-slate-800">
              {quizScore}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleStartQuiz(activeCategory!)}
              className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold py-4 rounded-2xl shadow-[0_4px_0_rgb(14,116,144)] active:shadow-none active:translate-y-[4px] transition-all"
            >
              <RotateCcw className="w-5 h-5" /> Retry
            </button>
            <button
              onClick={handleGoHome}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 rounded-2xl shadow-[0_4px_0_rgb(4,120,87)] active:shadow-none active:translate-y-[4px] transition-all"
            >
              <Home className="w-5 h-5" /> Home
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-slate-800 selection:bg-pink-200">
      {screen === 'home' && renderHome()}
      {screen === 'quiz' && renderQuiz()}
      {screen === 'result' && renderResult()}
    </div>
  );
};

export default App;