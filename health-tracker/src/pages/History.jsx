import { useNavigate } from 'react-router-dom';

function Badge({ value, goal, unit, color }) {
  const pct = Math.round((value / goal) * 100);
  const met = pct >= 100;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ background: (met ? color : '#e5e7eb') + '44', color: met ? color : '#6b7280' }}
    >
      {met ? '✓' : ''} {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value.toLocaleString()} {unit}
    </span>
  );
}

const goals = { steps: 10000, calories: 2200, water: 2.5, sleep: 8 };

export default function History({ entries }) {
  const navigate = useNavigate();
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">History</h1>
          <p className="text-gray-400 text-sm mt-1">{entries.length} entries recorded</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-full shadow hover:bg-brand-700 transition-all flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-500">No entries yet. Start tracking your health!</p>
          <button
            onClick={() => navigate('/add')}
            className="mt-4 px-6 py-2 bg-brand-600 text-white rounded-full hover:bg-brand-700 transition-colors"
          >
            Add First Entry
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Date', 'Steps', 'Calories', 'Water', 'Sleep', 'Score'].map(h => (
                  <th key={h} className="px-5 py-4 text-left font-semibold text-gray-500 text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, idx) => {
                const score = Math.round(
                  ([
                    entry.steps    / goals.steps,
                    entry.calories / goals.calories,
                    entry.water    / goals.water,
                    entry.sleep    / goals.sleep,
                  ].reduce((a, b) => a + Math.min(1, b), 0) / 4) * 100
                );
                return (
                  <tr
                    key={entry.id ?? idx}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-gray-700">
                      {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={entry.steps}    goal={goals.steps}    unit="steps" color="#22c55e" />
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={entry.calories} goal={goals.calories} unit="kcal"  color="#f97316" />
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={entry.water}    goal={goals.water}    unit="L"     color="#3b82f6" />
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={entry.sleep}    goal={goals.sleep}    unit="hrs"   color="#8b5cf6" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-brand-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-500">{score}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
