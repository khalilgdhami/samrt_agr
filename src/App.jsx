import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './Dashboard';
import ParcelsList from './ParcelsList';
import ParcelDetail from './ParcelDetail';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="layout">

        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <span className="logo">🌱</span>
            {sidebarOpen && <h2>AgriDash</h2>}
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/"
              end
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              {sidebarOpen && <span className="nav-label">Dashboard</span>}
            </NavLink>

            <NavLink
              to="/parcels"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">📋</span>
              {sidebarOpen && <span className="nav-label">Parcels</span>}
            </NavLink>
          </nav>

          <button
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </aside>

        {/* CONTENU */}
        <main className={`content ${sidebarOpen ? 'shifted' : 'full'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/parcels" element={<ParcelsList />} />
            <Route path="/parcels/:id" element={<ParcelDetail />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;