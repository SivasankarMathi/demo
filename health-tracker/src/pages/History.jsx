import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function History({ entries }) {
  const navigate = useNavigate()
  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">History</h1>
            <p className="text-gray-500 mt-1">{sorted.length} entries recorded</p>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl shadow shadow-emerald-200 transition-all text-sm"
          >
            + Add Entry
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">
                  Steps
                </th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">
                  Calories
                </th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">
                  Water (L)
                </th>
                <th className="text-right px-6 py-4 font-semibold text-gray-500 uppercase text-xs tracking-wider hidden md:table-cell">
                  Sleep (hrs)
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={`border-b border-gray-50 hover:bg-emerald-50/40 transition-colors ${
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <span>
                        {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {i === 0 && (
                        <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                          Latest
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-violet-600 font-semibold">
                        {entry.steps.toLocaleString()}
                      </span>
                      <span className="text-gray-300 text-xs">steps</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-orange-500 font-semibold">
                        {entry.calories.toLocaleString()}
                      </span>
                      <span className="text-gray-300 text-xs">kcal</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right hidden md:table-cell">
                    <span className="text-sky-500 font-semibold">{entry.water.toFixed(1)}</span>
                    <span className="text-gray-300 text-xs ml-1">L</span>
                  </td>
                  <td className="px-6 py-4 text-right hidden md:table-cell">
                    <span className="text-indigo-500 font-semibold">{entry.sleep.toFixed(1)}</span>
                    <span className="text-gray-300 text-xs ml-1">hrs</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sorted.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-medium">No entries yet</p>
              <p className="text-sm mt-1">Add your first entry to see it here</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-start">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-emerald-600 hover:text-emerald-800 font-medium text-sm transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  )
}
