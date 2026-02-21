import { useQuizResults } from "@/hooks/use-quizzes";
import { BigButton } from "@/components/BigButton";
import { Link } from "wouter";
import { Home, Trophy, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { WizmoCharacter } from "@/components/WizmoCharacter";

export default function Results() {
  // Merge server data with local storage for robust offline support view
  const { data: serverResults, isLoading } = useQuizResults();
  
  // In a real app we would de-duplicate, but for now let's just show what we have
  const localResultsStr = localStorage.getItem('wizmo_results');
  const localResults = localResultsStr ? JSON.parse(localResultsStr) : [];
  
  // Prefer server results if available, else fall back to local
  const results = serverResults && serverResults.length > 0 ? serverResults : localResults;

  return (
    <div className="h-screen w-screen bg-blue-50 font-body p-4 sm:p-8 flex flex-col overflow-hidden">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <Link href="/">
            <BigButton variant="neutral" size="sm">
              <Home className="w-4 h-4" /> Back
            </BigButton>
          </Link>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-blue-50">
            <Trophy size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-gray-700 text-sm">{results?.length || 0} Quizzes</span>
          </div>
        </div>

        <div className="text-center mb-4 shrink-0">
          <WizmoCharacter mood="happy" size="xs" className="mx-auto mb-1" />
          <h1 className="text-2xl font-display font-bold text-gray-800">Your Trophy Room</h1>
          <p className="text-gray-500 text-xs mt-0.5">Look at all these stars!</p>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pb-8 min-h-0">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white rounded-2xl animate-pulse" />)}
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border-4 border-dashed border-gray-200">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">No quizzes yet!</h3>
              <Link href="/">
                <BigButton variant="primary">Start Quiz!</BigButton>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {results.slice().reverse().map((result: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border-2 border-gray-100 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                      {result.category[0]}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="text-lg font-bold text-gray-800 truncate">{result.category}</h3>
                      <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Calendar size={12} />
                        {result.completedAt ? format(new Date(result.completedAt), "MMM d") : "Today"}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(star => (
                        <Star 
                          key={star} 
                          size={16} 
                          className={star <= result.stars ? "fill-yellow-400 text-yellow-500" : "fill-gray-200 text-gray-300"} 
                        />
                      ))}
                    </div>
                    <div className="font-display font-black text-blue-600">
                      {result.score}/{result.totalQuestions}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
