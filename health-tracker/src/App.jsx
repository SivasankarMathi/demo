import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddEntry from './pages/AddEntry'
import History from './pages/History'
import Navbar from './components/Navbar'

const mockEntries = [
  { id: 1, date: '2024-01-15', steps: 8500,  calories: 2100, water: 7, sleep: 7.5 },
  { id: 2, date: '2024-01-16', steps: 10200, calories: 1950, water: 8, sleep: 8.0 },
  { id: 3, date: '2024-01-17', steps: 6300,  calories: 2250, water: 6, sleep: 6.5 },
  { id: 4, date: '2024-01-18', steps: 11000, calories: 2000, water: 9, sleep: 7.0 },
  { id: 5, date: '2024-01-19', steps: 7800,  calories: 1875, water: 7, sleep: 8.5 },
  { id: 6, date: '2024-01-20', steps: 9400,  calories: 2150, water: 8, sleep: 7.0 },
  { id: 7, date: '2024-01-21', steps: 5200,  calories: 2300, water: 5, sleep: 6.0 },
]

export default function App() {
  const [entries, setEntries] = useState(mockEntries)

  const addEntry = (entry) => {
    setEntries((prev) => [
      { ...entry, id: Date.now(), date: new Date().toISOString().split('T')[0] },
      ...prev,
    ])
  }

  const today = entries[0] || null

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/dashboard" element={<Dashboard today={today} entries={entries} />} />
            <Route path="/add"       element={<AddEntry onAdd={addEntry} />} />
            <Route path="/history"   element={<History entries={entries} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
