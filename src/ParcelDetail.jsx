import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ParcelDetail.css';

const ParcelDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const parcel = state?.parcel;

  if (!parcel) {
    return (
      <div className="detail-page">
        <p className="error">❌ Parcel not found</p>
        <button className="back-btn" onClick={() => navigate('/parcels')}>← Back</button>
      </div>
    );
  }

  const tempStatus =
    parcel.temperature > 28 ? 'high' :
    parcel.temperature < 20 ? 'low' : 'normal';

  const humStatus =
    parcel.humidity > 75 ? 'high' :
    parcel.humidity < 40 ? 'low' : 'normal';

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate('/parcels')}>← Back</button>

      <div className="detail-card">
        <h1>🌱 {parcel.name}</h1>
        <p className="detail-location">📍 {parcel.location}</p>

        <div className="detail-grid">
          <div className={`detail-box temp ${tempStatus}`}>
            <span className="detail-icon">🌡️</span>
            <span className="detail-value">{parcel.temperature}°C</span>
            <span className="detail-label">Temperature</span>
            <span className="detail-status">
              {tempStatus === 'high' ? '🔴 Too High' :
               tempStatus === 'low' ? '🔵 Too Low' : '🟢 Normal'}
            </span>
          </div>

          <div className={`detail-box hum ${humStatus}`}>
            <span className="detail-icon">💧</span>
            <span className="detail-value">{parcel.humidity}%</span>
            <span className="detail-label">Humidity</span>
            <span className="detail-status">
              {humStatus === 'high' ? '🔴 Too High' :
               humStatus === 'low' ? '🔵 Too Low' : '🟢 Normal'}
            </span>
          </div>
        </div>

        <div className="detail-info">
          <p><strong>ID:</strong> {parcel.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ParcelDetail;