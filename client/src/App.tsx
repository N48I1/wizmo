import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import Quiz from "@/pages/Quiz";
import Results from "@/pages/Results";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-400"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.8
        }}
        className="text-center"
      >
        <img 
          src="/images/wizmo.png" 
          alt="Wizmo" 
          className="w-64 h-64 md:w-96 md:h-96 object-contain mb-8"
        />
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-black text-white font-display tracking-tight"
        >
          Wizmo Quiz
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/results" component={Results} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AnimatePresence>
        {showSplash ? (
          <SplashScreen key="splash" onFinish={() => setShowSplash(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Router />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
