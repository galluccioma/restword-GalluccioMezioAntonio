"use client"
import { useEffect, useState } from "react";

export const ConfettiEffect = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 35000); // Nasconde i coriandoli dopo 5 secondi
    return () => clearTimeout(timer);
  }, []);

  if (!showConfetti) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute inset-0 confetti-container">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-5%`,
              backgroundColor:
                i % 3 === 0 ? "#d0e124" : i % 3 === 1 ? "#7641d9" : "#c3b0e7",
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti {
          position: absolute;
          animation: confettiFall linear forwards;
        }
      `}</style>
    </div>
  );
};

