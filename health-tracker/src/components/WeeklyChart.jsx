import { useHealth } from '../context/HealthContext'

const METRICS = [
  { key: 'steps', label: 'Steps', color: 'bg-emerald-500', max: 12000 },
  { key: 'calories', label: 'Calories', color: 'bg-orange-500', max: 2500 },
  { key: 'water', label: 'Water (glasses)', color: 'bg-blue-500', max: 10 },
]

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeeklyChart() {
  const { weekEntries } = useHealth()

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-lg">Weekly Progress</h2>
        <div className="flex items-center gap-4">
          {METRICS.map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Bars */}
          <div className="flex items-end gap-3 h-44 mb-3">
            {weekEntries.map((entry) => {
              const dayLabel = DAY_LABELS[new Date(entry.date + 'T12:00:00').getDay()]
              return (
                <div key={entry.id || entry.date} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-0.5 h-40">
                    {METRICS.map(({ key, color, max }) => {
                      const pct = Math.min((entry[key] / max) * 100, 100)
                      return (
                        <div
                          key={key}
                          className="flex-1 rounded-t-sm transition-all duration-500 group relative"
                          style={{ height: `${pct}%` }}
                        >
                          <div className={`w-full h-full ${color} opacity-80 hover:opacity-100 rounded-t-sm`} />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {key}: {entry[key].toLocaleString()}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Day labels */}
          <div className="flex items-center gap-3">
            {weekEntries.map((entry) => {
              const dayLabel = DAY_LABELS[new Date(entry.date + 'T12:00:00').getDay()]
              const isToday = entry.date === new Date().toISOString().split('T')[0]
              return (
                <div key={entry.date} className="flex-1 text-center">
                  <span className={`text-xs font-medium ${isToday ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {dayLabel}
                    {isToday && ' •'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
