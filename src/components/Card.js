import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (
    // Kontainer Utama: Ukuran harus fix di sini (w-20 h-20)
    <div 
      onClick={handleClick} 
      className="w-20 h-20 perspective-1000 cursor-pointer select-none"
    >
      {/* Kontainer Inner */}
      <div className={`relative w-full h-full transition-all duration-500 preserve-3d ${isOpen ? 'rotate-y-180' : ''}`}>
        
        {/* SISI BELAKANG (Tertutup) - Pastikan w-full h-full */}
        <div className={`absolute inset-0 w-full h-full backface-hidden flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg ripple-effect hover:shadow-glow transition-transform duration-300 hover:scale-105`}>
          <FaQuestion className="text-white/60 text-xl" />
        </div>

        {/* SISI DEPAN (Terbuka) - Samakan w-full h-full dengan sisi belakang */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex items-center justify-center rounded-xl bg-white text-3xl shadow-md ${isMatched ? 'match-glow ring-2 ring-green-400' : ''}`}>
          <span className={isOpen ? "animate-bounce-once" : ""}>
            <IconComponent style={{ color: card.color }} />
          </span>
        </div>
        
      </div>
    </div>
  );
}

export default Card;