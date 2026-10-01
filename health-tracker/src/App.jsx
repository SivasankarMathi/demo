import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HealthProvider } from './context/HealthContext'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddEntry from './pages/AddEntry'
import History from './pages/History'

export default function App() {
  return (
    <HealthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddEntry />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HealthProvider>
  )
}
