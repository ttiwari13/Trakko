import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Book, Camera, Compass, Heart, Map, Plane } from 'lucide-react';
import Features from '../components/Features';
import HowToUse from '../components/HowToUse';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const taglineRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const videoContainerRef = useRef(null);
  const backgroundRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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

      // Reduce particle count on mobile
      const particleCount = isMobile ? 15 : 30;
      
      // Create optimized background particles
      const createParticles = () => {
        const particles = [];
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'absolute rounded-full opacity-10 pointer-events-none';
          particle.style.background = `linear-gradient(45deg, #FF6B9D, #EB5E28)`;
          particle.style.width = Math.random() * 4 + 2 + 'px';
          particle.style.height = particle.style.width;
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.willChange = 'transform';
          backgroundRef.current?.appendChild(particle);
          particles.push(particle);
        }
        return particles;
      };

      const particles = createParticles();

      // Create animated background gradient overlay
      const createGradientOverlay = () => {
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 pointer-events-none';
        overlay.style.background = `
          radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(235, 94, 40, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(147, 51, 234, 0.05) 0%, transparent 50%)
        `;
        overlay.style.zIndex = '1';
        backgroundRef.current?.appendChild(overlay);

        // Animate the gradient positions
        gsap.to(overlay, {
          background: `
            radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(235, 94, 40, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(147, 51, 234, 0.08) 0%, transparent 50%)
          `,
          duration: 8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });

        return overlay;
      };

      const gradientOverlay = createGradientOverlay();

      // Create floating geometric shapes
      const createFloatingShapes = () => {
        const shapes = [];
        const shapeCount = isMobile ? 5 : 8;
        
        for (let i = 0; i < shapeCount; i++) {
          const shape = document.createElement('div');
          const isCircle = Math.random() > 0.5;
          
          shape.className = `absolute pointer-events-none opacity-10`;
          shape.style.width = Math.random() * 100 + 50 + 'px';
          shape.style.height = shape.style.width;
          shape.style.borderRadius = isCircle ? '50%' : Math.random() * 20 + 'px';
          shape.style.background = i % 2 === 0 
            ? 'linear-gradient(45deg, #FF6B9D, transparent)' 
            : 'linear-gradient(135deg, #EB5E28, transparent)';
          shape.style.left = Math.random() * 100 + '%';
          shape.style.top = Math.random() * 100 + '%';
          shape.style.transform = `rotate(${Math.random() * 360}deg)`;
          shape.style.zIndex = '1';
          
          backgroundRef.current?.appendChild(shape);
          shapes.push(shape);

          // Animate shapes floating
          gsap.to(shape, {
            x: (Math.random() - 0.5) * 300,
            y: (Math.random() - 0.5) * 300,
            rotation: 360,
            scale: Math.random() * 1.5 + 0.5,
            duration: Math.random() * 20 + 15,
            ease: "none",
            repeat: -1,
            yoyo: true
          });

          // Opacity pulse
          gsap.to(shape, {
            opacity: Math.random() * 0.2 + 0.05,
            duration: Math.random() * 4 + 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 2
          });
        }
        return shapes;
      };

      const floatingShapes = createFloatingShapes();

      // Optimized particle animation with fewer transforms
      particles.forEach((particle, i) => {
        if (isDestroyed) return;
        
        gsap.set(particle, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        // Create organic floating motion
        const floatAnimation = () => {
          gsap.to(particle, {
            x: `+=${(Math.random() - 0.5) * 200}`,
            y: `+=${(Math.random() - 0.5) * 200}`,
            scale: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            duration: Math.random() * 8 + 6,
            ease: "sine.inOut",
            onComplete: floatAnimation // Loop the animation
          });
        };
        
        // Start floating with random delay
        gsap.delayedCall(Math.random() * 2, floatAnimation);
      });

      // Add animated lines/connections between particles (cyber effect)
      const createConnectionLines = () => {
        const lines = [];
        const lineCount = isMobile ? 3 : 5;
        
        for (let i = 0; i < lineCount; i++) {
          const line = document.createElement('div');
          line.className = 'absolute pointer-events-none opacity-5';
          line.style.height = '1px';
          line.style.background = 'linear-gradient(90deg, transparent, #FF6B9D, transparent)';
          line.style.width = Math.random() * 300 + 100 + 'px';
          line.style.left = Math.random() * 100 + '%';
          line.style.top = Math.random() * 100 + '%';
          line.style.transform = `rotate(${Math.random() * 360}deg)`;
          line.style.zIndex = '1';
          
          backgroundRef.current?.appendChild(line);
          lines.push(line);

          // Animate lines moving and rotating
          gsap.to(line, {
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            rotation: `+=${360}`,
            opacity: 0.1,
            duration: Math.random() * 12 + 8,
            ease: "none",
            repeat: -1,
            yoyo: true
          });

          // Scale animation
          gsap.to(line, {
            scaleX: Math.random() * 2 + 0.5,
            duration: Math.random() * 6 + 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 3
          });
        }
        return lines;
      };

      const connectionLines = createConnectionLines();

      // Optimized taglines
      const taglines = [
        { text: "Track Every Journey", icon: MapPin },
        { text: "Create Epic Memories", icon: Camera }, 
        { text: "Explore Without Limits", icon: Plane },
        { text: "Adventure Awaits You", icon: Compass },
        { text: "Journey Beyond Dreams", icon: Heart },
        { text: "Discover Hidden Gems", icon: Map },
        { text: "Live Every Moment", icon: Book }
      ];

      let currentTaglineIndex = 0;
      let taglineInterval;

      // Set initial tagline
      if (taglineRef.current) {
        taglineRef.current.textContent = taglines[0].text;
      }

      // Simplified icon creation - only one icon per tagline
      const createFloatingIcon = (IconComponent) => {
        // Clear existing icons
        if (iconsContainerRef.current) {
          iconsContainerRef.current.innerHTML = '';
        }

        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'absolute pointer-events-none opacity-30';
        iconWrapper.style.zIndex = '10';
        iconWrapper.style.left = '50%';
        iconWrapper.style.top = '50%';
        iconWrapper.style.transform = 'translate(-50%, -50%)';

        // Create icon using Lucide React component
        const IconElement = React.createElement(IconComponent, {
          size: isMobile ? 80 : 120,
          color: '#FF6B9D',
          strokeWidth: 1
        });

        // Convert React element to HTML (simplified approach)
        iconWrapper.innerHTML = `<div style="color: #FF6B9D; opacity: 0.3; font-size: ${isMobile ? '80px' : '120px'};">
          <svg width="${isMobile ? 80 : 120}" height="${isMobile ? 80 : 120}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            ${getIconSVG(IconComponent)}
          </svg>
        </div>`;
        
        iconsContainerRef.current?.appendChild(iconWrapper);

        // Simplified animation
        gsap.fromTo(iconWrapper, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.3, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Gentle floating
        gsap.to(iconWrapper, {
          rotation: 360,
          scale: 1.1,
          duration: 20,
          ease: "none",
          repeat: -1,
          yoyo: true
        });
      };

      // Helper function for icon SVGs
      const getIconSVG = (IconComponent) => {
        const iconMap = {
          [MapPin]: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
          [Book]: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
          [Camera]: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>',
          [Compass]: '<circle cx="12" cy="12" r="10"></circle><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88"></polygon>',
          [Heart]: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
          [Map]: '<polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line>',
          [Plane]: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8.8H6L4 11l4 1 1 4 3-2 1.2-5z"></path>'
        };
        return iconMap[IconComponent] || '';
      };

      // Initialize first icon
      createFloatingIcon(taglines[0].icon);

      // Simplified tagline rotation
      const rotateTagline = () => {
        if (isDestroyed) return;
        
        currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
        const newTagline = taglines[currentTaglineIndex];

        if (taglineRef.current) {
          gsap.to(taglineRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              if (taglineRef.current && !isDestroyed) {
                taglineRef.current.textContent = newTagline.text;
                createFloatingIcon(newTagline.icon);
                gsap.fromTo(taglineRef.current, 
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
              }
            }
          });
        }
      };

      // Start tagline rotation - slower speed
      taglineInterval = setInterval(rotateTagline, 6000);

      // Main entrance animation
      const mainTL = gsap.timeline();

      // Simplified entrance animations
      mainTL
        .fromTo(taglineRef.current, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        )
        .fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 0.7, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4"
        )
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3"
        )
        .fromTo(buttonRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2"
        )
        .fromTo(videoContainerRef.current,
          { opacity: 0, x: isMobile ? 0 : 100 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, "-=0.6"
        );

      // Simplified continuous animations
      if (!isMobile) {
        gsap.to(buttonRef.current, {
          scale: 1.02,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });

        gsap.to(videoContainerRef.current, {
          y: -5,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      // Optimized hover effects
      const addHoverEffect = (element, hoverProps, normalProps) => {
        if (!element) return;
        
        element.addEventListener('mouseenter', () => {
          if (!isDestroyed) {
            gsap.to(element, { ...hoverProps, duration: 0.3, ease: "power2.out" });
          }
        });

        element.addEventListener('mouseleave', () => {
          if (!isDestroyed) {
            gsap.to(element, { ...normalProps, duration: 0.3, ease: "power2.out" });
          }
        });
      };

      // Add hover effects
      addHoverEffect(buttonRef.current, 
        { scale: 1.05, backgroundColor: "#FF8FB3" },
        { scale: 1, backgroundColor: "#FF6B9D" }
      );

      addHoverEffect(videoContainerRef.current,
        { scale: 1.02, borderColor: "#EB5E28" },
        { scale: 1, borderColor: "#FF6B9D" }
      );

      // Animated container background
      const animateContainerBackground = () => {
        gsap.to(containerRef.current, {
          background: `
            linear-gradient(135deg, 
              rgb(15, 23, 42) 0%, 
              rgb(30, 41, 59) 25%, 
              rgb(51, 65, 85) 50%, 
              rgb(30, 41, 59) 75%, 
              rgb(15, 23, 42) 100%
            )
          `,
          duration: 10,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      };

      setIsLoaded(true);

      // Cleanup function
      return () => {
        isDestroyed = true;
        if (taglineInterval) clearInterval(taglineInterval);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        mainTL.kill();
        particles.forEach(particle => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
        floatingShapes.forEach(shape => {
          if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
          }
        });
        connectionLines.forEach(line => {
          if (line.parentNode) {
            line.parentNode.removeChild(line);
          }
        });
        if (gradientOverlay && gradientOverlay.parentNode) {
          gradientOverlay.parentNode.removeChild(gradientOverlay);
        }
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

  return (
    <>
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-pink-400 min-h-screen flex flex-col lg:flex-row items-center justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden"
    >
      {/* Background particles container */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div 
        className="flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0 w-full lg:w-1/2 relative px-2 sm:px-4"
        style={{ zIndex: 2 }}
      >
        {/* Icons container for floating icons around tagline */}
        <div 
          ref={iconsContainerRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />
        
        <h1 
          ref={taglineRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 cursor-pointer relative leading-tight"
          style={{
            textShadow: '0 0 10px rgba(255, 107, 157, 0.3)',
            zIndex: 2
          }}
        >
          Track Every Journey
        </h1>
        <p 
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 cursor-pointer leading-relaxed max-w-md lg:max-w-none"
        >
          Proof I was there and not just on Google Images.
        </p>
        
        <button 
  ref={buttonRef}
  onClick={() => navigate('/map')}
  className="mt-6 sm:mt-8 bg-pink-400 text-slate-900 rounded-lg px-6 py-3 sm:px-8 sm:py-4 font-semibold transition-all duration-200 cursor-pointer text-sm sm:text-base hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50"
>
  Get Started
</button>

      </div>

      <div 
        className="w-full lg:w-1/2 flex justify-center lg:justify-end relative mt-8 lg:mt-0"
        style={{ zIndex: 2 }}
      >
        <div 
          ref={videoContainerRef}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-pink-400 cursor-pointer"
          style={{
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover rounded-2xl sm:rounded-3xl"
            autoPlay
            loop
            muted
            playsInline
            controls
            poster="https://placehold.co/1280x720/0F172A/FF6B9D?text=TRAKKO+Video+Showcase"
          >
            <source src="video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    <Features/>
    <HowToUse/>
    </>
  );
};

export default Home;