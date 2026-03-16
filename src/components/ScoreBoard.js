export default function ScoreBoard({ moves, matchedCount, totalPairs }) {
  const StatBox = ({ label, value, icon }) => (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col items-center flex-1">
      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest flex items-center gap-1">
        {icon} {label}
      </span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );

  return (
    <>
      <StatBox label="Percobaan" value={moves} icon="🖱️" />
      <StatBox label="Ditemukan" value={`${matchedCount}/${totalPairs}`} icon="✅" />
    </>
  );
}