import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-600 text-white'
        : 'text-slate-300 hover:text-white hover:bg-slate-700'
    }`;

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight flex items-center gap-2">
          <span className="text-emerald-400">💚</span> HealthTrack
        </span>
        <div className="flex gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>
          <NavLink to="/add" className={linkClass}>Add Entry</NavLink>
        </div>
      </div>
    </nav>
  );
}
