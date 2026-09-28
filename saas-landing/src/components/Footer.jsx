export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-white font-bold text-lg">Streamline</span>
          <p className="text-sm mt-1">© {new Date().getFullYear()} Streamline Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-8 text-sm">
          {['Privacy', 'Terms', 'Security', 'Status'].map((link) => (
            <a key={link} href="#" className="hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
