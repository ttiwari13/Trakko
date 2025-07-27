import React, { useState } from 'react';
import { User, MapPin } from 'lucide-react';

const Header = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSignInClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const FloatingIcon = ({ className }) => (
    <MapPin className={`absolute text-[#FF6B9D] ${className}`} size={20} />
  );

  const ClickIcon = ({ className }) => (
    <MapPin className={`absolute text-[#FF6B9D] particle-click ${className}`} size={15} />
  );

  return (
    <>
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes floatDiagonal {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(-30px) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes floatWave {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          25% {
            transform: translateY(75vh) translateX(20px) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(-10px) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(25vh) translateX(15px) rotate(270deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(0px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes clickBurst {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0) rotate(0deg);
          }
          15% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-150px) scale(1.5) rotate(360deg);
          }
        }

        .particle-floating-1 {
          animation: floatUp 8s linear infinite;
          left: 10%;
          animation-delay: 0s;
        }

        .particle-floating-2 {
          animation: floatDiagonal 10s linear infinite;
          left: 25%;
          animation-delay: -2s;
        }

        .particle-floating-3 {
          animation: floatWave 12s linear infinite;
          left: 40%;
          animation-delay: -4s;
        }

        .particle-floating-4 {
          animation: floatUp 9s linear infinite;
          left: 55%;
          animation-delay: -1s;
        }

        .particle-floating-5 {
          animation: floatDiagonal 11s linear infinite;
          left: 70%;
          animation-delay: -3s;
        }

        .particle-floating-6 {
          animation: floatWave 7s linear infinite;
          left: 85%;
          animation-delay: -5s;
        }

        .particle-floating-7 {
          animation: floatUp 13s linear infinite;
          left: 15%;
          animation-delay: -6s;
        }

        .particle-floating-8 {
          animation: floatDiagonal 8s linear infinite;
          left: 60%;
          animation-delay: -2.5s;
        }

        .particle-floating-9 {
          animation: floatWave 10s linear infinite;
          left: 35%;
          animation-delay: -7s;
        }

        .particle-click {
          animation: ${isAnimating ? 'clickBurst 1.2s ease-out' : 'none'};
        }

        .particle-click-1 { left: 15%; top: 25%; animation-delay: 0.1s; }
        .particle-click-2 { left: 35%; top: 15%; animation-delay: 0.2s; }
        .particle-click-3 { left: 55%; top: 35%; animation-delay: 0.3s; }
        .particle-click-4 { left: 75%; top: 20%; animation-delay: 0.4s; }
        .particle-click-5 { left: 85%; top: 45%; animation-delay: 0.5s; }
        .particle-click-6 { left: 25%; top: 55%; animation-delay: 0.6s; }
      `}</style>

      <header className="flex justify-between items-center bg-[#0F172A] text-[#FF6B9D] p-5 overflow-hidden relative top-0 left-0 right-0 z-50">
        {/* Floating MapPin Icons */}
        <FloatingIcon className="particle-floating-1" />
        <FloatingIcon className="particle-floating-2" />
        <FloatingIcon className="particle-floating-3" />
        <FloatingIcon className="particle-floating-4" />
        <FloatingIcon className="particle-floating-5" />
        <FloatingIcon className="particle-floating-6" />
        <FloatingIcon className="particle-floating-7" />
        <FloatingIcon className="particle-floating-8" />
        <FloatingIcon className="particle-floating-9" />

        {/* Click burst icons */}
        {isAnimating && (
          <>
            <ClickIcon className="particle-click-1" />
            <ClickIcon className="particle-click-2" />
            <ClickIcon className="particle-click-3" />
            <ClickIcon className="particle-click-4" />
            <ClickIcon className="particle-click-5" />
            <ClickIcon className="particle-click-6" />
          </>
        )}

        {/* Logo */}
        <div className="md:pl-12 sm:pl-5">
          <nav className="font-bold md:text-3xl sm:text-xl">
            <span className="text-[#FF6B9D] ease-in-out font-bitcountDouble hover:bg-gradient-to-r hover:from-[#42537b] hover:to-[#FF6B9D] hover:bg-clip-text hover:text-transparent">
              TRAKKO
            </span>
          </nav>
        </div>

        {/* Sign In Button */}
        <div className="md:pr-12 ease-in-out">
          <button
            onClick={handleSignInClick}
            className="bg-[#FF6B9D] hover:bg-gradient-to-r hover:from-[#42537b] hover:to-[#FF6B9D] text-[#0F172A] rounded-full p-1"
          >
            <User size={18} className="inline-block mr-1 mb-1" />
            Sign In
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
