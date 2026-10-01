import { Link } from 'react-router-dom'
import { useHealth } from '../context/HealthContext'
import StatCard from '../components/StatCard'
import WeeklyChart from '../components/WeeklyChart'

const stats = [
  { key: 'steps',    icon: '👟', label: 'Steps',    unit: 'steps',   goal: 10000, color: 'emerald' },
  { key: 'calories', icon: '🔥', label: 'Calories', unit: 'kcal',    goal: 2500,  color: 'orange'  },
  { key: 'water',    icon: '💧', label: 'Water',    unit: 'glasses', goal: 8,     color: 'blue'    },
  { key: 'sleep',    icon: '😴', label: 'Sleep',    unit: 'hrs',     goal: 8,     color: 'purple'  },
]

export default function Dashboard() {
  const { todayEntry } = useHealth()

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400 mt-1">{todayStr}</p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span> Add Entry
        </Link>
      </div>

      {/* Today's Stats */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Today's Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ key, icon, label, unit, goal, color }) => (
            <StatCard
              key={key}
              icon={icon}
              label={label}
              value={todayEntry[key] ?? 0}
              unit={unit}
              goal={goal}
              color={color}
            />
          ))}
        </div>
      </section>

      {/* Weekly Chart */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Weekly Progress
        </h2>
        <WeeklyChart />
      </section>

      {/* Quick actions */}
      <section className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl shrink-0">
            📊
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold">View Full History</div>
            <div className="text-gray-400 text-sm">See all your past entries</div>
          </div>
          <Link
            to="/history"
            className="shrink-0 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
          >
            View →
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-2xl shrink-0">
            ✏️
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold">Log Today's Data</div>
            <div className="text-gray-400 text-sm">Update your daily stats</div>
          </div>
          <Link
            to="/add"
            className="shrink-0 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors"
          >
            Add →
          </Link>
        </div>
      </section>
    </div>
  )
}
