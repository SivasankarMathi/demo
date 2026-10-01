import { useNavigate } from 'react-router-dom'
import { useHealth } from '../context/HealthContext'

const STAT_CARDS = [
  {
    key: 'steps',
    label: 'Steps',
    icon: '👟',
    unit: '',
    goal: 10000,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    bar: 'bg-violet-500',
  },
  {
    key: 'calories',
    label: 'Calories',
    icon: '🔥',
    unit: 'kcal',
    goal: 2500,
    color: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    bar: 'bg-orange-400',
  },
  {
    key: 'water',
    label: 'Water',
    icon: '💧',
    unit: 'L',
    goal: 3,
    color: 'from-cyan-400 to-blue-500',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    bar: 'bg-cyan-400',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    icon: '😴',
    unit: 'hrs',
    goal: 8,
    color: 'from-indigo-400 to-indigo-600',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    bar: 'bg-indigo-400',
  },
]

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const STEPS_GOAL = 10000

export default function Dashboard() {
  const navigate = useNavigate()
  const { today, entries } = useHealth()

  // last 7 entries for the weekly chart
  const weekly = entries.slice(-7)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-emerald-600 font-bold text-xl"
          >
            🏃 HealthTracker
          </button>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => navigate('/history')}
              className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              History
            </button>
            <button
              onClick={() => navigate('/add')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              + Add Entry
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* Today's date */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Today's Stats
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STAT_CARDS.map(({ key, label, icon, unit, goal, bg, text, bar }) => {
            const value = today ? today[key] : 0
            const pct = Math.min(100, Math.round((value / goal) * 100))
            return (
              <div
                key={key}
                className={`${bg} rounded-2xl p-5 flex flex-col gap-3 shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{icon}</span>
                  <span className={`text-xs font-semibold ${text}`}>
                    {pct}%
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                    {label}
                  </p>
                  <p className={`text-2xl font-extrabold ${text} leading-tight`}>
                    {typeof value === 'number' && !Number.isInteger(value)
                      ? value.toFixed(1)
                      : value.toLocaleString()}
                    {unit && (
                      <span className="text-sm font-medium ml-1">{unit}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400">
                    Goal: {goal.toLocaleString()}{unit}
                  </p>
                </div>
                {/* progress bar */}
                <div className="w-full bg-white/60 rounded-full h-1.5">
                  <div
                    className={`${bar} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Weekly Steps Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Weekly Steps Progress
          </h3>
          <div className="flex items-end gap-2 h-40">
            {weekly.map((entry, i) => {
              const pct = Math.min(100, (entry.steps / STEPS_GOAL) * 100)
              const day = DAYS[new Date(entry.date + 'T12:00:00').getDay() === 0 ? 6 : new Date(entry.date + 'T12:00:00').getDay() - 1]
              const isToday = i === weekly.length - 1
              return (
                <div key={entry.id} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-gray-500">
                    {entry.steps.toLocaleString()}
                  </span>
                  <div className="w-full flex justify-center">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday ? 'bg-emerald-500' : 'bg-emerald-200'
                      }`}
                      style={{ height: `${(pct / 100) * 112}px` }}
                    />
                  </div>
                  <span className={`text-xs ${isToday ? 'font-bold text-emerald-600' : 'text-gray-400'}`}>
                    {day}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-emerald-500" /> Today
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-emerald-200" /> Previous days
            </span>
            <span className="ml-auto">Goal: {STEPS_GOAL.toLocaleString()} steps/day</span>
          </div>
        </div>

        {/* Quick nav */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/add')}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-md hover:shadow-lg"
          >
            + Add Entry
          </button>
          <button
            onClick={() => navigate('/history')}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-2xl text-lg transition-colors shadow-md border border-gray-200"
          >
            📋 View History
          </button>
        </div>
      </main>
    </div>
  )
}
