import { useNavigate } from 'react-router-dom'
import { useHealth } from '../context/HealthContext'

function badge(value, goal, unit = '') {
  const pct = (value / goal) * 100
  const display = typeof value === 'number' && !Number.isInteger(value)
    ? value.toFixed(1)
    : value.toLocaleString()
  const label = `${display}${unit}`
  if (pct >= 100)
    return <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">{label} ✅</span>
  if (pct >= 70)
    return <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">{label}</span>
  return <span className="inline-flex items-center gap-1 text-red-500 font-semibold">{label}</span>
}

export default function History() {
  const navigate = useNavigate()
  const { entries } = useHealth()

  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-gray-700 transition-colors text-xl"
              aria-label="Back"
            >
              ←
            </button>
            <span className="font-bold text-gray-800 text-lg">History</span>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            + Add Entry
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">All Entries</h2>
            <span className="text-sm text-gray-400">{sorted.length} records</span>
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">No entries yet.</p>
              <button
                onClick={() => navigate('/add')}
                className="mt-4 text-emerald-600 font-semibold hover:underline"
              >
                Add your first entry →
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
                    <th className="text-left px-6 py-3 font-semibold">Date</th>
                    <th className="text-right px-6 py-3 font-semibold">👟 Steps</th>
                    <th className="text-right px-6 py-3 font-semibold">🔥 Calories</th>
                    <th className="text-right px-6 py-3 font-semibold">💧 Water</th>
                    <th className="text-right px-6 py-3 font-semibold">😴 Sleep</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sorted.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className={`hover:bg-gray-50 transition-colors ${i === 0 ? 'bg-emerald-50/40' : ''}`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">
                        {new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        {i === 0 && (
                          <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                            Latest
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {badge(entry.steps, 10000)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {badge(entry.calories, 2500, ' kcal')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {badge(entry.water, 3, ' L')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {badge(entry.sleep, 8, ' hrs')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-6 text-xs text-gray-400 px-1">
          <span className="text-emerald-600 font-semibold">✅ = Goal reached</span>
          <span className="text-amber-500 font-semibold">Orange = ≥70% of goal</span>
          <span className="text-red-500 font-semibold">Red = &lt;70% of goal</span>
        </div>
      </main>
    </div>
  )
}
