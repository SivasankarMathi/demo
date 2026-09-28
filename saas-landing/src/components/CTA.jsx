export default function CTA() {
  return (
    <section className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Ready to streamline your workflow?
        </h2>
        <p className="text-indigo-100 text-lg mb-10">
          Join 10,000+ teams already saving hours every week. Start free, upgrade when you're ready.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-indigo-700 bg-white rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Get Started — it's free
          </a>
          <a
            href="#"
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white border border-indigo-300 rounded-xl hover:bg-white/10 transition-colors"
          >
            Talk to sales
          </a>
        </div>
        <p className="mt-5 text-indigo-200 text-sm">
          Free 30-day trial · No credit card · Setup in under 5 minutes
        </p>
      </div>
    </section>
  )
}
