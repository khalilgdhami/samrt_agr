import { useLocation, useNavigate } from 'react-router-dom';
import ValveControl from '../../components/ValveControl/ValveControl';
import { getTempStatus, getHumStatus } from '../../utils/statusHelpers';

const statusColors = {
  high: 'from-red-500 to-rose-600',
  low: 'from-blue-500 to-indigo-600',
  normal: 'from-emerald-500 to-teal-600',
};

const ParcelDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const parcel = state?.parcel;

  if (!parcel) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] flex flex-col items-center">
        <p className="text-white text-lg mb-5">❌ Parcel not found</p>
        <button
          onClick={() => navigate('/parcels')}
          className="px-5 py-2.5 bg-white/15 text-white rounded-xl font-semibold hover:bg-white/30 transition"
        >
          ← Back
        </button>
      </div>
    );
  }

  const tempStatus = getTempStatus(parcel.temperature);
  const humStatus = getHumStatus(parcel.humidity);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] flex flex-col items-center">
      <button
        onClick={() => navigate('/parcels')}
        className="self-start px-5 py-2.5 bg-white/15 text-white rounded-xl font-semibold hover:bg-white/30 transition mb-6"
      >
        ← Back
      </button>

      <div className="bg-white rounded-3xl p-10 max-w-[700px] w-full shadow-2xl text-center">
        <h1 className="text-[#1e3c72] text-3xl font-bold mb-2">🌱 {parcel.name}</h1>
        <p className="text-slate-500 mb-8">📍 {parcel.location}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div
            className={`flex flex-col items-center gap-1.5 p-6 rounded-2xl text-white bg-gradient-to-br ${statusColors[tempStatus.color]}`}
          >
            <span className="text-3xl">🌡️</span>
            <span className="text-3xl font-bold">{parcel.temperature}°C</span>
            <span className="text-xs uppercase tracking-widest opacity-90">Temperature</span>
            <span className="mt-2 px-3 py-1 bg-white/25 rounded-full text-xs font-semibold">
              {tempStatus.emoji} {tempStatus.label}
            </span>
          </div>

          <div
            className={`flex flex-col items-center gap-1.5 p-6 rounded-2xl text-white bg-gradient-to-br ${statusColors[humStatus.color]}`}
          >
            <span className="text-3xl">💧</span>
            <span className="text-3xl font-bold">{parcel.humidity}%</span>
            <span className="text-xs uppercase tracking-widest opacity-90">Humidity</span>
            <span className="mt-2 px-3 py-1 bg-white/25 rounded-full text-xs font-semibold">
              {humStatus.emoji} {humStatus.label}
            </span>
          </div>
        </div>

        <div className="my-6 p-5 bg-slate-50 rounded-2xl text-center">
          <h3 className="text-[#1e3c72] font-bold text-lg mb-3">🚰 Valve Control</h3>
          <div className="max-w-[300px] mx-auto">
            <ValveControl valve={parcel.valve} onChange={(v) => console.log('Update valve', v)} />
          </div>
        </div>

        <div className="text-slate-500 text-sm border-t border-gray-200 pt-4">
          <p><strong>ID:</strong> {parcel.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetail;