import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ParcelsList.css';

const ParcelsList = () => {
  const navigate = useNavigate();

  const [parcels, setParcels] = useState([
    { id: 1, name: 'Parcel A', location: 'North Field', temperature: 24.5, humidity: 65 },
    { id: 2, name: 'Parcel B', location: 'South Field', temperature: 22.1, humidity: 70 },
    { id: 3, name: 'Parcel C', location: 'East Field', temperature: 26.8, humidity: 58 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', location: '' });
  const [editingId, setEditingId] = useState(null);

  // ➕ Ajouter ou ✏️ Modifier
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;

    if (editingId) {
      setParcels(parcels.map(p =>
        p.id === editingId ? { ...p, name: form.name, location: form.location } : p
      ));
      setEditingId(null);
    } else {
      const newParcel = {
        id: Date.now(),
        name: form.name,
        location: form.location,
        temperature: (20 + Math.random() * 10).toFixed(1),
        humidity: Math.floor(50 + Math.random() * 35),
      };
      setParcels([...parcels, newParcel]);
    }
    setForm({ name: '', location: '' });
  };

  // ✏️ Préparer la modification
  const handleEdit = (parcel) => {
    setForm({ name: parcel.name, location: parcel.location });
    setEditingId(parcel.id);
  };

  // ❌ Supprimer
  const handleDelete = (id) => {
    if (window.confirm('Delete this parcel?')) {
      setParcels(parcels.filter(p => p.id !== id));
    }
  };

  // 🔍 Filtrage
  const filtered = parcels.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="parcels-page">
      <h1>📋 Parcels Management</h1>

      {/* FORMULAIRE */}
      <form className="parcel-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Parcel name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <button type="submit" className={editingId ? 'btn-update' : 'btn-add'}>
          {editingId ? '✏️ Update' : '➕ Add Parcel'}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn-cancel"
            onClick={() => { setEditingId(null); setForm({ name: '', location: '' }); }}
          >
            ✖ Cancel
          </button>
        )}
      </form>

      {/* RECHERCHE */}
      <div className="search-bar-list">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLEAU */}
      <div className="table-wrapper">
        <table className="parcels-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Location</th>
              <th>🌡️ Temp</th>
              <th>💧 Humidity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((parcel, index) => (
                <tr
                  key={parcel.id}
                  onClick={() => navigate(`/parcels/${parcel.id}`, { state: { parcel } })}
                  className="clickable-row"
                >
                  <td>{index + 1}</td>
                  <td><strong>{parcel.name}</strong></td>
                  <td>📍 {parcel.location}</td>
                  <td className="temp-cell">{parcel.temperature}°C</td>
                  <td className="hum-cell">{parcel.humidity}%</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="btn-edit" onClick={() => handleEdit(parcel)}>✏️</button>
                    <button className="btn-delete" onClick={() => handleDelete(parcel.id)}>🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="no-data">No parcels found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParcelsList;