import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHealth } from '../context/HealthContext'

const FIELDS = [
  {
    key: 'steps',
    label: 'Steps',
    icon: '👟',
    placeholder: 'e.g. 8000',
    type: 'number',
    min: 0,
    step: 1,
    unit: 'steps',
    hint: 'Daily average is ~7,500 steps',
  },
  {
    key: 'calories',
    label: 'Calories',
    icon: '🔥',
    placeholder: 'e.g. 2000',
    type: 'number',
    min: 0,
    step: 1,
    unit: 'kcal',
    hint: 'Typical range: 1,500 – 3,000 kcal',
  },
  {
    key: 'water',
    label: 'Water',
    icon: '💧',
    placeholder: 'e.g. 2.5',
    type: 'number',
    min: 0,
    step: 0.1,
    unit: 'litres',
    hint: 'Recommended: 2 – 3 litres/day',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    icon: '😴',
    placeholder: 'e.g. 7.5',
    type: 'number',
    min: 0,
    step: 0.5,
    unit: 'hours',
    hint: 'Recommended: 7 – 9 hours/night',
  },
]

export default function AddEntry() {
  const navigate = useNavigate()
  const { addEntry } = useHealth()

  const todayStr = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    date: todayStr,
    steps: '',
    calories: '',
    water: '',
    sleep: '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs = {}
    FIELDS.forEach(({ key }) => {
      const val = form[key]
      if (val === '' || val === null || val === undefined) {
        errs[key] = 'This field is required.'
      } else if (Number(val) < 0) {
        errs[key] = 'Value must be 0 or greater.'
      }
    })
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    addEntry({
      date: form.date,
      steps: Number(form.steps),
      calories: Number(form.calories),
      water: parseFloat(form.water),
      sleep: parseFloat(form.sleep),
    })
    setSubmitted(true)
    setTimeout(() => navigate('/dashboard'), 800)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-gray-700 transition-colors text-xl"
            aria-label="Back"
          >
            ←
          </button>
          <span className="font-bold text-gray-800 text-lg">Add Entry</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-1">
            Log Today's Health
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Fill in your stats for the selected date.
          </p>

          {submitted && (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 font-semibold px-4 py-3 rounded-xl mb-6 border border-emerald-200">
              ✅ Entry saved! Redirecting to dashboard…
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                max={todayStr}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Metric fields */}
            {FIELDS.map(({ key, label, icon, placeholder, type, min, step, unit, hint }) => (
              <div key={key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {icon} {label}{' '}
                  <span className="text-gray-400 font-normal">({unit})</span>
                </label>
                <input
                  type={type}
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  min={min}
                  step={step}
                  className={`w-full border rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 transition ${
                    errors[key]
                      ? 'border-red-400 focus:ring-red-300'
                      : 'border-gray-200 focus:ring-emerald-400'
                  }`}
                />
                {errors[key] ? (
                  <p className="text-red-500 text-xs mt-1">{errors[key]}</p>
                ) : (
                  <p className="text-gray-400 text-xs mt-1">{hint}</p>
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitted}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {submitted ? 'Saving…' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
