const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description:
      'Sub-second response times backed by a globally distributed edge network. Your users will never wait.',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description:
      'SOC 2 Type II certified. End-to-end encryption, SSO, and granular role-based access control built in.',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Automation',
    description:
      'Automate repetitive tasks with intelligent workflows. Let the AI handle the busywork while your team focuses on what matters.',
  },
  {
    icon: '📊',
    title: 'Real-Time Analytics',
    description:
      'Live dashboards and custom reports that turn raw data into actionable insights — no data warehouse needed.',
  },
  {
    icon: '🔗',
    title: '200+ Integrations',
    description:
      'Connect your existing tools in one click. Slack, GitHub, Notion, Salesforce, and hundreds more out of the box.',
  },
  {
    icon: '🌍',
    title: 'Global Collaboration',
    description:
      'Work across timezones with async-first features, threaded comments, and live co-editing on every document.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Everything your team needs
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Streamline brings together the tools, automation, and insights your team needs to
            move fast without breaking things.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="group p-8 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
