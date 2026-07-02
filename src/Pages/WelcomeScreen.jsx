import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, Zap, Rocket } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const GlowingOrb = ({ className, delay }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const AnimatedIcon = ({ Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{
      delay,
      duration: 0.8,
      type: "spring",
      stiffness: 200,
      damping: 15,
    }}
    className="relative"
  >
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        delay: delay + 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-white/10 flex items-center justify-center">
        <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" />
      </div>
    </motion.div>
  </motion.div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });

    // Lock body scroll when welcome screen is active
    document.body.style.overflow = 'hidden';

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        // Force scroll reset multiple times
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        document.body.style.overflow = 'auto';
        
        // Additional reset after content starts rendering
        setTimeout(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 50);
        
        onLoadingComplete?.();
      }, 800);
    }, 3500);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      document.body.style.overflow = 'auto';
    };
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.15,
      filter: "blur(20px)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Background Effects */}
          <div className="absolute inset-0">
            <GlowingOrb className="w-96 h-96 bg-primary/20 top-1/4 left-1/4" delay={0} />
            <GlowingOrb className="w-80 h-80 bg-accent/20 bottom-1/4 right-1/4" delay={1} />
            <GlowingOrb className="w-64 h-64 bg-secondary/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={2} />
            <FloatingParticles />
          </div>
          
          <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-5xl mx-auto text-center">
              {/* Animated Icons */}
              <motion.div 
                className="flex justify-center gap-6 md:gap-12 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <AnimatedIcon Icon={Code2} delay={0.4} />
                <AnimatedIcon Icon={Zap} delay={0.6} />
                <AnimatedIcon Icon={Rocket} delay={0.8} />
              </motion.div>

              {/* Main Title */}
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    Welcome to
                  </span>
                </h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
                >
                  <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold">
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Zafi's Portfolio
                    </span>
                  </h2>
                </motion.div>
              </motion.div>

              {/* Subtitle */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <p className="text-lg md:text-2xl text-text-secondary">
                  Full Stack Web Developer & UI/UX Designer
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div 
                className="w-full max-w-md mx-auto mb-8"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 2.5, duration: 0.5 }}
              >
                <div className="h-2 bg-surface rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm text-text-secondary mt-2">
                  Loading experience... {progress}%
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.5 }}
              >
                <motion.a
                  href="https://github.com/Zafiza1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all"
                >
                  <Github className="w-6 h-6 text-text-secondary hover:text-primary" />
                </motion.a>
                <motion.a
                  href="https://ekizr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all"
                >
                  <Globe className="w-6 h-6 text-text-secondary hover:text-primary" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;