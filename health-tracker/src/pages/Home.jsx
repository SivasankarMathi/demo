import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Badge */}
        <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30 mb-6">
          Your personal health companion
        </span>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-4">
          Track Your Health,{' '}
          <span className="text-emerald-400">Every Day</span>
        </h1>

        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Monitor steps, calories, hydration, and sleep — all in one clean dashboard.
          Build healthy habits with weekly insights and progress tracking.
        </p>

        {/* CTA */}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95"
        >
          Start Tracking →
        </button>

        {/* Stats preview */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: '👟', label: 'Steps', value: '10K+' },
            { icon: '🔥', label: 'Calories', value: '2,000' },
            { icon: '💧', label: 'Water', value: '8 cups' },
            { icon: '😴', label: 'Sleep', value: '8 hrs' },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 backdrop-blur"
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-white font-bold">{value}</div>
              <div className="text-slate-500 text-sm">{label} goal</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
