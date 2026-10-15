import { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [parcels] = useState([
    { id: 1, name: 'Parcel A', temperature: 24.5, humidity: 65, location: 'jan3oura' },
    { id: 2, name: 'Parcel B', temperature: 22.1, humidity: 70, location: 'South Field' },
    { id: 3, name: 'Parcel C', temperature: 26.8, humidity: 58, location: 'East Field' },
    { id: 4, name: 'Parcel D', temperature: 21.3, humidity: 75, location: 'West Field' },
    { id: 5, name: 'Parcel E', temperature: 25.0, humidity: 62, location: 'Center Field' },
    { id: 6, name: 'Parcel F', temperature: 23.7, humidity: 68, location: 'Hill Side' },
  ]);

  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🌱 Parcel Monitoring Dashboard</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search parcel by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="parcels-grid">
        {filteredParcels.length > 0 ? (
          filteredParcels.map((parcel) => (
            <div key={parcel.id} className="parcel-cube">
              <div className="parcel-top temperature">
                <span className="icon">🌡️</span>
                <span className="value">{parcel.temperature}°C</span>
                <span className="label">Temperature</span>
              </div>

              <div className="parcel-middle">
                <h3>{parcel.name}</h3>
                <p className="location">📍 {parcel.location}</p>
              </div>

              <div className="parcel-bottom humidity">
                <span className="icon">💧</span>
                <span className="value">{parcel.humidity}%</span>
                <span className="label">Humidity</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No parcels found matching "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;