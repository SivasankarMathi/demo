import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealth } from '../context/HealthContext';

function Field({ label, icon, name, value, onChange, unit, min, max, step }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {icon} {label}
      </label>
      <div className="relative">
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          required
          className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-4 py-3 pr-14 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          placeholder="0"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{unit}</span>
      </div>
    </div>
  );
}

export default function AddEntry() {
  const navigate = useNavigate();
  const { addEntry, today } = useHealth();

  const [form, setForm] = useState({
    date: today,
    steps: '',
    calories: '',
    water: '',
    sleep: '',
  });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addEntry({
      date: form.date,
      steps: Number(form.steps),
      calories: Number(form.calories),
      water: Number(form.water),
      sleep: Number(form.sleep),
    });
    navigate('/dashboard');
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-900 px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Add Entry</h1>
          <p className="text-slate-400 text-sm mt-0.5">Log your health metrics for the day</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col gap-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              📅 Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <Field label="Steps" icon="👟" name="steps" value={form.steps} onChange={handleChange} unit="steps" min={0} max={100000} step={1} />
          <Field label="Calories Burned" icon="🔥" name="calories" value={form.calories} onChange={handleChange} unit="kcal" min={0} max={10000} step={1} />
          <Field label="Water Intake" icon="💧" name="water" value={form.water} onChange={handleChange} unit="cups" min={0} max={30} step={0.5} />
          <Field label="Sleep Duration" icon="😴" name="sleep" value={form.sleep} onChange={handleChange} unit="hrs" min={0} max={24} step={0.5} />

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
