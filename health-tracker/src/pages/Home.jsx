import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 flex flex-col">
      {/* Navbar */}
      <nav className="w-full px-8 py-5 flex items-center justify-between">
        <span className="text-2xl font-bold text-emerald-700 tracking-tight">
          HealthTrack
        </span>
        <button
          onClick={() => navigate('/history')}
          className="text-sm font-medium text-emerald-600 hover:text-emerald-800 transition"
        >
          History
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full">
            🌱 Your wellness journey starts here
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Track Your Health,{' '}
            <span className="text-emerald-600">Every Day</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
            Monitor steps, calories, hydration, and sleep in one beautiful
            dashboard. Build habits that last.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-lg px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all duration-200"
          >
            Start Tracking →
          </button>
        </div>

        {/* Feature pills */}
        <div className="mt-20 flex flex-wrap gap-4 justify-center">
          {[
            { icon: '👟', label: 'Steps' },
            { icon: '🔥', label: 'Calories' },
            { icon: '💧', label: 'Water' },
            { icon: '😴', label: 'Sleep' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-white/70 backdrop-blur border border-white/80 rounded-2xl px-5 py-3 shadow-sm text-gray-700 font-medium"
            >
              <span className="text-xl">{icon}</span>
              {label}
            </div>
          ))}
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-6">
        © 2025 HealthTrack · Built with React & Tailwind CSS
      </footer>
    </div>
  )
}
