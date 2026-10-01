import { Link } from 'react-router-dom'

const features = [
  {
    icon: '👟',
    title: 'Track Steps',
    desc: 'Monitor your daily step count and stay active.',
  },
  {
    icon: '🔥',
    title: 'Calories',
    desc: 'Keep tabs on your caloric intake each day.',
  },
  {
    icon: '💧',
    title: 'Hydration',
    desc: 'Log your water intake and hit your daily goal.',
  },
  {
    icon: '😴',
    title: 'Sleep',
    desc: 'Record your sleep hours for optimal recovery.',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-950 py-28 px-4">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Your personal health companion
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Take Control of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              Your Health
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Track your steps, calories, hydration, and sleep all in one place.
            Simple, intuitive, and built for daily use.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-lg transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/30 hover:-translate-y-0.5"
            >
              Start Tracking →
            </Link>
            <Link
              to="/history"
              className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 font-semibold text-lg transition-all"
            >
              View History
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800 max-w-md mx-auto">
            {[
              { val: '10k+', label: 'Steps Goal' },
              { val: '2,500', label: 'Kcal Daily' },
              { val: '8h', label: 'Sleep Target' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{val}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to stay on track
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-emerald-400 transition-colors">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-gray-400">
            Begin logging your health data today and see your progress over time.
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-lg transition-all"
          >
            Start Tracking →
          </Link>
        </div>
      </section>
    </div>
  )
}
