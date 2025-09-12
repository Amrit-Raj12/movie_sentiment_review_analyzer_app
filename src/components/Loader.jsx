import React, { useState, useEffect } from 'react';

const Loader = ({ onComplete, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Initializing AI Engine...",
    "Loading Sentiment Models...",
    "Calibrating Neural Networks...",
    "Ready to Analyze!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50));
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete && onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, duration / loadingSteps.length);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main logo/icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-purple-400/30 rounded-full animate-spin" 
                 style={{ animationDuration: '3s' }} />
            
            {/* Inner rotating ring */}
            <div className="absolute inset-2 border-4 border-pink-400/50 rounded-full animate-spin" 
                 style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
            
            {/* Core brain icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-12 h-12">
                {/* Brain-like pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-80 animate-pulse" />
                <div className="absolute inset-1 bg-gradient-to-tl from-purple-300 to-pink-300 rounded-full opacity-60" />
                <div className="absolute inset-2 bg-white rounded-full opacity-90 flex items-center justify-center">
                  <div className="w-6 h-6 relative">
                    {/* Neural network dots */}
                    <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full top-1 left-1 animate-pulse" />
                    <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full top-1 right-1 animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full bottom-1 left-2 animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute w-1.5 h-1.5 bg-purple-600 rounded-full bottom-1 right-2 animate-pulse" style={{ animationDelay: '1.5s' }} />
                    
                    {/* Connecting lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-60">
                      <line x1="6" y1="8" x2="18" y2="8" stroke="#7c3aed" strokeWidth="1" className="animate-pulse" />
                      <line x1="6" y1="8" x2="14" y2="20" stroke="#7c3aed" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
                      <line x1="18" y1="8" x2="20" y2="20" stroke="#7c3aed" strokeWidth="1" className="animate-pulse" style={{ animationDelay: '1.3s' }} />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App title */}
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
          AI Movie Sentiment
        </h1>
        <p className="text-purple-200 mb-8 text-lg">
          Analyzing emotions with precision
        </p>

        {/* Loading progress */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-purple-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-pink-400 to-purple-400 h-full rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex justify-between text-xs text-purple-300 mt-2">
            <span>{Math.round(progress)}%</span>
            <span className="animate-pulse">{loadingSteps[currentStep]}</span>
          </div>
        </div>

        {/* Pulsing dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Status text */}
        <div className="mt-8 text-purple-300/70 text-sm">
          Powered by Advanced AI • Neural Sentiment Analysis
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 border-purple-400/30" />
      <div className="absolute top-10 right-10 w-20 h-20 border-r-2 border-t-2 border-purple-400/30" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border-l-2 border-b-2 border-purple-400/30" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 border-purple-400/30" />
    </div>
  );
};

export default Loader;