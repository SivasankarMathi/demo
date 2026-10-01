import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHealth } from '../context/HealthContext'

const GOALS = { steps: 10000, calories: 2500, water: 8, sleep: 8 }

function Badge({ value, goal }) {
  if (!goal) return null
  const pct = (value / goal) * 100
  if (pct >= 100) return <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">✓</span>
  if (pct >= 70) return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">~</span>
  return <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">↓</span>
}

export default function History() {
  const { entries } = useHealth()
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')

  const sorted = [...entries].sort((a, b) => {
    const va = a[sortKey]
    const vb = b[sortKey]
    if (sortKey === 'date') {
      return sortDir === 'desc'
        ? new Date(vb) - new Date(va)
        : new Date(va) - new Date(vb)
    }
    return sortDir === 'desc' ? vb - va : va - vb
  })

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span className="text-gray-700">↕</span>
    return <span className="text-emerald-400">{sortDir === 'desc' ? '↓' : '↑'}</span>
  }

  const columns = [
    { key: 'date',     label: 'Date' },
    { key: 'steps',    label: 'Steps' },
    { key: 'calories', label: 'Calories' },
    { key: 'water',    label: 'Water' },
    { key: 'sleep',    label: 'Sleep' },
  ]

  // Summary row
  const avg = (key) =>
    entries.length ? Math.round(entries.reduce((s, e) => s + (e[key] || 0), 0) / entries.length) : 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-gray-400 mt-1">{entries.length} entries logged</p>
        </div>
        <Link
          to="/add"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-all"
        >
          + Add Entry
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Avg Steps',    value: avg('steps').toLocaleString(),    icon: '👟', color: 'text-emerald-400' },
          { label: 'Avg Calories', value: avg('calories').toLocaleString(), icon: '🔥', color: 'text-orange-400' },
          { label: 'Avg Water',    value: avg('water') + ' glasses',        icon: '💧', color: 'text-blue-400' },
          { label: 'Avg Sleep',    value: avg('sleep') + ' hrs',            icon: '😴', color: 'text-purple-400' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-xl mb-1">{icon}</div>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                {columns.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => toggleSort(key)}
                    className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white select-none transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      {label} <SortIcon col={key} />
                    </span>
                  </th>
                ))}
                <th className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => {
                const isToday = entry.date === new Date().toISOString().split('T')[0]
                return (
                  <tr
                    key={entry.id || entry.date}
                    className={`border-b border-gray-800/50 last:border-0 transition-colors ${
                      isToday ? 'bg-emerald-500/5' : 'hover:bg-gray-800/40'
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {new Date(entry.date + 'T12:00:00').toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        {isToday && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                            Today
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{entry.steps.toLocaleString()}</span>
                        <Badge value={entry.steps} goal={GOALS.steps} />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span>{entry.calories.toLocaleString()} kcal</span>
                        <Badge value={entry.calories} goal={GOALS.calories} />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span>{entry.water} glasses</span>
                        <Badge value={entry.water} goal={GOALS.water} />
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span>{entry.sleep} hrs</span>
                        {entry.sleep > 0 && <Badge value={entry.sleep} goal={GOALS.sleep} />}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {['steps','calories','water'].filter(k => entry[k] >= GOALS[k]).length >= 3
                        ? <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">🏆 Great day</span>
                        : ['steps','calories','water'].filter(k => entry[k] >= GOALS[k] * 0.7).length >= 2
                        ? <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 font-medium">👍 Good</span>
                        : <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-400 font-medium">📈 Keep going</span>
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
