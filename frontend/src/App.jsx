import { useState, useEffect } from 'react';

const KPICard = ({ title, value, icon, color }) => (
  <div className={`bg-white rounded-2xl shadow-md p-6 flex items-center gap-5 border-l-4 ${color}`}>
    <div className="text-4xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">
        {value !== null ? value.toLocaleString() : '—'}
      </p>
    </div>
  </div>
);

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Sales Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">Loading dashboard data…</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4 flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold">Failed to load data</p>
              <p className="text-sm mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && data && (
          <>
            <p className="text-gray-500 text-sm mb-6">
              Last updated: {new Date().toLocaleString()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <KPICard
                title="Total Sales"
                value={data.sales}
                icon="💰"
                color="border-blue-500"
              />
              <KPICard
                title="Total Orders"
                value={data.orders}
                icon="📦"
                color="border-green-500"
              />
              <KPICard
                title="Active Customers"
                value={data.customers}
                icon="👥"
                color="border-purple-500"
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-6">
        Sales Dashboard © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
