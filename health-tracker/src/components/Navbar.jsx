import { useNavigate, useLocation } from 'react-router-dom'

const LINKS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/history', label: 'History' },
  { path: '/add', label: '+ Add Entry' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-xl font-bold text-emerald-700 tracking-tight hover:opacity-80 transition"
        >
          HealthTrack
        </button>
        <div className="flex items-center gap-1">
          {LINKS.map(({ path, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                pathname === path
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
