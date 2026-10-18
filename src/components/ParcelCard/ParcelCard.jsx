import ValveControl from '../ValveControl/ValveControl';

const ParcelCard = ({ parcel, onValveChange, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col h-[340px] rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-1 p-3 text-white bg-gradient-to-br from-red-400 to-rose-500">
        <span className="text-xl">🌡️</span>
        <span className="text-2xl font-bold">{parcel.temperature}°C</span>
        <span className="text-[0.65rem] uppercase tracking-widest opacity-90">Temperature</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-2 bg-slate-50 border-y border-gray-200">
        <h3 className="text-[#1e3c72] text-base font-bold mb-0.5">{parcel.name}</h3>
        <p className="text-slate-500 text-xs">📍 {parcel.location}</p>
      </div>

      <div
        className="flex justify-center p-2 bg-white border-b border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <ValveControl
          valve={parcel.valve}
          onChange={(newValve) => onValveChange(parcel.id, newValve)}
          compact
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-1 p-3 text-white bg-gradient-to-br from-sky-400 to-cyan-500">
        <span className="text-xl">💧</span>
        <span className="text-2xl font-bold">{parcel.humidity}%</span>
        <span className="text-[0.65rem] uppercase tracking-widest opacity-90">Humidity</span>
      </div>
    </div>
  );
};

export default ParcelCard;