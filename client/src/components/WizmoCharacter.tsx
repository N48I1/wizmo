import { motion } from "framer-motion";

interface WizmoProps {
  mood?: "happy" | "thinking" | "celebrating" | "neutral";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function WizmoCharacter({ mood = "happy", size = "md", className = "" }: WizmoProps) {
  // Use user-provided image from prompt
  const wizmoImg = "/images/wizmo.png";
  
  const sizeClasses = {
    xs: "w-16 h-16",
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
    xl: "w-64 h-64",
  };

  const variants = {
    happy: { 
      y: [0, -10, 0],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
    },
    thinking: {
      rotate: [0, 5, -5, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
    },
    celebrating: {
      scale: [1, 1.1, 1],
      y: [0, -20, 0],
      rotate: [0, 10, -10, 0],
      transition: { repeat: Infinity, duration: 0.8 }
    },
    neutral: {
      y: 0
    }
  };

  return (
    <motion.div 
      className={`relative z-10 ${sizeClasses[size]} ${className}`}
      animate={mood}
      variants={variants}
    >
      <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-90 -z-10" />
      <img 
        src={wizmoImg} 
        alt={`Wizmo is ${mood}`} 
        className="w-full h-full object-contain drop-shadow-xl"
      />
    </motion.div>
  );
}
