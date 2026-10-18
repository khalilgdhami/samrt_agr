import { NavLink } from 'react-router-dom';

const Sidebar = ({ open, onToggle }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen flex flex-col z-50
        bg-gradient-to-b from-[#0f172a] to-[#1e3c72]
        border-r border-white/10 shadow-2xl
        transition-all duration-300
        ${open ? 'w-60' : 'w-[70px]'}
      `}
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <span className="text-2xl flex-shrink-0">🌱</span>
        {open && (
          <h2 className="text-white text-lg font-bold tracking-wide whitespace-nowrap">
            AgriDash
          </h2>
        )}
      </div>

      <nav className="flex-1 flex flex-col gap-2 p-3">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all
            ${isActive
              ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-white shadow-lg shadow-sky-400/40'
              : 'text-slate-400 hover:bg-white/10 hover:text-white'}
            ${!open ? 'justify-center px-3.5' : ''}`
          }
        >
          <span className="text-xl flex-shrink-0 w-6 text-center">📊</span>
          {open && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/parcels"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-3 rounded-xl font-semibold text-sm transition-all
            ${isActive
              ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-white shadow-lg shadow-sky-400/40'
              : 'text-slate-400 hover:bg-white/10 hover:text-white'}
            ${!open ? 'justify-center px-3.5' : ''}`
          }
        >
          <span className="text-xl flex-shrink-0 w-6 text-center">📋</span>
          {open && <span>Parcels</span>}
        </NavLink>
      </nav>

      <button
        onClick={onToggle}
        className="m-4 p-2.5 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition"
      >
        {open ? '◀' : '▶'}
      </button>
    </aside>
  );
};

export default Sidebar;