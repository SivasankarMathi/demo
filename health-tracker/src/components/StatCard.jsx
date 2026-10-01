export default function StatCard({ icon, label, value, unit, goal, color }) {
  const pct = goal ? Math.min((value / goal) * 100, 100) : 0
  const colorMap = {
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  }
  const textMap = {
    emerald: 'text-emerald-400',
    orange: 'text-orange-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  }
  const bgMap = {
    emerald: 'bg-emerald-500/10',
    orange: 'bg-orange-500/10',
    blue: 'bg-blue-500/10',
    purple: 'bg-purple-500/10',
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-xl ${bgMap[color]} flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        {goal && (
          <span className="text-xs text-gray-500 font-medium">
            Goal: {goal.toLocaleString()} {unit}
          </span>
        )}
      </div>

      <div>
        <div className="flex items-end gap-1.5">
          <span className={`text-3xl font-bold ${textMap[color]}`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          <span className="text-gray-500 text-sm mb-1">{unit}</span>
        </div>
        <div className="text-gray-400 text-sm font-medium mt-0.5">{label}</div>
      </div>

      {goal > 0 && (
        <div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${colorMap[color]} rounded-full transition-all duration-500`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">{Math.round(pct)}% of daily goal</div>
        </div>
      )}
    </div>
  )
}
