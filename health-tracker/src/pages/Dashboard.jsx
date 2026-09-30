import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const GOALS = { steps: 10000, calories: 2200, water: 3.0, sleep: 8 }

const STAT_CARDS = [
  {
    key: 'steps',
    label: 'Steps',
    icon: '👟',
    unit: '',
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
    color: 'from-orange-400 to-rose-500',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    bar: 'bg-orange-500',
  },
  {
    key: 'water',
    label: 'Water',
    icon: '💧',
    unit: 'L',
    color: 'from-sky-400 to-cyan-500',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    bar: 'bg-sky-500',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    icon: '😴',
    unit: 'hrs',
    color: 'from-indigo-400 to-blue-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    bar: 'bg-indigo-500',
  },
]

export default function Dashboard({ entries }) {
  const navigate = useNavigate()

  // Today = last entry
  const today = entries[entries.length - 1] ?? {}
  // Last 7 entries for the chart
  const weekly = entries.slice(-7)

  const maxSteps = Math.max(...weekly.map((e) => e.steps), 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Today's Overview</h1>
            <p className="text-gray-500 mt-1">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl shadow shadow-emerald-200 transition-all"
          >
            + Add Entry
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {STAT_CARDS.map(({ key, label, icon, unit, bg, text, bar }) => {
            const value = today[key] ?? 0
            const goal = GOALS[key]
            const pct = Math.min(100, Math.round((value / goal) * 100))
            return (
              <div
                key={key}
                className={`${bg} rounded-2xl p-5 flex flex-col gap-3 shadow-sm border border-white`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{icon}</span>
                  <span className={`text-xs font-semibold ${text} bg-white/70 px-2 py-0.5 rounded-full`}>
                    {pct}%
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className={`text-2xl font-bold ${text}`}>
                    {typeof value === 'number' && !Number.isInteger(value)
                      ? value.toFixed(1)
                      : value.toLocaleString()}
                    {unit && (
                      <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Goal: {typeof goal === 'number' && !Number.isInteger(goal) ? goal.toFixed(1) : goal.toLocaleString()}{unit ? ` ${unit}` : ''}
                  </p>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white/60 rounded-full h-1.5 mt-1">
                  <div
                    className={`${bar} h-1.5 rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Weekly Steps</h2>
          <div className="flex items-end gap-3 h-40">
            {weekly.map((entry, i) => {
              const pct = (entry.steps / maxSteps) * 100
              const isToday = i === weekly.length - 1
              return (
                <div key={entry.id} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium">
                    {(entry.steps / 1000).toFixed(1)}k
                  </span>
                  <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday ? 'bg-emerald-500' : 'bg-emerald-200'
                      }`}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                    })}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Green bar = today · Goal: {GOALS.steps.toLocaleString()} steps
          </p>
        </div>

        {/* Quick nav */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate('/history')}
            className="text-emerald-600 hover:text-emerald-800 font-medium text-sm transition"
          >
            View full history →
          </button>
        </div>
      </main>
    </div>
  )
}
