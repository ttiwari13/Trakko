import React, { useEffect, useRef, useState } from 'react';

const steps = [
  { title: 'Pin Your Current Location', emoji: '📍', description: 'Mark where you are right now', color: 'from-pink-400 to-pink-600' },
  { title: 'Draw or Save a Route', emoji: '🗺️', description: 'Create your path on the map', color: 'from-pink-500 to-rose-500' },
  { title: 'Add Memories to the Map', emoji: '✍️', description: 'Write down special moments', color: 'from-rose-400 to-pink-500' },
  { title: 'Upload Photos & Notes', emoji: '🖼️', description: 'Attach memories to locations', color: 'from-pink-400 to-rose-400' },
  { title: 'Access All Saved Routes', emoji: '💾', description: 'View your journey history', color: 'from-rose-500 to-pink-600' },
];

export default function HowToUse() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isPlaying) {
          startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      cleanupTimers();
    };
  }, []);

  const cleanupTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startAnimation = () => {
    if (isPlaying) return;
    
    cleanupTimers();
    setIsPlaying(true);
    setCurrentStep(-1);
    
    // Start animation after small delay
    timeoutRef.current = setTimeout(() => {
      let stepIndex = 0;
      setCurrentStep(0);
      
      intervalRef.current = setInterval(() => {
        stepIndex++;
        
        if (stepIndex < steps.length) {
          setCurrentStep(stepIndex);
        } else {
          // Animation complete
          setCurrentStep(-1);
          setIsPlaying(false);
          cleanupTimers();
          
          // Auto restart after 3 seconds if still visible
          timeoutRef.current = setTimeout(() => {
            if (isInViewport()) {
              startAnimation();
            }
          }, 3000);
        }
      }, 2200);
    }, 500);
  };

  const isInViewport = () => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const createParticles = () => {
    return [...Array(25)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full opacity-40"
        style={{
          backgroundColor: '#FF6B9D',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 2}s`
        }}
      />
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-slate-900 overflow-hidden"
      style={{ backgroundColor: '#0F172A' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {createParticles()}
        
        {/* Animated circles */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border opacity-20"
            style={{
              borderColor: '#FF6B9D',
              width: `${250 + i * 120}px`,
              height: `${250 + i * 120}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `spin ${25 + i * 8}s linear infinite reverse`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-20 text-center pt-16 pb-12">
        <h2 className="text-5xl sm:text-7xl font-bold mb-6" style={{ color: '#FF6B9D' }}>
          How to Use
        </h2>
        <div className="w-24 h-1 mx-auto rounded-full animate-pulse" style={{ backgroundColor: '#FF6B9D' }} />
      </div>

      {/* Central rotating wheel */}
      <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
        <div className="relative w-96 h-96">
          {/* Central hub */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full shadow-2xl animate-pulse border-4"
            style={{ 
              background: `linear-gradient(135deg, #FF6B9D 0%, #FF8FAB 100%)`,
              borderColor: 'rgba(255, 107, 157, 0.3)'
            }}
          />
          
          {/* Step circles */}
          {steps.map((step, index) => {
            const angle = (index * 72) - 90; // 360/5 = 72 degrees apart
            const radius = 140;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            const isActive = currentStep === index;
            const isPassed = currentStep > index;
            
            return (
              <div
                key={index}
                className={`absolute w-24 h-24 rounded-full flex items-center justify-center transition-all duration-800 transform ${
                  isActive 
                    ? 'scale-130 shadow-2xl animate-pulse z-30' 
                    : isPassed 
                    ? 'scale-110 opacity-85 z-20' 
                    : 'scale-100 opacity-60 z-10'
                }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) ${
                    isActive ? 'scale(1.3)' : isPassed ? 'scale(1.1)' : 'scale(1)'
                  }`,
                  background: isActive || isPassed 
                    ? `linear-gradient(135deg, ${step.color.split(' ')[1]} 0%, ${step.color.split(' ')[3]} 100%)`
                    : 'linear-gradient(135deg, rgba(255, 107, 157, 0.15) 0%, rgba(255, 107, 157, 0.08) 100%)',
                  boxShadow: isActive 
                    ? `0 0 50px #FF6B9D80`
                    : isPassed
                    ? `0 0 25px #FF6B9D50`
                    : '0 4px 20px rgba(0,0,0,0.3)',
                  border: isActive ? '3px solid #FF6B9D' : isPassed ? '2px solid rgba(255, 107, 157, 0.6)' : '1px solid rgba(255, 107, 157, 0.3)'
                }}
              >
                <span className={`text-3xl transition-all duration-600 ${
                  isActive ? 'animate-bounce' : ''
                }`}>
                  {step.emoji}
                </span>
                
                {/* Step number indicator */}
                <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-500 ${
                  isActive ? 'text-white scale-110' : isPassed ? 'bg-pink-500 text-white' : 'text-white/60'
                }`} style={{
                  backgroundColor: isActive ? '#FF6B9D' : isPassed ? '#FF6B9D' : 'rgba(255, 107, 157, 0.2)'
                }}>
                  {index + 1}
                </div>
                
                {/* Connecting line to center */}
                <div 
                  className={`absolute w-1 origin-center transition-all duration-800 ${
                    isActive 
                      ? `opacity-100 scale-y-110` 
                      : isPassed 
                      ? `opacity-70 scale-y-100`
                      : 'opacity-25 scale-y-50'
                  }`}
                  style={{
                    background: isActive || isPassed 
                      ? `linear-gradient(to top, #FF6B9D, #FF8FAB)` 
                      : 'rgba(255, 107, 157, 0.2)',
                    height: `${radius - 48}px`,
                    transform: `rotate(${angle + 90}deg)`,
                    transformOrigin: 'bottom center',
                    bottom: '50%',
                    left: '50%',
                    marginLeft: '-2px'
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Step details */}
      <div className="relative z-20 px-6 pb-16">
        <div className="max-w-2xl mx-auto text-center">
          {currentStep >= 0 && currentStep < steps.length && (
            <div className="transform transition-all duration-800 animate-fade-in">
              <div className={`inline-block px-8 py-5 rounded-3xl bg-gradient-to-r ${steps[currentStep].color} shadow-2xl mb-6 border-2`} style={{ borderColor: 'rgba(255, 107, 157, 0.3)' }}>
                <div className="flex items-center justify-center mb-3">
                  <span className="text-4xl mr-3">{steps[currentStep].emoji}</span>
                  <span className="text-sm font-semibold text-white/80 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {steps[currentStep].title}
                </h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  {steps[currentStep].description}
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="w-full max-w-md mx-auto h-3 rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: 'rgba(255, 107, 157, 0.2)' }}>
                <div 
                  className={`h-full bg-gradient-to-r ${steps[currentStep].color} transition-all duration-1200 ease-out relative`}
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                >
                  <div className="absolute right-0 top-0 h-full w-3 animate-pulse rounded-r-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                </div>
              </div>
              
              <p className="mt-4 text-lg font-medium" style={{ color: 'rgba(255, 107, 157, 0.8)' }}>
                Progress: {currentStep + 1} of {steps.length} steps
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-15px) rotate(180deg); opacity: 0.8; }
        }
        
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(25px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}