import React, { useEffect, useRef, useState } from 'react';
import { Route, Users, Camera, MessageCircle, Clock, Sparkles, Navigation, MapPin } from 'lucide-react';

const Features = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const backgroundRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      id: 1,
      title: "Real-Time Route Tracking",
      description: "Draw and visualize your journey as it happens. Watch your path unfold in real-time with GPS precision.",
      icon: Route,
      color: "#FF6B9D",
      gradient: "from-pink-500 to-rose-600",
      details: "Advanced GPS tracking • Live route visualization • Automatic waypoint detection • Speed & distance metrics"
    },
    {
      id: 2,
      title: "Collaborative Journaling",
      description: "Share your adventures with friends and family. Create group journals and collect memories together.",
      icon: Users,
      color: "#EB5E28",
      gradient: "from-orange-500 to-red-600",
      details: "Multi-user editing • Real-time sync • Permission controls • Shared photo albums"
    },
    {
      id: 3,
      title: "Memory Collection",
      description: "Capture moments with photos, videos, and voice notes. Build a rich multimedia timeline of your travels.",
      icon: Camera,
      color: "#3B82F6",
      gradient: "from-blue-500 to-indigo-600",
      details: "Photo & video capture • Voice recordings • Geo-tagged media • Auto-organize by location"
    },
    {
      id: 4,
      title: "Smart Comments & Notes",
      description: "Add thoughts, tips, and reflections to any point on your journey. Create a personal travel guide.",
      icon: MessageCircle,
      color: "#10B981",
      gradient: "from-emerald-500 to-teal-600",
      details: "Rich text editing • Voice-to-text • Location-based notes • Searchable content"
    },
    {
      id: 5,
      title: "Intelligent Reminders",
      description: "Get notified about past adventures when you revisit locations. Relive your memories automatically.",
      icon: Clock,
      color: "#8B5CF6",
      gradient: "from-purple-500 to-violet-600",
      details: "Location-based triggers • Memory flashbacks • Anniversary notifications • Route suggestions"
    }
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      let isDestroyed = false;

      // Optimized background elements - fewer on mobile
      const createBackgroundElements = () => {
        const elements = [];
        const elementCount = isMobile ? 10 : 20;
        
        for (let i = 0; i < elementCount; i++) {
          const element = document.createElement('div');
          element.className = 'absolute opacity-5 pointer-events-none select-none';
          element.style.willChange = 'transform';
          
          // Simpler shapes for better performance
          const shapes = ['○', '△', '◇', '✈', '📍'];
          element.textContent = shapes[Math.floor(Math.random() * shapes.length)];
          element.style.fontSize = Math.random() * 16 + 8 + 'px';
          element.style.color = features[Math.floor(Math.random() * features.length)].color;
          element.style.left = Math.random() * 100 + '%';
          element.style.top = Math.random() * 100 + '%';
          
          backgroundRef.current?.appendChild(element);
          elements.push(element);

          // Single optimized animation per element
          gsap.to(element, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: 180,
            scale: Math.random() * 1.3 + 0.7,
            opacity: Math.random() * 0.1 + 0.02,
            duration: Math.random() * 20 + 15,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 5
          });
        }
        return elements;
      };

      const backgroundElements = createBackgroundElements();

      // Optimized entrance animations
      const mainTL = gsap.timeline({ paused: true });

      // Header animation - simplified
      mainTL.fromTo(headerRef.current,
        {
          y: -50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        }
      );

      // Cards staggered entrance - lighter animation
      mainTL.fromTo(cardsRef.current.filter(Boolean),
        {
          y: 60,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        }, "-=0.4"
      );

      // Set initial card shadows - static, no animation
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, {
            boxShadow: `0 8px 25px ${features[i].color}25`
          });
        }
      });

      // Optimized Intersection Observer
      let observer;
      const createObserver = () => {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !isDestroyed) {
              mainTL.play();
            }
          });
        }, { 
          threshold: 0.2,
          rootMargin: '50px'
        });

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }
      };

      createObserver();
      setIsLoaded(true);

      // Cleanup function
      return () => {
        isDestroyed = true;
        if (observer) observer.disconnect();
        mainTL.kill();
        backgroundElements.forEach(element => {
          if (element.parentNode) {
            element.parentNode.removeChild(element);
          }
        });
      };
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Optimized hover handler with throttling
  const handleCardHover = (index, isEntering) => {
    if (!window.gsap || !isLoaded) return;
    
    const card = cardsRef.current[index];
    const feature = features[index];
    
    if (!card) return;

    if (isEntering) {
      setActiveCard(index);
      
      // Single combined animation instead of multiple
      window.gsap.to(card, {
        scale: isMobile ? 1.02 : 1.05,
        y: isMobile ? -5 : -15,
        boxShadow: `0 15px 40px ${feature.color}40`,
        duration: 0.3,
        ease: "power2.out"
      });

      // Icon animation
      const icon = card.querySelector('.feature-icon');
      if (icon) {
        window.gsap.to(icon, {
          scale: 1.1,
          rotation: 10,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Title color change
      const title = card.querySelector('.feature-title');
      if (title) {
        window.gsap.to(title, {
          color: feature.color,
          duration: 0.2
        });
      }
    } else {
      setActiveCard(null);
      
      window.gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: `0 8px 25px ${feature.color}25`,
        duration: 0.3,
        ease: "power2.out"
      });

      // Reset icon
      const icon = card.querySelector('.feature-icon');
      if (icon) {
        window.gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }

      // Reset title
      const title = card.querySelector('.feature-title');
      if (title) {
        window.gsap.to(title, {
          color: "#FFFFFF",
          duration: 0.2
        });
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 relative overflow-hidden"
    >
      {/* Background elements */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Header */}
      <div 
        ref={headerRef}
        className="text-center mb-12 md:mb-16 relative"
        style={{ zIndex: 2 }}
      >
        <div className="flex items-center justify-center mb-4 sm:mb-6 flex-wrap">
          <Sparkles className="text-pink-400 mr-2 sm:mr-4" size={isMobile ? 32 : 40} />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
               Powerful Features
            </span>
          </h1>
          <Navigation className="text-orange-500 ml-2 sm:ml-4" size={isMobile ? 32 : 40} />
        </div>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Experience the ultimate travel journaling platform with cutting-edge features 
          designed to capture, share, and relive your adventures like never before.
        </p>
      </div>

      {/* Features Grid */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto relative"
        style={{ zIndex: 2 }}
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              ref={el => cardsRef.current[index] = el}
              className={`bg-gradient-to-br ${feature.gradient} p-[2px] rounded-xl sm:rounded-2xl cursor-pointer transform-gpu transition-all duration-300`}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              style={{ willChange: 'transform' }}
            >
              <div className="bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div 
                    className="feature-icon p-3 sm:p-4 rounded-full border-2 border-opacity-30 transition-all duration-300"
                    style={{ borderColor: feature.color }}
                  >
                    <IconComponent 
                      size={isMobile ? 24 : 32} 
                      style={{ color: feature.color }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center flex-grow">
                  <h3 
                    className="feature-title text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 transition-colors duration-200"
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                  
                  {/* Details - shown on hover */}
                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      activeCard === index ? 'opacity-100 max-h-24' : 'opacity-0 max-h-0'
                    }`}
                  >
                    <div 
                      className="text-xs sm:text-sm rounded-lg p-2 sm:p-3 border border-opacity-20"
                      style={{ 
                        backgroundColor: `${feature.color}10`,
                        borderColor: feature.color,
                        color: feature.color
                      }}
                    >
                      {feature.details}
                    </div>
                  </div>
                </div>

                {/* Bottom indicator */}
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div 
                    className="w-8 sm:w-12 h-1 rounded-full transition-all duration-300"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom decorative element */}
      <div className="text-center mt-12 md:mt-16 relative" style={{ zIndex: 2 }}>
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-pink-400">
          <MapPin size={isMobile ? 20 : 24} />
          <span className="text-base sm:text-lg font-semibold">Start Your Journey Today</span>
          <MapPin size={isMobile ? 20 : 24} />
        </div>
      </div>
    </div>
  );
};

export default Features;