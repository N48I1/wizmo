import React, { useEffect, useState } from 'react';
import { WizmoMood } from '../types';

interface WizmoProps {
  mood: WizmoMood;
  message?: string;
  className?: string;
}

export const Wizmo: React.FC<WizmoProps> = ({ mood, message, className = "" }) => {
  const [animationClass, setAnimationClass] = useState('');

  // Map mood to local image assets
  const getWizmoImage = (mood: WizmoMood) => {
    switch (mood) {
      case WizmoMood.HAPPY:
      case WizmoMood.EXCITED:
        return './wizmo-happy.png';
      case WizmoMood.SAD:
        return './wizmo-sad.png';
      case WizmoMood.THINKING:
        return './wizmo-thinking.png';
      case WizmoMood.IDLE:
      default:
        return './wizmo-idle.png';
    }
  };

  useEffect(() => {
    switch (mood) {
      case WizmoMood.HAPPY:
      case WizmoMood.EXCITED:
        setAnimationClass('animate-bounce');
        break;
      case WizmoMood.SAD:
        // Removed pulse, just the sad image is enough or maybe a small shake
        setAnimationClass('');
        break;
      case WizmoMood.THINKING:
        setAnimationClass('animate-pulse'); // Gentle pulse for thinking
        break;
      default:
        setAnimationClass('');
    }
  }, [mood]);

  return (
    <div className={`flex flex-col items-center justify-center ${className} transition-all duration-300`}>

      {/* Speech Bubble */}
      {message && (
        <div className="mb-2 md:mb-4 relative animate-fade-in-up z-20">
          <div className="bg-white text-slate-800 text-sm md:text-xl font-bold px-4 py-2 md:px-6 md:py-3 rounded-2xl shadow-xl border-b-4 border-slate-200 text-center max-w-[200px] md:max-w-xs">
            {message}
          </div>
          {/* Bubble tail */}
          <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-white transform -translate-x-1/2 rotate-45 border-r-4 border-b-4 border-slate-200"></div>
        </div>
      )}

      {/* Wizmo Character */}
      <div className={`relative w-40 h-40 md:w-52 md:h-52 filter drop-shadow-2xl transition-transform duration-500 ${animationClass}`}>
        <img
          src={getWizmoImage(mood)}
          alt={`Wizmo is ${mood}`}
          className="w-full h-full object-contain"
          onError={(e) => {
            // Fallback just in case
            console.error("Failed to load Wizmo image", e);
            e.currentTarget.src = './wizmo-idle.png';
          }}
        />

        {/* Extra Particle Effects can go here if needed */}
      </div>
    </div>
  );
};