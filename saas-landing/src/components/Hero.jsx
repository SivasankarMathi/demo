export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-6">
          🚀 Now in public beta — free for 30 days
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Ship faster with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Streamline
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          The all-in-one platform that helps your team collaborate, automate workflows, 
          and deliver products your customers love — without the overhead.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Get Started — it's free
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-colors"
          >
            Watch demo ▶
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">No credit card required · Cancel anytime</p>

        {/* Mock dashboard preview */}
        <div className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
          <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
            <span className="ml-4 text-xs text-gray-400 font-mono">app.streamline.io/dashboard</span>
          </div>
          <div className="bg-gray-900 p-8 grid grid-cols-3 gap-4">
            {['Total Users', 'Monthly Revenue', 'Active Tasks'].map((label, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-4 text-left">
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-2xl font-bold text-white">
                  {['12,483', '$48.2k', '1,024'][i]}
                </p>
                <p className="text-xs text-green-400 mt-1">↑ {[12, 8, 23][i]}% this month</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
