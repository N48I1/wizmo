import React from 'react';
import { QuizCategory } from '../types';

interface CategoryCardProps {
  category: QuizCategory;
  onClick: (category: QuizCategory) => void;
  highScore?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, highScore }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`
        relative group w-full aspect-square rounded-[2rem] p-4 flex flex-col items-center justify-center 
        transition-all duration-200 transform hover:scale-[1.02] active:scale-95 active:translate-y-2
        ${category.color} border-b-[8px] border-black/20 hover:border-black/30 active:border-b-0
        shadow-xl
      `}
    >
      <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-3 shadow-inner">
        <span className="text-5xl md:text-6xl filter drop-shadow-md transform group-hover:scale-110 transition-transform block">
          {category.icon}
        </span>
      </div>
      
      <span className="text-white font-black text-xl md:text-2xl tracking-wide drop-shadow-md">
        {category.title}
      </span>
      
      {highScore !== undefined && highScore > 0 && (
        <div className="mt-3 bg-white text-slate-800 rounded-full px-3 py-1 text-sm font-bold shadow-sm flex items-center gap-1">
          <span>🏆</span> {highScore}
        </div>
      )}
    </button>
  );
};