import { useState } from 'react'
import { Link } from 'react-router-dom'

const GOALS = { steps: 10000, calories: 2000, water: 8, sleep: 8 }

function Badge({ value, goal }) {
  const met = value >= goal
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${met ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>
      {met ? '✓' : '✗'} {met ? 'Goal met' : 'Below goal'}
    </span>
  )
}

export default function History({ entries }) {
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [page, setPage] = useState(1)
  const PER_PAGE = 7

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
    setPage(1)
  }

  const sorted = [...entries].sort((a, b) => {
    let av = a[sortKey], bv = b[sortKey]
    if (typeof av === 'string') av = av.toLowerCase(), bv = bv.toLowerCase()
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sorted.length / PER_PAGE)
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <span className="text-gray-300 ml-1">↕</span>
    return <span className="text-green-500 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const cols = [
    { key: 'date',     label: 'Date' },
    { key: 'steps',    label: 'Steps' },
    { key: 'calories', label: 'Calories' },
    { key: 'water',    label: 'Water' },
    { key: 'sleep',    label: 'Sleep' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Activity History</h1>
          <p className="text-gray-500 text-sm mt-0.5">{entries.length} entries recorded</p>
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

      {/* Summary badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Days Logged',   value: entries.length,  icon: '📅' },
          { label: 'Goals Met',     value: entries.filter(e => e.steps >= GOALS.steps).length, icon: '🎯' },
          { label: 'Best Steps',    value: `${Math.max(...entries.map(e=>e.steps)).toLocaleString()}`, icon: '🏆' },
          { label: 'Best Sleep',    value: `${Math.max(...entries.map(e=>e.sleep))} hrs`, icon: '😴' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {cols.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className="text-left px-5 py-3.5 font-semibold text-gray-600 cursor-pointer hover:text-green-600 select-none whitespace-nowrap"
                  >
                    {col.label}<SortIcon col={col.key} />
                  </th>
                ))}
                <th className="text-left px-5 py-3.5 font-semibold text-gray-600 whitespace-nowrap">Steps Goal</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}
                >
                  <td className="px-5 py-3.5 font-medium text-gray-700 whitespace-nowrap">
                    {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 text-gray-800 font-semibold">
                    {entry.steps.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-gray-700">{entry.calories.toLocaleString()} kcal</td>
                  <td className="px-5 py-3.5 text-gray-700">{entry.water} gl</td>
                  <td className="px-5 py-3.5 text-gray-700">{entry.sleep} hrs</td>
                  <td className="px-5 py-3.5">
                    <Badge value={entry.steps} goal={GOALS.steps} />
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-400">
                    No entries yet. <Link to="/add" className="text-green-600 hover:underline">Add your first entry →</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 text-sm">
            <span className="text-gray-400">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
