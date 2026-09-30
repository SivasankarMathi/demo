import { useNavigate } from "react-router-dom";
import { useHealth } from "../context/HealthContext";
import { GOALS } from "../data/mockData";

function Badge({ value, goal }) {
  const pct = (value / goal) * 100;
  const met = pct >= 100;
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ml-2 ${
        met ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
      }`}
    >
      {met ? "✓ Goal" : `${pct.toFixed(0)}%`}
    </span>
  );
}

export default function History() {
  const { entries } = useHealth();
  const navigate = useNavigate();

  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Entry History</h1>
            <p className="text-sm text-gray-400 mt-0.5">{entries.length} entries logged</p>
          </div>
          <button
            onClick={() => navigate("/add")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-emerald-200 active:scale-95"
          >
            + Add Entry
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Steps</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Calories</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Water</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Sleep</th>
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-gray-400">
                      <div className="text-3xl mb-2">📭</div>
                      No entries yet.{" "}
                      <button
                        onClick={() => navigate("/add")}
                        className="text-emerald-600 hover:underline"
                      >
                        Add your first entry.
                      </button>
                    </td>
                  </tr>
                ) : (
                  sorted.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-gray-50 hover:bg-emerald-50/40 transition-colors ${
                        i % 2 === 0 ? "" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {new Date(entry.date + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {entry.steps.toLocaleString()}
                        <Badge value={entry.steps} goal={GOALS.steps} />
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {entry.calories.toLocaleString()}
                        <span className="text-gray-400 text-xs ml-1">kcal</span>
                        <Badge value={entry.calories} goal={GOALS.calories} />
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {entry.water.toFixed(1)}
                        <span className="text-gray-400 text-xs ml-1">L</span>
                        <Badge value={entry.water} goal={GOALS.water} />
                      </td>
                      <td className="px-6 py-4 text-right text-gray-700">
                        {entry.sleep.toFixed(1)}
                        <span className="text-gray-400 text-xs ml-1">hrs</span>
                        <Badge value={entry.sleep} goal={GOALS.sleep} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary strip */}
        {sorted.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Steps", value: sorted.reduce((s, e) => s + e.steps, 0).toLocaleString(), unit: "" },
              { label: "Avg Calories", value: Math.round(sorted.reduce((s, e) => s + e.calories, 0) / sorted.length).toLocaleString(), unit: "kcal" },
              { label: "Avg Water", value: (sorted.reduce((s, e) => s + e.water, 0) / sorted.length).toFixed(1), unit: "L" },
              { label: "Avg Sleep", value: (sorted.reduce((s, e) => s + e.sleep, 0) / sorted.length).toFixed(1), unit: "hrs" },
            ].map(({ label, value, unit }) => (
              <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-lg font-bold text-gray-800">{value}<span className="text-xs font-normal text-gray-400 ml-1">{unit}</span></div>
                <div className="text-xs text-gray-400 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
