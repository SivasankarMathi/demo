import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';

function Badge({ value, goal, unit }) {
  const met = value >= goal;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${met ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
      {met ? '✓' : '—'} {value.toLocaleString()} {unit}
    </span>
  );
}

export default function History() {
  const navigate = useNavigate();
  const { entries } = useHealth();

  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-900 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">History</h1>
            <p className="text-slate-400 text-sm mt-0.5">{entries.length} entries recorded</p>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            + Add Entry
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Avg Steps', value: Math.round(entries.reduce((s, e) => s + e.steps, 0) / entries.length).toLocaleString(), icon: '👟' },
            { label: 'Avg Calories', value: Math.round(entries.reduce((s, e) => s + e.calories, 0) / entries.length).toLocaleString(), icon: '🔥' },
            { label: 'Avg Water', value: (entries.reduce((s, e) => s + e.water, 0) / entries.length).toFixed(1), icon: '💧' },
            { label: 'Avg Sleep', value: (entries.reduce((s, e) => s + e.sleep, 0) / entries.length).toFixed(1) + ' hrs', icon: '😴' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-white font-bold">{value}</div>
              <div className="text-slate-500 text-xs">{label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/80">
                  <th className="text-left text-slate-400 font-medium px-5 py-3">Date</th>
                  <th className="text-left text-slate-400 font-medium px-5 py-3">Steps</th>
                  <th className="text-left text-slate-400 font-medium px-5 py-3">Calories</th>
                  <th className="text-left text-slate-400 font-medium px-5 py-3 hidden sm:table-cell">Water</th>
                  <th className="text-left text-slate-400 font-medium px-5 py-3 hidden sm:table-cell">Sleep</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry, idx) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${idx === 0 ? 'bg-emerald-500/5' : ''}`}
                  >
                    <td className="px-5 py-4 text-white font-medium">
                      {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                      {idx === 0 && <span className="ml-2 text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">Today</span>}
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={entry.steps} goal={10000} unit="steps" />
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={entry.calories} goal={2000} unit="kcal" />
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <Badge value={entry.water} goal={8} unit="cups" />
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <Badge value={entry.sleep} goal={8} unit="hrs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {entries.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No entries yet. <button onClick={() => navigate('/add')} className="text-emerald-400 hover:underline">Add your first entry</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
