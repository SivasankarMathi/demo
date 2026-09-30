import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fields = [
  { name: 'steps',    label: 'Steps',          icon: '👟', unit: 'steps', type: 'number', min: 0, max: 100000, placeholder: 'e.g. 8500'  },
  { name: 'calories', label: 'Calories',        icon: '🔥', unit: 'kcal',  type: 'number', min: 0, max: 10000, placeholder: 'e.g. 2000'  },
  { name: 'water',    label: 'Water Intake',    icon: '💧', unit: 'L',     type: 'number', min: 0, max: 20,    placeholder: 'e.g. 2.5', step: '0.1' },
  { name: 'sleep',    label: 'Sleep Duration',  icon: '🌙', unit: 'hrs',   type: 'number', min: 0, max: 24,    placeholder: 'e.g. 7.5', step: '0.5' },
];

export default function AddEntry({ onAddEntry }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    date:     today,
    steps:    '',
    calories: '',
    water:    '',
    sleep:    '',
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    fields.forEach(({ name, min, max }) => {
      const val = parseFloat(form[name]);
      if (form[name] === '' || isNaN(val)) {
        errs[name] = 'This field is required.';
      } else if (val < min || val > max) {
        errs[name] = `Must be between ${min} and ${max}.`;
      }
    });
    return errs;
  }

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onAddEntry({
      date:     form.date,
      steps:    parseInt(form.steps),
      calories: parseInt(form.calories),
      water:    parseFloat(form.water),
      sleep:    parseFloat(form.sleep),
    });
    navigate('/dashboard');
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Add Entry</h1>
        <p className="text-sm text-gray-400 mb-8">Log your health data for the day.</p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              max={today}
              onChange={handleChange}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>

          {/* Dynamic fields */}
          {fields.map(({ name, label, icon, unit, type, min, max, placeholder, step }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <span>{icon}</span> {label}
                <span className="text-xs text-gray-400 font-normal">({unit})</span>
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                min={min}
                max={max}
                step={step ?? '1'}
                placeholder={placeholder}
                onChange={handleChange}
                className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 transition-colors ${
                  errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200'
                }`}
              />
              {errors[name] && (
                <p className="text-xs text-red-500 mt-0.5">{errors[name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="mt-2 w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow"
          >
            Save Entry
          </button>
        </form>
      </div>
    </div>
  );
}
