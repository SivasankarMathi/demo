import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">💪</span>
          <span className="font-bold text-xl tracking-tight">
            <span className="text-emerald-400">Health</span>
            <span className="text-white">Track</span>
          </span>
        </Link>

        {!isHome && (
          <div className="flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/add"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-gray-950 transition-colors"
            >
              + Add Entry
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
