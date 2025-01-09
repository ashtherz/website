import React, { useEffect, useState } from 'react';

const Sparkles = () => {
  const [sparkles, setSparkles] = useState([]);
  const color = '#bf94e4'; // Single purple color

  useEffect(() => {
    const createSparkle = () => {
      const sparkle = {
        id: Math.random(),
        color: color,
        size: Math.random() * 10 + 4,
        left: Math.random() * 100,
        top: Math.random() * 100,
        createdAt: Date.now(),
      };
      setSparkles(current => [...current, sparkle]);

      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(current => current.filter(s => s.id !== sparkle.id));
      }, 1000);
    };

    // Create new sparkles periodically
    const interval = setInterval(() => {
      if (sparkles.length < 15) { // Limit maximum sparkles
        createSparkle();
      }
    }, 300);

    return () => clearInterval(interval);
  }, [sparkles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle opacity-0"
          style={{
            backgroundColor: sparkle.color,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            borderRadius: '50%',
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            animation: 'sparkle 1s ease-in-out forwards',
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.3;  // Made more transparent
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Sparkles;