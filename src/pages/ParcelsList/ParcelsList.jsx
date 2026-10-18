import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ValveControl from '../../components/ValveControl/ValveControl';
import { initialParcels } from '../../data/parcelsData';

const ParcelsList = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('parcels');
    setParcels(saved ? JSON.parse(saved) : initialParcels);
  }, []);

  const persist = (updated) => {
    setParcels(updated);
    localStorage.setItem('parcels', JSON.stringify(updated));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;

    if (editingId) {
      persist(parcels.map(p =>
        p.id === editingId ? { ...p, name: form.name, location: form.location } : p
      ));
      setEditingId(null);
    } else {
      persist([
        ...parcels,
        {
          id: Date.now(),
          name: form.name,
          location: form.location,
          temperature: +(20 + Math.random() * 10).toFixed(1),
          humidity: Math.floor(50 + Math.random() * 35),
          valve: { isOpen: false, flowRate: 0 },
        },
      ]);
    }
    setForm({ name: '', location: '' });
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, location: p.location });
    setEditingId(p.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this parcel?')) {
      persist(parcels.filter(p => p.id !== id));
    }
  };

  const handleValveChange = (id, newValve) => {
    persist(parcels.map(p => (p.id === id ? { ...p, valve: newValve } : p)));
  };

  const filtered = parcels.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] flex flex-col items-center">
      
      <div className="w-full max-w-[1100px]">
        <h1 className="text-white text-3xl md:text-4xl font-extrabold text-center mb-8 drop-shadow-lg tracking-wide">
          📋 Parcels Management
        </h1>

        {/* FORMULAIRE MODERNE */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-4 md:p-6 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="📝 Parcel name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="flex-1 px-5 py-3 rounded-xl bg-white/90 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
          <input
            type="text"
            placeholder="📍 Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
            className="flex-1 px-5 py-3 rounded-xl bg-white/90 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
          <button
            type="submit"
            className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition transform hover:-translate-y-1
              ${editingId ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-500 hover:bg-emerald-400'}`}
          >
            {editingId ? '✏️ Update' : '➕ Add Parcel'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setForm({ name: '', location: '' }); }}
              className="px-6 py-3 rounded-xl font-bold text-white bg-slate-500 hover:bg-slate-400 shadow-lg transition"
            >
              ✖ Cancel
            </button>
          )}
        </form>

        {/* RECHERCHE MODERNE */}
        <div className="max-w-[500px] mx-auto mb-8">
          <input
            type="text"
            placeholder="🔍 Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-3.5 rounded-full bg-white text-slate-800 placeholder-slate-400 outline-none focus:ring-4 focus:ring-sky-400/30 shadow-lg transition"
          />
        </div>

        {/* TABLEAU MODERNE */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/40">
          <table className="w-full border-collapse">
            <thead className="bg-[#0f172a] text-white">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold tracking-wider">#</th>
                <th className="px-5 py-4 text-left text-sm font-semibold tracking-wider">Name</th>
                <th className="px-5 py-4 text-left text-sm font-semibold tracking-wider">Location</th>
                <th className="px-5 py-4 text-center text-sm font-semibold tracking-wider">🌡️ Temp</th>
                <th className="px-5 py-4 text-center text-sm font-semibold tracking-wider">💧 Humidity</th>
                <th className="px-5 py-4 text-center text-sm font-semibold tracking-wider">🚰 Valve</th>
                <th className="px-5 py-4 text-center text-sm font-semibold tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((parcel, index) => (
                  <tr
                    key={parcel.id}
                    onClick={() => navigate(`/parcels/${parcel.id}`, { state: { parcel } })}
                    className="hover:bg-sky-50 transition cursor-pointer"
                  >
                    <td className="px-5 py-4 text-sm text-gray-500 font-medium">{index + 1}</td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-800">{parcel.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        📍 {parcel.location}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-600 font-bold text-sm">
                        {parcel.temperature}°C
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-600 font-bold text-sm">
                        {parcel.humidity}%
                      </span>
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center">
                        <ValveControl
                          valve={parcel.valve}
                          onChange={(v) => handleValveChange(parcel.id, v)}
                          compact
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(parcel)}
                          className="bg-amber-100 hover:bg-amber-200 p-2 rounded-lg transition hover:scale-110 text-amber-600 shadow-sm"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(parcel.id)}
                          className="bg-red-100 hover:bg-red-200 p-2 rounded-lg transition hover:scale-110 text-red-600 shadow-sm"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-slate-400 py-12 text-lg italic">
                    No parcels found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ParcelsList;