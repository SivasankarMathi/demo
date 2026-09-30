import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const FIELDS = [
  {
    key: 'steps',
    label: 'Steps',
    icon: '👟',
    placeholder: 'e.g. 8500',
    type: 'number',
    min: 0,
    max: 100000,
    step: 1,
    hint: 'Daily step count',
  },
  {
    key: 'calories',
    label: 'Calories (kcal)',
    icon: '🔥',
    placeholder: 'e.g. 2000',
    type: 'number',
    min: 0,
    max: 10000,
    step: 1,
    hint: 'Total calories consumed',
  },
  {
    key: 'water',
    label: 'Water (L)',
    icon: '💧',
    placeholder: 'e.g. 2.5',
    type: 'number',
    min: 0,
    max: 20,
    step: 0.1,
    hint: 'Litres of water drunk',
  },
  {
    key: 'sleep',
    label: 'Sleep (hrs)',
    icon: '😴',
    placeholder: 'e.g. 7.5',
    type: 'number',
    min: 0,
    max: 24,
    step: 0.5,
    hint: 'Hours of sleep last night',
  },
]

export default function AddEntry({ addEntry }) {
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  const [form, setForm] = useState({
    date: today,
    steps: '',
    calories: '',
    water: '',
    sleep: '',
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    FIELDS.forEach(({ key, min, max }) => {
      const val = parseFloat(form[key])
      if (form[key] === '' || isNaN(val)) {
        e[key] = 'This field is required'
      } else if (val < min || val > max) {
        e[key] = `Must be between ${min} and ${max}`
      }
    })
    if (!form.date) e.date = 'Date is required'
    return e
  }

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    addEntry({
      date: form.date,
      steps: parseInt(form.steps, 10),
      calories: parseInt(form.calories, 10),
      water: parseFloat(form.water),
      sleep: parseFloat(form.sleep),
    })
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 transition"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Add Entry</h1>
          <p className="text-gray-500 text-sm mb-8">Log today's health metrics</p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                📅 Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition ${
                  errors.date ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
                }`}
              />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
            </div>

            {/* Dynamic fields */}
            {FIELDS.map(({ key, label, icon, placeholder, type, min, max, step, hint }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {icon} {label}
                  <span className="text-gray-400 font-normal ml-2 text-xs">({hint})</span>
                </label>
                <input
                  type={type}
                  min={min}
                  max={max}
                  step={step}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition ${
                    errors[key] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'
                  }`}
                />
                {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
              </div>
            ))}

            <button
              type="submit"
              className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold py-3 rounded-xl shadow shadow-emerald-200 transition-all duration-200"
            >
              Save Entry
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
