import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface BigButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "success" | "danger" | "neutral";
  size?: "sm" | "default" | "lg" | "xl";
  children: React.ReactNode;
}

export function BigButton({ 
  className, 
  variant = "primary", 
  size = "default", 
  children,
  ...props 
}: BigButtonProps) {
  
  const variants = {
    primary: "bg-blue-400 hover:bg-blue-500 text-white shadow-blue-200 border-blue-500",
    secondary: "bg-yellow-400 hover:bg-yellow-500 text-yellow-900 shadow-yellow-200 border-yellow-500",
    success: "bg-green-400 hover:bg-green-500 text-white shadow-green-200 border-green-500",
    danger: "bg-red-400 hover:bg-red-500 text-white shadow-red-200 border-red-500",
    neutral: "bg-white hover:bg-gray-50 text-gray-700 shadow-gray-200 border-gray-200"
  };

  const sizes = {
    sm: "text-sm px-4 py-2 rounded-xl border-b-2",
    default: "text-base px-5 py-2.5 rounded-xl border-b-4",
    lg: "text-lg px-6 py-3 rounded-2xl border-b-4",
    xl: "text-xl px-10 py-5 rounded-[1.5rem] border-b-6"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.98, y: 0 }}
      className={cn(
        "font-display font-bold active:border-b-0 active:mt-1 shadow-md transition-all flex items-center justify-center gap-2 shrink-0",
        variants[variant],
        sizes[size as keyof typeof sizes],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
