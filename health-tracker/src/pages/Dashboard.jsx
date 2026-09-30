import { useNavigate } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useHealth } from "../context/HealthContext";
import { GOALS } from "../data/mockData";

const STAT_CONFIG = [
  { key: "steps", label: "Steps", icon: "👣", unit: "", color: "emerald", goal: GOALS.steps },
  { key: "calories", label: "Calories", icon: "🔥", unit: "kcal", color: "orange", goal: GOALS.calories },
  { key: "water", label: "Water", icon: "💧", unit: "L", color: "sky", goal: GOALS.water },
  { key: "sleep", label: "Sleep", icon: "😴", unit: "hrs", color: "violet", goal: GOALS.sleep },
];

const COLOR_MAP = {
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", bar: "#10b981", track: "bg-emerald-100", fill: "bg-emerald-500" },
  orange:  { bg: "bg-orange-50",  text: "text-orange-500",  bar: "#f97316", track: "bg-orange-100",  fill: "bg-orange-500" },
  sky:     { bg: "bg-sky-50",     text: "text-sky-500",     bar: "#0ea5e9", track: "bg-sky-100",     fill: "bg-sky-500" },
  violet:  { bg: "bg-violet-50",  text: "text-violet-500",  bar: "#8b5cf6", track: "bg-violet-100",  fill: "bg-violet-500" },
};

function StatCard({ label, icon, value, unit, goal, color }) {
  const c = COLOR_MAP[color];
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className={`${c.bg} rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className={`text-xs font-semibold ${c.text}`}>
          Goal: {goal.toLocaleString()}{unit ? " " + unit : ""}
        </span>
      </div>
      <div>
        <div className="text-3xl font-bold text-gray-800">
          {typeof value === "number" && value % 1 !== 0
            ? value.toFixed(1)
            : value.toLocaleString()}
          <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>
        </div>
        <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      </div>
      <div className={`h-2 rounded-full ${c.track}`}>
        <div
          className={`h-2 rounded-full ${c.fill} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-gray-400">{pct.toFixed(0)}% of daily goal</div>
    </div>
  );
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Dashboard() {
  const { entries, today } = useHealth();
  const navigate = useNavigate();

  const last7 = entries.slice(-7);

  const chartData = last7.map((e, i) => ({
    day: DAYS[i] ?? `Day ${i + 1}`,
    steps: e.steps,
    goal: GOALS.steps,
  }));

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Today's Overview</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <button
            onClick={() => navigate("/add")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm shadow-emerald-200 active:scale-95"
          >
            + Add Entry
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {STAT_CONFIG.map(({ key, label, icon, unit, color, goal }) => (
            <StatCard
              key={key}
              label={label}
              icon={icon}
              value={today?.[key] ?? 0}
              unit={unit}
              goal={goal}
              color={color}
            />
          ))}
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Steps</h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              Goal: {GOALS.steps.toLocaleString()} steps/day
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(val) => [val.toLocaleString(), "Steps"]}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                cursor={{ fill: "rgba(16,185,129,0.05)" }}
              />
              <Bar dataKey="steps" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.steps >= GOALS.steps ? "#10b981" : "#6ee7b7"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Goal reached</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-200 inline-block" /> Below goal</span>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STAT_CONFIG.map(({ key, label, icon, unit }) => {
            const avg = last7.reduce((s, e) => s + e[key], 0) / last7.length;
            return (
              <div key={key} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="text-xl mb-1">{icon}</div>
                <div className="text-lg font-bold text-gray-800">
                  {avg % 1 !== 0 ? avg.toFixed(1) : Math.round(avg).toLocaleString()}
                  <span className="text-xs font-normal text-gray-400 ml-1">{unit}</span>
                </div>
                <div className="text-xs text-gray-400">Avg {label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
