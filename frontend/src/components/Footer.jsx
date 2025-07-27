import React, { useEffect, useRef } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef(null);
  const logoLettersRef = useRef([]);
  const logoImageRef = useRef(null);
  const taglineRef = useRef(null);
  const featuresRef = useRef(null);
  const socialRef = useRef(null);
  const socialIconsRef = useRef([]);
  const featureItemsRef = useRef([]);
  const featuresHeadingRef = useRef(null);

  useEffect(() => {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      const { gsap } = window;
      
      // Create timeline for entrance animations
      const tl = gsap.timeline({ paused: true });
      
      // Logo letters staggered entrance with bounce
      tl.fromTo(logoLettersRef.current, 
        { 
          y: -100, 
          opacity: 0, 
          rotation: 0,
          scale: 0.5
        },
        { 
          y: 0, 
          opacity: 1, 
          rotation: (i) => [8, -6, 4, -8, 6, -4][i] || 0,
          scale: 1,
          duration: 0.8,
          ease: "bounce.out",
          stagger: 0.1
        }
      );

      // Logo image with spin and float
      tl.fromTo(logoImageRef.current,
        { 
          scale: 0, 
          rotation: -360,
          opacity: 0
        },
        { 
          scale: 1, 
          rotation: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)"
        }, "-=0.5"
      );

      // Tagline slide up with glow effect
      tl.fromTo(taglineRef.current,
        { 
          y: 50, 
          opacity: 0,
          filter: "blur(10px)"
        },
        { 
          y: 0, 
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.3"
      );

      // Features section slide in from left
      tl.fromTo(featuresRef.current,
        { 
          x: -100, 
          opacity: 0,
          rotationY: -45
        },
        { 
          x: 0, 
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.2"
      );

      // Features heading with typewriter effect simulation
      tl.fromTo(featuresHeadingRef.current,
        { 
          scale: 0.8,
          opacity: 0,
          rotationX: -90
        },
        { 
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4"
      );

      // Feature items cascade with different effects
      tl.fromTo(featureItemsRef.current,
        { 
          x: -50, 
          opacity: 0,
          scale: 0.8,
          rotation: -10,
          filter: "blur(5px)"
        },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "back.out(1.2)",
          stagger: 0.15
        }, "-=0.2"
      );

      // Social section slide in from right
      tl.fromTo(socialRef.current,
        { 
          x: 100, 
          opacity: 0,
          rotationY: 45
        },
        { 
          x: 0, 
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6"
      );

      // Social icons bounce in with stagger
      tl.fromTo(socialIconsRef.current,
        { 
          scale: 0, 
          y: 30,
          rotation: 180,
          opacity: 0
        },
        { 
          scale: 1, 
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.1
        }, "-=0.3"
      );

      // Intersection Observer to trigger animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.play();
          }
        });
      }, { threshold: 0.2 });

      if (footerRef.current) {
        observer.observe(footerRef.current);
      }

      // Continuous animations
      // Logo floating animation
      gsap.to(logoImageRef.current, {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });

      // Letters subtle floating
      logoLettersRef.current.forEach((letter, i) => {
        if (letter) {
          gsap.to(letter, {
            y: Math.sin(i) * 5,
            duration: 2 + i * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.1
          });
        }
      });

      // Social icons floating
      socialIconsRef.current.forEach((icon, i) => {
        if (icon) {
          gsap.to(icon, {
            y: -5,
            duration: 1.5 + i * 0.2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.3
          });
        }
      });

      // Feature items subtle hover animations and continuous effects
      featureItemsRef.current.forEach((item, i) => {
        if (item) {
          // Continuous glow pulse
          gsap.to(item, {
            textShadow: "0 0 8px rgba(255, 107, 157, 0.3)",
            duration: 2 + i * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.5
          });

          // Subtle floating
          gsap.to(item, {
            y: -3,
            x: Math.sin(i) * 2,
            duration: 2.5 + i * 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.2
          });

          // Hover effects
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              scale: 1.05,
              x: 10,
              color: "#FF6B9D",
              textShadow: "0 0 15px rgba(255, 107, 157, 0.8)",
              duration: 0.3,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              scale: 1,
              x: 0,
              color: "#ffffff",
              textShadow: "0 0 8px rgba(255, 107, 157, 0.3)",
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      });

      // Features heading continuous animation
      if (featuresHeadingRef.current) {
        gsap.to(featuresHeadingRef.current, {
          textShadow: "0 0 20px rgba(255, 107, 157, 0.6)",
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      }

      // Hover animations for social icons
      socialIconsRef.current.forEach((icon) => {
        if (icon) {
          icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
              scale: 1.3,
              rotation: 360,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              boxShadow: "0 0 20px rgba(255, 107, 157, 0.6)",
              duration: 0.3
            });
          });

          icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            gsap.to(icon, {
              boxShadow: "0 0 0px rgba(255, 107, 157, 0)",
              duration: 0.3
            });
          });
        }
      });

      // Cleanup
      return () => {
        observer.disconnect();
        tl.kill();
      };
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className="flex flex-col justify-center items-center bg-[#0F172A] py-10 overflow-hidden">
      {/* Container for TRAKKO logo and image */}
      <div className="flex space-x-1 text-[#FF6B9D] font-bold text-[60px] sm:text-[80px] md:text-[100px] mt-[60px] leading-none mb-4">
        {['T', 'R', 'A', 'K', 'K', 'Ö'].map((letter, index) => (
          <span
            key={index}
            ref={el => logoLettersRef.current[index] = el}
            className={`inline-block font-bitcountDouble transform ${
              index === 0 ? 'rotate-[8deg]' :
              index === 1 ? '-rotate-[6deg]' :
              index === 2 ? 'rotate-[4deg]' :
              index === 3 ? '-rotate-[8deg]' :
              index === 4 ? 'rotate-[6deg]' :
              '-rotate-[4deg]'
            }`}
            style={{
              textShadow: '0 0 20px rgba(235, 94, 40, 0.5)',
              cursor: 'default'
            }}
          >
            {letter}
          </span>
        ))}

        <span className="inline-flex items-center justify-center">
          <img
            ref={logoImageRef}
            src="logotra.png"
            alt="logo"
            className="h-[60px] sm:h-[80px] md:h-[100px] object-contain inline-block"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.3))'
            }}
          />
        </span>
      </div>

      {/* "Your Personalised Travel Journal" text */}
      <span 
        ref={taglineRef}
        className="text-[#FF6B9D] text-lg sm:text-xl md:text-2xl mt-4 mb-8"
        style={{
          textShadow: '0 0 15px rgba(255, 107, 157, 0.4)'
        }}
      >
        Your Personalised Travel Journal
      </span>

      {/* Grid Container for Features and Social Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-white w-full max-w-md">
        {/* Features Column */}
        <div ref={featuresRef} className="flex flex-col items-center">
          <h3 
            ref={featuresHeadingRef}
            className="text-xl font-semibold mb-4 text-[#FF6B9D]"
          >
            Features
          </h3>
          <ul className="space-y-2">
            <li>
              <a 
                ref={el => featureItemsRef.current[0] = el}
                href="#" 
                className="hover:text-gray-400 transition-colors duration-300 inline-block cursor-pointer"
              >
                Personalized Itineraries
              </a>
            </li>
            <li>
              <a 
                ref={el => featureItemsRef.current[1] = el}
                href="#" 
                className="hover:text-gray-400 transition-colors duration-300 inline-block cursor-pointer"
              >
                Photo & Journal Upload
              </a>
            </li>
            <li>
              <a 
                ref={el => featureItemsRef.current[2] = el}
                href="#" 
                className="hover:text-gray-400 transition-colors duration-300 inline-block cursor-pointer"
              >
                Offline Access
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links Column with Icons and Animations */}
        <div ref={socialRef} className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4 text-[#FF6B9D]">Connect With Us</h3>
          <ul className="flex space-x-6">
            {/* Facebook Icon */}
            <li>
              <a
                ref={el => socialIconsRef.current[0] = el}
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-600 transition-colors duration-300 inline-block p-2 rounded-full"
              >
                <Facebook size={30} />
              </a>
            </li>

            {/* Instagram Icon */}
            <li>
              <a
                ref={el => socialIconsRef.current[1] = el}
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition-colors duration-300 inline-block p-2 rounded-full"
              >
                <Instagram size={30} />
              </a>
            </li>

            {/* Twitter Icon */}
            <li>
              <a
                ref={el => socialIconsRef.current[2] = el}
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300 inline-block p-2 rounded-full"
              >
                <Twitter size={30} />
              </a>
            </li>

            {/* LinkedIn Icon */}
            <li>
              <a
                ref={el => socialIconsRef.current[3] = el}
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700 transition-colors duration-300 inline-block p-2 rounded-full"
              >
                <Linkedin size={30} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;