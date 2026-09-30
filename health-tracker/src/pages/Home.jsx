import { Link } from 'react-router-dom'

const features = [
  {
    icon: '👟',
    title: 'Track Steps',
    desc: 'Log your daily steps and stay on top of your activity goals.',
  },
  {
    icon: '🔥',
    title: 'Calories',
    desc: 'Monitor caloric intake to maintain a healthy balance.',
  },
  {
    icon: '💧',
    title: 'Hydration',
    desc: 'Never forget to drink water with easy glass tracking.',
  },
  {
    icon: '😴',
    title: 'Sleep',
    desc: 'Log sleep hours and discover patterns to improve rest.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-500 to-teal-400 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
          <span className="text-5xl">🏃‍♂️</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Your Personal Health<br />Companion
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-xl">
            Track steps, calories, water, and sleep — all in one clean dashboard.
            Build healthy habits one day at a time.
          </p>
          <Link
            to="/dashboard"
            className="mt-2 inline-flex items-center gap-2 bg-white text-green-700 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base"
          >
            Start Tracking →
          </Link>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: '10K+', label: 'Steps / day goal' },
            { value: '2,000', label: 'Calories target' },
            { value: '8 glasses', label: 'Water daily' },
            { value: '8 hrs', label: 'Sleep target' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-green-600">{s.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 py-16 w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          Everything you need to stay healthy
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl">{f.icon}</span>
              <h3 className="font-semibold text-gray-800 text-lg">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-50 border-t border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Ready to take control of your health?</h2>
          <p className="text-gray-500 max-w-md">
            Log your first entry today and start seeing weekly trends on your dashboard.
          </p>
          <Link
            to="/add"
            className="mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3 rounded-full transition-colors shadow"
          >
            Log Today's Activity
          </Link>
        </div>
      </section>
    </div>
  )
}
