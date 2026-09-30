import { useNavigate } from 'react-router-dom';

const features = [
  { icon: '👟', title: 'Step Counter',     desc: 'Track your daily steps toward your activity goals.' },
  { icon: '🔥', title: 'Calorie Monitor',  desc: 'Log your caloric intake and stay on target.'         },
  { icon: '💧', title: 'Hydration Log',    desc: 'Monitor water intake to stay properly hydrated.'     },
  { icon: '🌙', title: 'Sleep Tracker',    desc: 'Record sleep hours for better rest habits.'          },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-emerald-400 text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
          <span className="text-6xl">🏃</span>
          <h1 className="text-5xl font-extrabold leading-tight">
            Your Personal<br />Health Dashboard
          </h1>
          <p className="text-lg text-white/80 max-w-xl">
            Monitor steps, calories, hydration and sleep — all in one place.
            Small habits, big results.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-2 px-8 py-3 bg-white text-brand-700 font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform text-lg"
          >
            Start Tracking →
          </button>
        </div>
        {/* decorative blob */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Everything you need in one place
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center gap-3 hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl">{icon}</span>
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-brand-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Ready to level up your health?</h2>
          <p className="text-gray-500">Add today's entry and see your progress instantly.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-full hover:bg-brand-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}
