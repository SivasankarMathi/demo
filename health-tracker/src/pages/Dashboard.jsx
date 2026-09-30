import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';

const GOALS = { steps: 10000, calories: 2000, water: 8, sleep: 8 };

function StatCard({ icon, label, value, unit, goal, color }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pct >= 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
          {pct}%
        </span>
      </div>
      <div>
        <div className="text-2xl font-bold text-white">
          {value.toLocaleString()}
          <span className="text-sm font-normal text-slate-400 ml-1">{unit}</span>
        </div>
        <div className="text-slate-500 text-sm">{label}</div>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-slate-500">Goal: {goal.toLocaleString()} {unit}</div>
    </div>
  );
}

function WeeklyChart({ data }) {
  const max = Math.max(...data.map(d => d.steps), 1);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-white font-semibold text-lg mb-6">Weekly Steps</h2>
      <div className="flex items-end gap-3 h-40">
        {data.map((d) => {
          const heightPct = Math.round((d.steps / max) * 100);
          const isGoalMet = d.steps >= GOALS.steps;
          const label = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
          return (
            <div key={d.date} className="flex flex-col items-center flex-1 gap-1 group">
              <div className="relative w-full flex flex-col items-center">
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {d.steps.toLocaleString()}
                </div>
                <div
                  className={`w-full rounded-t-md transition-all ${isGoalMet ? 'bg-emerald-500' : 'bg-slate-600'}`}
                  style={{ height: `${Math.max(heightPct * 1.4, 4)}px` }}
                />
              </div>
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Goal met</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-slate-600 inline-block" /> Below goal</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { todayEntry, last7 } = useHealth();

  const stats = [
    { icon: '👟', label: "Today's Steps", value: todayEntry.steps, unit: 'steps', goal: GOALS.steps, color: 'bg-blue-500' },
    { icon: '🔥', label: 'Calories Burned', value: todayEntry.calories, unit: 'kcal', goal: GOALS.calories, color: 'bg-orange-500' },
    { icon: '💧', label: 'Water Intake', value: todayEntry.water, unit: 'cups', goal: GOALS.water, color: 'bg-cyan-500' },
    { icon: '😴', label: 'Sleep', value: todayEntry.sleep, unit: 'hrs', goal: GOALS.sleep, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-900 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button
            onClick={() => navigate('/add')}
            className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            + Add Entry
          </button>
        </div>

        {/* Today's stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        {/* Weekly chart */}
        <WeeklyChart data={last7} />
      </div>
    </div>
  );
}
