import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHealth } from '../context/HealthContext'

const fields = [
  {
    key: 'steps',
    icon: '👟',
    label: 'Steps',
    placeholder: '0',
    unit: 'steps',
    hint: 'Goal: 10,000 steps',
    min: 0,
    max: 100000,
    color: 'emerald',
  },
  {
    key: 'calories',
    icon: '🔥',
    label: 'Calories',
    placeholder: '0',
    unit: 'kcal',
    hint: 'Goal: 2,500 kcal',
    min: 0,
    max: 10000,
    color: 'orange',
  },
  {
    key: 'water',
    icon: '💧',
    label: 'Water',
    placeholder: '0',
    unit: 'glasses',
    hint: 'Goal: 8 glasses',
    min: 0,
    max: 30,
    color: 'blue',
  },
  {
    key: 'sleep',
    icon: '😴',
    label: 'Sleep',
    placeholder: '0',
    unit: 'hours',
    hint: 'Goal: 8 hours',
    min: 0,
    max: 24,
    step: 0.5,
    color: 'purple',
  },
]

const focusMap = {
  emerald: 'focus:border-emerald-500 focus:ring-emerald-500/20',
  orange: 'focus:border-orange-500 focus:ring-orange-500/20',
  blue: 'focus:border-blue-500 focus:ring-blue-500/20',
  purple: 'focus:border-purple-500 focus:ring-purple-500/20',
}

const iconBgMap = {
  emerald: 'bg-emerald-500/10 text-emerald-400',
  orange: 'bg-orange-500/10 text-orange-400',
  blue: 'bg-blue-500/10 text-blue-400',
  purple: 'bg-purple-500/10 text-purple-400',
}

export default function AddEntry() {
  const { todayEntry, addEntry } = useHealth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    steps: todayEntry.steps || '',
    calories: todayEntry.calories || '',
    water: todayEntry.water || '',
    sleep: todayEntry.sleep || '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    const parsed = {
      steps: Number(form.steps) || 0,
      calories: Number(form.calories) || 0,
      water: Number(form.water) || 0,
      sleep: Number(form.sleep) || 0,
    }

    addEntry(parsed)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Entry</h1>
        <p className="text-gray-400 mt-1">
          Log your health data for{' '}
          <span className="text-emerald-400 font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ key, icon, label, placeholder, unit, hint, min, max, step, color }) => (
          <div key={key} className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${iconBgMap[color]} flex items-center justify-center text-xl`}>
                {icon}
              </div>
              <div>
                <div className="font-semibold">{label}</div>
                <div className="text-xs text-gray-500">{hint}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                id={key}
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step || 1}
                className={`flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${focusMap[color]}`}
              />
              <span className="text-gray-400 text-sm font-medium w-16 shrink-0">{unit}</span>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 py-3.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold transition-all shadow-lg shadow-emerald-500/20"
          >
            Save Entry ✓
          </button>
        </div>
      </form>
    </div>
  )
}
