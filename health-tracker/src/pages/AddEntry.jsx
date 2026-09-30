import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHealth } from "../context/HealthContext";

const FIELDS = [
  { key: "steps",    label: "Steps",    icon: "👣", placeholder: "e.g. 8000",  min: 0, max: 100000, step: 100, unit: "steps" },
  { key: "calories", label: "Calories", icon: "🔥", placeholder: "e.g. 2000",  min: 0, max: 10000,  step: 50,  unit: "kcal" },
  { key: "water",    label: "Water",    icon: "💧", placeholder: "e.g. 2.5",   min: 0, max: 20,     step: 0.1, unit: "Litres" },
  { key: "sleep",    label: "Sleep",    icon: "😴", placeholder: "e.g. 7.5",   min: 0, max: 24,     step: 0.5, unit: "hours" },
];

export default function AddEntry() {
  const navigate = useNavigate();
  const { addEntry } = useHealth();

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({ date: today, steps: "", calories: "", water: "", sleep: "" });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    FIELDS.forEach(({ key, label, min, max }) => {
      const val = parseFloat(form[key]);
      if (form[key] === "" || isNaN(val)) errs[key] = `${label} is required`;
      else if (val < min || val > max) errs[key] = `${label} must be between ${min} and ${max}`;
    });
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    addEntry({
      date: form.date,
      steps: parseInt(form.steps),
      calories: parseInt(form.calories),
      water: parseFloat(form.water),
      sleep: parseFloat(form.sleep),
    });
    navigate("/dashboard");
  }

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-emerald-600 mb-6 flex items-center gap-1 transition-colors"
        >
          ← Back
        </button>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Add Entry</h1>
          <p className="text-sm text-gray-400 mb-8">Log your health metrics for the day.</p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Date picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                📅 Date
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                max={today}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
              />
            </div>

            {FIELDS.map(({ key, label, icon, placeholder, min, max, step, unit }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {icon} {label}
                  <span className="text-gray-400 font-normal ml-1">({unit})</span>
                </label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  min={min}
                  max={max}
                  step={step}
                  className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition ${
                    errors[key] ? "border-red-400 bg-red-50" : "border-gray-200"
                  }`}
                />
                {errors[key] && (
                  <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:border-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl text-sm transition active:scale-95 shadow-sm shadow-emerald-200"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
