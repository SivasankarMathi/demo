import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import AddEntry from './pages/AddEntry'
import History from './pages/History'

const MOCK_ENTRIES = [
  { id: 1, date: '2025-06-30', steps: 8420, calories: 1950, water: 2.1, sleep: 7.2 },
  { id: 2, date: '2025-07-01', steps: 10230, calories: 2100, water: 2.5, sleep: 8.0 },
  { id: 3, date: '2025-07-02', steps: 6100, calories: 1800, water: 1.8, sleep: 6.5 },
  { id: 4, date: '2025-07-03', steps: 11500, calories: 2300, water: 3.0, sleep: 7.8 },
  { id: 5, date: '2025-07-04', steps: 7800, calories: 2050, water: 2.2, sleep: 7.0 },
  { id: 6, date: '2025-07-05', steps: 9300, calories: 1900, water: 2.6, sleep: 8.5 },
  { id: 7, date: '2025-07-06', steps: 5400, calories: 1700, water: 1.5, sleep: 6.0 },
]

export default function App() {
  const [entries, setEntries] = useState(MOCK_ENTRIES)

  const addEntry = (entry) => {
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), ...entry },
    ])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard entries={entries} />} />
        <Route path="/add" element={<AddEntry addEntry={addEntry} />} />
        <Route path="/history" element={<History entries={entries} />} />
      </Routes>
    </BrowserRouter>
  )
}
