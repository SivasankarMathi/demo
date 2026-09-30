import { Link } from 'react-router-dom'

const GOALS = { steps: 10000, calories: 2000, water: 8, sleep: 8 }

const statCards = [
  {
    key: 'steps',
    label: 'Steps',
    icon: '👟',
    unit: 'steps',
    color: 'blue',
    bg: 'bg-blue-50',
    ring: 'bg-blue-500',
    text: 'text-blue-700',
    border: 'border-blue-100',
  },
  {
    key: 'calories',
    label: 'Calories',
    icon: '🔥',
    unit: 'kcal',
    color: 'orange',
    bg: 'bg-orange-50',
    ring: 'bg-orange-500',
    text: 'text-orange-700',
    border: 'border-orange-100',
  },
  {
    key: 'water',
    label: 'Water',
    icon: '💧',
    unit: 'glasses',
    color: 'cyan',
    bg: 'bg-cyan-50',
    ring: 'bg-cyan-500',
    text: 'text-cyan-700',
    border: 'border-cyan-100',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    icon: '😴',
    unit: 'hrs',
    color: 'purple',
    bg: 'bg-purple-50',
    ring: 'bg-purple-500',
    text: 'text-purple-700',
    border: 'border-purple-100',
  },
]

function StatCard({ card, value }) {
  const goal = GOALS[card.key]
  const pct = Math.min(100, Math.round((value / goal) * 100))

  return (
    <div className={`${card.bg} ${card.border} border rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{card.icon}</span>
        <span className={`text-xs font-semibold ${card.text} px-2 py-0.5 bg-white rounded-full border ${card.border}`}>
          {pct}% of goal
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">
          {value.toLocaleString()}
          <span className="text-sm font-normal text-gray-500 ml-1">{card.unit}</span>
        </p>
        <p className="text-sm text-gray-500 mt-0.5">{card.label} today</p>
      </div>
      <div className="h-2 bg-white rounded-full overflow-hidden">
        <div
          className={`h-full ${card.ring} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400">Goal: {goal.toLocaleString()} {card.unit}</p>
    </div>
  )
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function WeeklyChart({ entries }) {
  const week = entries.slice(0, 7).reverse()
  const maxSteps = Math.max(...week.map((e) => e.steps), 1)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-gray-800 text-lg">Weekly Steps</h2>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border">Last 7 days</span>
      </div>
      <div className="flex items-end gap-3 h-40">
        {week.map((entry, i) => {
          const heightPct = (entry.steps / maxSteps) * 100
          const dayLabel = DAY_LABELS[new Date(entry.date + 'T00:00:00').getDay()] || DAY_LABELS[i]
          const isGoalMet = entry.steps >= GOALS.steps
          return (
            <div key={entry.id} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-gray-400">{entry.steps >= 1000 ? `${(entry.steps/1000).toFixed(1)}k` : entry.steps}</span>
              <div className="w-full flex items-end h-28">
                <div
                  className={`w-full rounded-t-lg transition-all duration-500 ${isGoalMet ? 'bg-green-400' : 'bg-blue-300'}`}
                  style={{ height: `${heightPct}%` }}
                  title={`${entry.steps.toLocaleString()} steps`}
                />
              </div>
              <span className="text-[11px] text-gray-500 font-medium">{dayLabel}</span>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-400 inline-block" /> Goal met</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-300 inline-block" /> Below goal</span>
      </div>
    </div>
  )
}

export default function Dashboard({ today, entries }) {
  const displayToday = today || {
    steps: 0,
    calories: 0,
    water: 0,
    sleep: 0,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Today's Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Entry
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.key} card={card} value={displayToday[card.key] || 0} />
        ))}
      </div>

      {/* Weekly chart + summary */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WeeklyChart entries={entries} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3 flex-1">
            <h2 className="font-bold text-gray-800">Weekly Summary</h2>
            {[
              { label: 'Avg Steps',    value: `${Math.round(entries.slice(0,7).reduce((s,e) => s+e.steps,0)/Math.min(entries.length,7)).toLocaleString()}`, icon: '👟' },
              { label: 'Avg Calories', value: `${Math.round(entries.slice(0,7).reduce((s,e) => s+e.calories,0)/Math.min(entries.length,7))} kcal`, icon: '🔥' },
              { label: 'Avg Water',    value: `${(entries.slice(0,7).reduce((s,e) => s+e.water,0)/Math.min(entries.length,7)).toFixed(1)} gl`, icon: '💧' },
              { label: 'Avg Sleep',    value: `${(entries.slice(0,7).reduce((s,e) => s+e.sleep,0)/Math.min(entries.length,7)).toFixed(1)} hrs`, icon: '😴' },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-gray-500">
                  <span>{row.icon}</span>{row.label}
                </span>
                <span className="font-semibold text-gray-800">{row.value}</span>
              </div>
            ))}
          </div>
          <Link
            to="/history"
            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl p-4 flex items-center justify-between text-sm font-medium text-gray-700 transition-colors"
          >
            <span>View Full History</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
