import React, { createContext, useContext, useState } from 'react'

const today = new Date()
const fmt = (d) => d.toISOString().split('T')[0]

const mockEntries = [
  { id: 1, date: fmt(new Date(today - 6 * 86400000)), steps: 8200, calories: 1950, water: 6, sleep: 7.5 },
  { id: 2, date: fmt(new Date(today - 5 * 86400000)), steps: 10500, calories: 2100, water: 8, sleep: 8 },
  { id: 3, date: fmt(new Date(today - 4 * 86400000)), steps: 6300, calories: 1800, water: 5, sleep: 6.5 },
  { id: 4, date: fmt(new Date(today - 3 * 86400000)), steps: 11200, calories: 2300, water: 9, sleep: 7 },
  { id: 5, date: fmt(new Date(today - 2 * 86400000)), steps: 7800, calories: 2050, water: 7, sleep: 8.5 },
  { id: 6, date: fmt(new Date(today - 1 * 86400000)), steps: 9400, calories: 1900, water: 8, sleep: 7 },
  { id: 7, date: fmt(today), steps: 4200, calories: 1100, water: 4, sleep: 0 },
]

const HealthContext = createContext(null)

export function HealthProvider({ children }) {
  const [entries, setEntries] = useState(mockEntries)

  const addEntry = (entry) => {
    const todayStr = fmt(new Date())
    const existing = entries.find((e) => e.date === todayStr)
    if (existing) {
      setEntries((prev) =>
        prev.map((e) =>
          e.date === todayStr
            ? { ...e, ...entry }
            : e
        )
      )
    } else {
      setEntries((prev) => [
        ...prev,
        { id: Date.now(), date: todayStr, ...entry },
      ])
    }
  }

  const todayEntry = entries.find((e) => e.date === fmt(new Date())) || {
    steps: 0, calories: 0, water: 0, sleep: 0,
  }

  const weekEntries = [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7)

  return (
    <HealthContext.Provider value={{ entries, addEntry, todayEntry, weekEntries }}>
      {children}
    </HealthContext.Provider>
  )
}

export function useHealth() {
  return useContext(HealthContext)
}
