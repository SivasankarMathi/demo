import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-green-100 text-green-700'
        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
    }`

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-green-600 text-lg">
          <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#22c55e"/>
            <path d="M7 16 L11 10 L16 20 L21 13 L25 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          HealthTrack
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/"          className={linkClass}>Home</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/history"   className={linkClass}>History</NavLink>
          <NavLink to="/add"       className="ml-2 px-4 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
            + Add Entry
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
