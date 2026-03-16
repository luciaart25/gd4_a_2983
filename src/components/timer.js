import { useEffect } from 'react';

export default function Timer({ isActive, seconds = 0, setSeconds }) {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, setSeconds]);

  const formatTime = (sec) => {
    const totalSec = sec || 0;
    const mins = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col items-center flex-1">
      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest flex items-center gap-1">
        🕒 Waktu
      </span>
      <span className="text-2xl font-mono font-bold">{formatTime(seconds)}</span>
    </div>
  );
}