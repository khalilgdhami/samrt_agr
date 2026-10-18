const ValveControl = ({ valve, onChange, compact = false }) => {
  const isOpen = valve?.isOpen || false;
  const flowRate = valve?.flowRate || 0;

  const handleToggle = (e) => {
    e.stopPropagation();
    onChange({ isOpen: !isOpen, flowRate: !isOpen ? 10 : 0 });
  };

  return (
    <div
      className={`
        flex items-center justify-center gap-2 rounded-xl border-2 transition-all duration-300
        ${compact ? 'flex-row px-3 py-1.5' : 'flex-col p-4'}
        ${isOpen
          ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 border-emerald-500'
          : 'bg-gradient-to-br from-red-100 to-red-200 border-red-400'}
      `}
    >
      {!compact && (
        <div className="flex items-center gap-1.5 font-bold text-xs text-[#1e3c72] uppercase tracking-wider">
          <span className="text-lg">🚰</span>
          <span>Valve</span>
        </div>
      )}

      <button
        onClick={handleToggle}
        className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer p-1"
      >
        <span
          className={`
            relative inline-block rounded-full transition-colors duration-300
            ${compact ? 'w-9 h-5' : 'w-12 h-6'}
            ${isOpen ? 'bg-emerald-500' : 'bg-slate-400'}
          `}
        >
          <span
            className={`
              absolute top-0.5 left-0.5 bg-white rounded-full shadow transition-transform duration-300
              ${compact ? 'w-4 h-4' : 'w-5 h-5'}
              ${isOpen && (compact ? 'translate-x-4' : 'translate-x-6')}
            `}
          />
        </span>
        <span className="font-bold text-xs text-[#1e3c72]">
          {isOpen ? 'OPEN' : 'CLOSED'}
        </span>
      </button>

      {isOpen && !compact && (
        <div className="text-xs font-semibold text-sky-600 bg-white/70 px-2.5 py-1 rounded-full">
          💧 {flowRate.toFixed(1)} L/min
        </div>
      )}
    </div>
  );
};

export default ValveControl;