import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { goals } from '../data/mockData';

const COLORS = {
  steps:    '#22c55e',
  calories: '#f97316',
  water:    '#3b82f6',
  sleep:    '#8b5cf6',
};

function StatCard({ icon, label, value, unit, goal, color }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <span className="text-sm font-medium text-gray-500">{label}</span>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: color + '22', color }}>
          {pct}%
        </span>
      </div>
      <p className="text-3xl font-extrabold text-gray-800">
        {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(1) : value.toLocaleString()}
        <span className="text-base font-normal text-gray-400 ml-1">{unit}</span>
      </p>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <p className="text-xs text-gray-400">Goal: {goal.toLocaleString()} {unit}</p>
    </div>
  );
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Dashboard({ entries }) {
  const navigate = useNavigate();
  const latest = entries[entries.length - 1] || {};

  const weeklyData = entries.slice(-7).map((e, i) => ({
    day:   DAY_LABELS[i] ?? `D${i + 1}`,
    steps: e.steps,
  }));

  const stats = [
    { icon: '👟', label: 'Steps',    key: 'steps',    unit: 'steps', color: COLORS.steps    },
    { icon: '🔥', label: 'Calories', key: 'calories', unit: 'kcal',  color: COLORS.calories },
    { icon: '💧', label: 'Water',    key: 'water',    unit: 'L',     color: COLORS.water    },
    { icon: '🌙', label: 'Sleep',    key: 'sleep',    unit: 'hrs',   color: COLORS.sleep    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Today's Overview</h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="px-5 py-2.5 bg-brand-600 text-white font-semibold rounded-full shadow hover:bg-brand-700 hover:shadow-md transition-all flex items-center gap-2"
        >
          <span className="text-lg">+</span> Add Entry
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ icon, label, key, unit, color }) => (
          <StatCard
            key={key}
            icon={icon}
            label={label}
            value={latest[key] ?? 0}
            unit={unit}
            goal={goals[key]}
            color={color}
          />
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Weekly Steps Progress</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyData} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 13, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              cursor={{ fill: '#f0fdf4' }}
            />
            <Bar dataKey="steps" radius={[6, 6, 0, 0]}>
              {weeklyData.map((_, idx) => (
                <Cell
                  key={idx}
                  fill={idx === weeklyData.length - 1 ? COLORS.steps : '#bbf7d0'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-right">
          Goal line: {goals.steps.toLocaleString()} steps/day
        </p>
      </div>
    </div>
  );
}
