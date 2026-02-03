import React from 'react';

interface QuizOptionProps {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect?: boolean; // If revealed
  isWrong?: boolean;   // If revealed
  isDisabled: boolean;
  onSelect: (index: number) => void;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  index,
  isSelected,
  isCorrect,
  isWrong,
  isDisabled,
  onSelect
}) => {
  // Base 3D Button Style
  let baseStyle = "bg-white text-slate-600 border-slate-200 hover:bg-slate-50";
  let borderStyle = "border-b-[4px] active:border-b-0 active:translate-y-[4px]";
  let circleStyle = "bg-slate-100 text-slate-400";

  if (isSelected) {
    baseStyle = "bg-sky-100 text-sky-700 border-sky-300";
    circleStyle = "bg-sky-200 text-sky-600";
  }

  // Override if result is shown
  if (isCorrect) {
    baseStyle = "bg-green-400 text-white border-green-600";
    borderStyle = "border-b-[4px] translate-y-[0px]"; // Keep it popped or pressed? Let's keep it solid
    circleStyle = "bg-white/30 text-white";
  } else if (isWrong) {
    baseStyle = "bg-rose-400 text-white border-rose-600";
    circleStyle = "bg-white/30 text-white";
  }

  const animClass = isCorrect ? 'animate-bounce' : isWrong ? 'shake-animation' : '';

  return (
    <button
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      className={`
        w-full p-3 rounded-xl text-base md:text-lg font-bold text-left transition-all duration-200
        flex items-center gap-3 relative overflow-hidden
        ${baseStyle} ${borderStyle} ${animClass}
        ${isDisabled && !isCorrect && !isWrong ? 'opacity-60 cursor-not-allowed' : 'shadow-md hover:shadow-lg'}
      `}
    >
      <div className={`
        w-10 h-10 rounded-lg flex items-center justify-center text-base font-black
        ${circleStyle} transition-colors
      `}>
        {String.fromCharCode(65 + index)}
      </div>
      <span className="flex-1">{text}</span>

      {/* Selection/Status Icon */}
      {isCorrect && <span className="text-2xl mr-2">✅</span>}
      {isWrong && <span className="text-2xl mr-2">❌</span>}
    </button>
  );
};