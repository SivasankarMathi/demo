import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          🌿 Your personal wellness companion
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Track your health,{" "}
          <span className="text-emerald-500">every day.</span>
        </h1>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          Log steps, calories, water intake, and sleep in one place.
          Visualize your progress and build lasting healthy habits.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 active:scale-95"
          >
            Start Tracking →
          </button>
          <button
            onClick={() => navigate("/history")}
            className="bg-white border border-gray-200 hover:border-emerald-300 text-gray-700 font-semibold px-8 py-3.5 rounded-xl text-base transition-all hover:text-emerald-600"
          >
            View History
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: "👣", label: "Steps", value: "10K Goal" },
            { icon: "🔥", label: "Calories", value: "2,200 kcal" },
            { icon: "💧", label: "Water", value: "2.5 L/day" },
            { icon: "😴", label: "Sleep", value: "8 hrs/night" },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</div>
              <div className="text-sm font-semibold text-gray-700 mt-0.5">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
