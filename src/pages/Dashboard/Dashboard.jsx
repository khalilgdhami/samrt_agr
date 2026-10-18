import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParcelCard from '../../components/ParcelCard/ParcelCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { initialParcels } from '../../data/parcelsData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('parcels');
    setParcels(saved ? JSON.parse(saved) : initialParcels);
  }, []);

  const handleValveChange = (id, newValve) => {
    const updated = parcels.map(p => (p.id === id ? { ...p, valve: newValve } : p));
    setParcels(updated);
    localStorage.setItem('parcels', JSON.stringify(updated));
  };

  const filtered = parcels.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] flex flex-col items-center">
      
      <div className="w-full max-w-[1400px]">
        <header className="flex flex-col items-center gap-6 mb-12">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold drop-shadow-lg tracking-wide text-center">
            🌱 Parcel Monitoring Dashboard
          </h1>
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search parcel..." />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.length > 0 ? (
            filtered.map(parcel => (
              <ParcelCard
                key={parcel.id}
                parcel={parcel}
                onValveChange={handleValveChange}
                onClick={() => navigate(`/parcels/${parcel.id}`, { state: { parcel } })}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white/80 text-lg p-10 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
              No parcels found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;