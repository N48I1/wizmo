import { useQuizzes } from "@/hooks/use-quizzes";
import { useBackgroundMusic } from "@/hooks/use-sounds";
import { CategoryCard } from "@/components/CategoryCard";
import { WizmoCharacter } from "@/components/WizmoCharacter";
import { motion } from "framer-motion";
import { Sparkles, Play, Award, Volume2, VolumeX } from "lucide-react";
import { BigButton } from "@/components/BigButton";
import { Link } from "wouter";

export default function Home() {
  const { data: categories, isLoading, error } = useQuizzes();
  const { isPlaying, toggleMusic } = useBackgroundMusic();

  // Decorative blobs for background
  const Blob = ({ className }: { className: string }) => (
    <div className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float ${className}`} />
  );

  return (
    <div className="h-screen w-screen bg-blue-50/50 relative overflow-hidden font-body flex flex-col">
      {/* Background Blobs */}
      <Blob className="bg-purple-300 w-72 h-72 top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
      <Blob className="bg-yellow-300 w-96 h-96 top-40 right-0 translate-x-1/3 opacity-50" />
      <Blob className="bg-pink-300 w-64 h-64 bottom-0 left-20 translate-y-1/3" />

      <main className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Header Section */}
        <div className="flex-1 flex flex-col items-center justify-center gap-4 shrink-0 min-h-0 relative">
          <div className="absolute top-0 right-0">
            <BigButton 
              variant="neutral" 
              size="sm" 
              onClick={toggleMusic}
              className="w-10 h-10 p-0 rounded-full"
            >
              {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </BigButton>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-blue-100 text-blue-600 font-bold shadow-sm text-xs">
              <Sparkles size={12} className="fill-blue-400" />
              Fun Learning!
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-display font-black text-gray-800 leading-tight text-center"
          >
            Learn with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Wizmo!</span>
          </motion.h1>
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="flex-shrink-0"
          >
            <WizmoCharacter size="md" mood="happy" className="drop-shadow-lg" />
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="shrink-0 flex flex-col mb-4">
          <h2 className="text-base font-display font-bold text-gray-800 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Play size={16} className="fill-gray-800" />
              Pick a quiz type!
            </div>
            <Link href="/results">
              <BigButton variant="secondary" size="sm" className="h-7 py-0 px-3 text-xs">
                <Award className="w-3.5 h-3.5" />
                Badges
              </BigButton>
            </Link>
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {isLoading ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="h-20 bg-white/50 rounded-2xl animate-pulse" />
              ))
            ) : error ? (
              <div className="col-span-2 bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                <p className="text-red-500 font-bold mb-2 text-sm">Wizmo lost the quizzes!</p>
                <BigButton variant="danger" size="sm" onClick={() => window.location.reload()}>Try Again</BigButton>
              </div>
            ) : (
              categories?.map((category, idx) => (
                <CategoryCard key={category.id} category={category} index={idx} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
