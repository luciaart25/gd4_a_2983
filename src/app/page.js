'use client';
import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import Difficulty from '../components/difficulty';
import Timer from '../components/timer'; 
import { GiCardJoker } from 'react-icons/gi'; 
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaGhost, FaBomb, FaIceCream, FaRocket } from 'react-icons/fa';

const ALL_ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaGhost, color: '#94a3b8' },
  { icon: FaBomb, color: '#475569' },
  { icon: FaIceCream, color: '#fbbf24' },
  { icon: FaRocket, color: '#38bdf8' },
];

export default function Home() {
  const [currentMode, setCurrentMode] = useState(4); // 4, 6, 8 pairs
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Logic Membuat Kartu Berdasarkan Mode
  const createCards = useCallback((mode) => {
    const selectedIcons = ALL_ICONS.slice(0, mode);
    const paired = selectedIcons.flatMap((item, index) => [
      { id: index * 2, icon: item.icon, color: item.color, pairId: index },
      { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
    ]);
    return paired.sort(() => Math.random() - 0.5);
  }, []);

  const resetGame = useCallback(() => {
    setCards(createCards(currentMode));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsActive(false); // Timer mulai saat kartu pertama diklik
  }, [currentMode, createCards]);

  // Reset saat ganti difficulty
  useEffect(() => {
    resetGame();
  }, [currentMode, resetGame]);

  // Win condition
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setIsActive(false);
    }
  }, [matchedCards, cards]);

  // Match logic
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards.map(id => cards.find(c => c.id === id));
      setMoves(m => m + 1);

      if (first.pairId === second.pairId) {
        setMatchedCards(prev => [...prev, first.id, second.id]);
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => setFlippedCards([]), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  const handleCardFlip = (id) => {
    if (!isActive && matchedCards.length === 0) setIsActive(true);
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#11111d] to-[#1d0e3d] p-4 text-white">
      <h1 className="text-5xl font-extrabold mb-8 flex items-center gap-4 animate-float drop-shadow-custom">
        <span className="bg-yellow-400 p-1 rounded-lg">
           <GiCardJoker className="text-indigo-900 text-4xl" />
        </span>
        <span className="text-gradient">Memory Card</span>
      </h1>

      <Difficulty current={currentMode} setDifficulty={setCurrentMode} />

      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        {/* Layout Stats Sejajar */}
        <div className="grid grid-cols-3 gap-3 w-full">
          <Timer isActive={isActive} seconds={seconds} setSeconds={setSeconds} />
          <ScoreBoard moves={moves} matchedCount={matchedCards.length / 2} totalPairs={currentMode} />
        </div>

        <button 
          onClick={resetGame}
          className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 px-8 py-2 rounded-full font-bold shadow-lg transition-all active:scale-95"
        >
          🔄 Acak Ulang
        </button>

        {/* PESAN MENANG */}

        {matchedCards.length === cards.length && matchedCards.length > 0 && (
          <div className="bg-yellow-400/20 border border-yellow-400/50 p-4 rounded-xl mb-2 animate-bounce text-center backdrop-blur-sm">
             <p className="text-yellow-300 font-bold">
               🎉 Selamat! Selesai dalam {moves} percobaan!
             </p>
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-2xl">
          <GameBoard 
            cards={cards} 
            flippedCards={flippedCards} 
            matchedCards={matchedCards} 
            onFlip={handleCardFlip} 
          />
        </div>
      </div>
    </main>
  );
}