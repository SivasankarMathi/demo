import { Routes, Route } from 'react-router-dom'
import { HealthProvider } from './context/HealthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddEntry from './pages/AddEntry'
import History from './pages/History'

export default function App() {
  return (
    <HealthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddEntry />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </HealthProvider>
  )
}
