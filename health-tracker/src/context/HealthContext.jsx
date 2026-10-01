import { createContext, useContext, useState } from 'react'
import { mockEntries } from '../data/mockData'

const HealthContext = createContext(null)

export function HealthProvider({ children }) {
  const [entries, setEntries] = useState(mockEntries)

  function addEntry(entry) {
    setEntries(prev => [
      ...prev,
      { ...entry, id: Date.now() },
    ])
  }

  const today = entries[entries.length - 1]

  return (
    <HealthContext.Provider value={{ entries, addEntry, today }}>
      {children}
    </HealthContext.Provider>
  )
}

export function useHealth() {
  return useContext(HealthContext)
}
