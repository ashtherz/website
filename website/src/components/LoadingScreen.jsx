import React from 'react';

const LoadingScreen = ({ duckImage }) => {
  // Generate random stars
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#1e1b4b] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-70"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
      
      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <img
            src={duckImage}
            alt="Loading Duck"
            className="w-24 h-24 md:w-32 md:h-32"
          />
          {/* Glow effect behind duck */}
          {/* <div className="absolute inset-0 bg-[#bf94e4] opacity-20 blur-xl rounded-full" /> */}
        </div>
        <div className="mt-8 text-[#f8f8f2] text-xl md:text-2xl font-medium text-center">
          Loading...
        </div>
        {/* Purple loading bar */}
        <div className="mt-4 w-48 h-2 bg-[#44475a] rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#bf94e4] via-[#e2a6e7] to-[#bf94e4] loading-gradient" />
          {/* Loading bar glow effect */}
          <div className="absolute inset-0 bg-[#bf94e4] opacity-20 blur-md" />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .loading-gradient {
          animation: loading 2s ease-in-out infinite;
        }

        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;