import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const fields = [
  {
    key: 'steps',
    label: 'Steps',
    icon: '👟',
    placeholder: 'e.g. 8500',
    unit: 'steps',
    min: 0,
    max: 100000,
    hint: 'Average person walks 6,000–10,000 steps/day',
    color: 'blue',
    focusRing: 'focus:ring-blue-400',
    badge: 'bg-blue-50 text-blue-600',
  },
  {
    key: 'calories',
    label: 'Calories',
    icon: '🔥',
    placeholder: 'e.g. 2000',
    unit: 'kcal',
    min: 0,
    max: 10000,
    hint: 'Typical adult needs 1,600–2,400 kcal/day',
    color: 'orange',
    focusRing: 'focus:ring-orange-400',
    badge: 'bg-orange-50 text-orange-600',
  },
  {
    key: 'water',
    label: 'Water',
    icon: '💧',
    placeholder: 'e.g. 8',
    unit: 'glasses',
    min: 0,
    max: 30,
    step: 0.5,
    hint: 'Aim for 8 glasses (2 litres) per day',
    color: 'cyan',
    focusRing: 'focus:ring-cyan-400',
    badge: 'bg-cyan-50 text-cyan-600',
  },
  {
    key: 'sleep',
    label: 'Sleep',
    icon: '😴',
    placeholder: 'e.g. 7.5',
    unit: 'hours',
    min: 0,
    max: 24,
    step: 0.5,
    hint: 'Adults need 7–9 hours of sleep per night',
    color: 'purple',
    focusRing: 'focus:ring-purple-400',
    badge: 'bg-purple-50 text-purple-600',
  },
]

export default function AddEntry({ onAdd }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({ steps: '', calories: '', water: '', sleep: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    fields.forEach(({ key, label, min, max }) => {
      const val = parseFloat(form[key])
      if (form[key] === '' || isNaN(val)) {
        errs[key] = `${label} is required`
      } else if (val < min || val > max) {
        errs[key] = `${label} must be between ${min} and ${max}`
      }
    })
    return errs
  }

  const handleChange = (key, value) => {
    setForm((p) => ({ ...p, [key]: value }))
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
    onAdd({
      steps:    parseFloat(form.steps),
      calories: parseFloat(form.calories),
      water:    parseFloat(form.water),
      sleep:    parseFloat(form.sleep),
    })
    setTimeout(() => navigate('/dashboard'), 800)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Log Today's Activity</h1>
        <p className="text-gray-500 text-sm mt-1">Fill in your daily health metrics below.</p>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 flex flex-col items-center gap-3 text-center">
          <span className="text-5xl">✅</span>
          <h2 className="text-xl font-bold text-green-700">Entry Saved!</h2>
          <p className="text-green-600 text-sm">Redirecting to your dashboard…</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {fields.map((field) => (
            <div key={field.key} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{field.icon}</span>
                <label htmlFor={field.key} className="font-semibold text-gray-800">
                  {field.label}
                </label>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${field.badge}`}>
                  {field.unit}
                </span>
              </div>
              <input
                id={field.key}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step || 1}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={`w-full border rounded-xl px-4 py-2.5 text-gray-800 placeholder-gray-300 outline-none focus:ring-2 transition ${field.focusRing} ${
                  errors[field.key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'
                }`}
              />
              {errors[field.key] ? (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9v4h2V9H9zm0-1h2V6H9v2z" clipRule="evenodd" />
                  </svg>
                  {errors[field.key]}
                </p>
              ) : (
                <p className="text-xs text-gray-400">{field.hint}</p>
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-colors"
            >
              Save Entry
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
