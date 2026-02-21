import { motion } from "framer-motion";
import { Link } from "wouter";
import { type QuizCategory } from "@shared/schema";
import { Star, Trophy, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

interface CategoryCardProps {
  category: QuizCategory;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  // Dynamic icon mapping
  const IconComponent = category.icon && (Icons as any)[category.icon] 
    ? (Icons as any)[category.icon] 
    : Icons.Zap;
    
  // Color cycling
  const colors = [
    "from-blue-400 to-blue-500 shadow-blue-200",
    "from-yellow-400 to-yellow-500 shadow-yellow-200",
    "from-green-400 to-green-500 shadow-green-200",
    "from-purple-400 to-purple-500 shadow-purple-200",
  ];
  const colorClass = colors[index % colors.length];

  return (
    <Link href={`/quiz/${category.id}`} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          rounded-2xl p-3 relative overflow-hidden text-white
          bg-gradient-to-br ${colorClass} shadow-md border-2 border-white/20
          flex flex-col h-full min-h-[120px]
        `}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -mr-2 -mt-2 opacity-10">
          <IconComponent size={50} strokeWidth={3} />
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-1.5 bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-inner shrink-0">
            <IconComponent size={16} strokeWidth={3} />
          </div>
          
          <h3 className="text-sm font-display font-bold mb-0.5 leading-tight line-clamp-1">{category.title}</h3>
          <p className="text-white/90 text-[9px] font-medium leading-tight line-clamp-2 mb-auto">{category.description}</p>
          
          <div className="mt-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1 bg-black/10 px-1.5 py-0.5 rounded-full text-[8px] font-bold">
              <Trophy size={8} className="text-yellow-300 fill-yellow-300" />
              <span>Lvl {category.level}</span>
            </div>
            
            <div className="w-5 h-5 bg-white text-gray-800 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowRight size={10} strokeWidth={3} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
