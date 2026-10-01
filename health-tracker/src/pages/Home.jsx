import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 flex flex-col items-center justify-center text-white px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <div className="flex justify-center mb-6">
          <span className="text-7xl">🏃</span>
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          HealthTracker
        </h1>
        <p className="text-xl text-emerald-100 mb-10 leading-relaxed">
          Monitor your steps, calories, hydration, and sleep — all in one
          beautiful, simple dashboard. Build better habits, one day at a time.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-emerald-600 font-bold text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Start Tracking →
        </button>
      </div>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-16">
        {[
          { icon: '👟', label: 'Step Counter' },
          { icon: '🔥', label: 'Calorie Log' },
          { icon: '💧', label: 'Hydration' },
          { icon: '😴', label: 'Sleep Tracker' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium"
          >
            <span>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
