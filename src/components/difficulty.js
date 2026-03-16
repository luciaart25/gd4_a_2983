export default function Difficulty({ current, setDifficulty }) {
  const options = [
    { label: 'Easy (4)', value: 4, icon: '⚪' },
    { label: 'Medium (6)', value: 6, icon: '🟡' },
    { label: 'Hard (8)', value: 8, icon: '💀' },
  ];

  return (
    <div className="flex gap-3 mb-8">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setDifficulty(opt.value)}
          className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold transition-all ${
            current === opt.value
              ? 'bg-yellow-400 text-indigo-900 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <span>{opt.icon}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}