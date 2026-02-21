import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuiz, useCreateQuizResult } from "@/hooks/use-quizzes";
import { useSoundEffects } from "@/hooks/use-sounds";
import { WizmoCharacter } from "@/components/WizmoCharacter";
import { BigButton } from "@/components/BigButton";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Home, Star, RefreshCcw } from "lucide-react";
import confetti from "canvas-confetti";

export default function Quiz() {
  const [, params] = useRoute("/quiz/:id");
  const [, setLocation] = useLocation();
  const quizId = params?.id || "";
  
  const { data: quiz, isLoading, error } = useQuiz(quizId);
  const createResult = useCreateQuizResult();
  const { playSound } = useSoundEffects();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<"intro" | "playing" | "finished">("intro");

  // Reset state when quiz changes
  useEffect(() => {
    if (quiz) {
      setGameStatus("intro");
      setCurrentQIndex(0);
      setScore(0);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  }, [quiz?.id]);

  if (isLoading) return <div className="min-h-screen bg-blue-50 flex items-center justify-center"><WizmoCharacter mood="thinking" /></div>;
  if (error || !quiz) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-red-500">Quiz not found!</div>;

  const currentQuestion = quiz.questions[currentQIndex];
  const progress = ((currentQIndex) / quiz.questions.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      playSound('correct');
      setScore(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      playSound('incorrect');
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);
    setIsCorrect(null);
    
    if (currentQIndex < quiz.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setGameStatus("finished");
    const stars = score === quiz.questions.length ? 3 : score > quiz.questions.length / 2 ? 2 : 1;
    
    // Fire huge confetti
    if (stars === 3) {
      const duration = 3000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    }

    createResult.mutate({
      category: quiz.title,
      score,
      totalQuestions: quiz.questions.length,
      stars,
      completedAt: new Date().toISOString()
    });
  };

  // --- RENDERING SUB-COMPONENTS ---

  if (gameStatus === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl border-8 border-white/20"
        >
          <div className="mb-6 relative inline-block">
            <div className="absolute inset-0 bg-yellow-300 rounded-full blur-2xl opacity-50" />
            <WizmoCharacter mood="happy" size="md" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-blue-600 mb-2">{quiz.title}</h1>
          <p className="text-lg text-gray-500 font-medium mb-6 max-w-md mx-auto">{quiz.description}</p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BigButton variant="neutral" onClick={() => setLocation("/")} className="w-full sm:w-auto">
              <Home className="w-4 h-4" /> Back
            </BigButton>
            <BigButton variant="success" onClick={() => setGameStatus("playing")} className="w-full sm:w-auto">
              Start Quiz <ArrowRight className="w-5 h-5" />
            </BigButton>
          </div>
        </motion.div>
      </div>
    );
  }

  if (gameStatus === "finished") {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const stars = score === quiz.questions.length ? 3 : score > quiz.questions.length / 2 ? 2 : 1;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl relative overflow-hidden"
        >
          {/* Confetti Background in card */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/confetti.png')] opacity-10" />

          <WizmoCharacter mood="celebrating" size="md" className="mx-auto mb-4" />
          
          <h2 className="text-3xl font-display font-bold text-gray-800 mb-1">
            {stars === 3 ? "Amazing Job!" : stars === 2 ? "Great Work!" : "Good Try!"}
          </h2>
          <p className="text-gray-500 font-medium text-base mb-6">You finished the {quiz.title} quiz!</p>
          
          <div className="flex justify-center gap-3 mb-6">
            {[1, 2, 3].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: star <= stars ? 1 : 0.8, rotate: 0 }}
                transition={{ delay: star * 0.2, type: "spring" }}
              >
                <Star 
                  size={48} 
                  className={star <= stars ? "fill-yellow-400 text-yellow-500" : "fill-gray-200 text-gray-300"} 
                  strokeWidth={3}
                />
              </motion.div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6 inline-block w-full">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Your Score</div>
            <div className="text-4xl font-display font-black text-blue-600">{score}/{quiz.questions.length}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <BigButton variant="secondary" size="default" onClick={() => window.location.reload()}>
              <RefreshCcw className="w-4 h-4" /> Play Again
            </BigButton>
            <BigButton variant="primary" size="default" onClick={() => setLocation("/")}>
              <Home className="w-4 h-4" /> Home
            </BigButton>
          </div>
        </motion.div>
      </div>
    );
  }

  // PLAYING STATE
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col font-body overflow-hidden">
      {/* Top Bar */}
      <div className="bg-white border-b-2 border-gray-100 p-4 sticky top-0 z-20 shadow-sm shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setLocation("/")}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <X className="text-gray-400 w-8 h-8" />
          </button>
          
          <div className="flex-1 mx-8">
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="font-display font-bold text-xl text-blue-500">
            {currentQIndex + 1}/{quiz.questions.length}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col overflow-hidden">
        {/* Question Card */}
        <div className="flex flex-col gap-4 mb-6 shrink-0 text-center">
          <div className="flex justify-center">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-bold">
              Question {currentQIndex + 1}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 leading-tight">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => {
              let variant: "neutral" | "success" | "danger" = "neutral";
              
              if (showFeedback) {
                if (idx === currentQuestion.correctAnswerIndex) variant = "success";
                else if (idx === selectedOption) variant = "danger";
              }

              return (
                <BigButton
                  key={idx}
                  variant={variant}
                  disabled={showFeedback}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full justify-between h-auto py-4 px-5 text-left ${showFeedback && idx !== currentQuestion.correctAnswerIndex && idx !== selectedOption ? 'opacity-50' : ''}`}
                >
                  <span className="text-lg font-bold">{option}</span>
                  {variant === "success" && <Check className="w-5 h-5 shrink-0" />}
                  {variant === "danger" && <X className="w-5 h-5 shrink-0" />}
                </BigButton>
              );
            })}
          </div>
        </div>

        {/* Wizmo Feedback Mascot */}
        <div className="absolute bottom-4 right-4 pointer-events-none hidden sm:block">
           <WizmoCharacter mood={showFeedback ? (isCorrect ? "happy" : "thinking") : "neutral"} size="sm" />
        </div>

        {/* Feedback Bar (Fixed Bottom) */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className={`fixed bottom-0 left-0 right-0 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 ${isCorrect ? 'bg-green-100 border-t-4 border-green-300' : 'bg-red-100 border-t-4 border-red-300'}`}
            >
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-400' : 'bg-red-400'}`}>
                    {isCorrect ? <Check className="text-white w-8 h-8" /> : <X className="text-white w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-display font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? 'Awesome!' : 'Oops, not quite!'}
                    </h3>
                    {!isCorrect && <p className="text-red-600 font-medium">The correct answer was {currentQuestion.options[currentQuestion.correctAnswerIndex]}</p>}
                  </div>
                </div>
                
                <BigButton 
                  onClick={handleNext}
                  variant={isCorrect ? "success" : "primary"}
                  size="default"
                  className="shadow-xl px-4 py-2"
                >
                  {currentQIndex === quiz.questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4" />
                </BigButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
