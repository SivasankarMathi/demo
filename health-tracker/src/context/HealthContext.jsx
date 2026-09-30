import { createContext, useContext, useState } from 'react';

const HealthContext = createContext(null);

const today = new Date().toISOString().split('T')[0];

const mockEntries = [
  { id: 1, date: '2025-06-01', steps: 8200, calories: 1950, water: 7, sleep: 7.5 },
  { id: 2, date: '2025-06-02', steps: 10500, calories: 2100, water: 8, sleep: 8 },
  { id: 3, date: '2025-06-03', steps: 6400, calories: 1800, water: 6, sleep: 6.5 },
  { id: 4, date: '2025-06-04', steps: 9100, calories: 2050, water: 9, sleep: 7 },
  { id: 5, date: '2025-06-05', steps: 11200, calories: 2200, water: 8, sleep: 8.5 },
  { id: 6, date: '2025-06-06', steps: 7600, calories: 1900, water: 7, sleep: 7 },
  { id: 7, date: today, steps: 5300, calories: 1650, water: 5, sleep: 6 },
];

export function HealthProvider({ children }) {
  const [entries, setEntries] = useState(mockEntries);

  function addEntry(entry) {
    setEntries(prev => {
      const existingIdx = prev.findIndex(e => e.date === entry.date);
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = { ...updated[existingIdx], ...entry };
        return updated;
      }
      return [...prev, { id: Date.now(), ...entry }];
    });
  }

  const todayEntry = entries.find(e => e.date === today) || {
    steps: 0, calories: 0, water: 0, sleep: 0,
  };

  const last7 = [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-7);

  return (
    <HealthContext.Provider value={{ entries, addEntry, todayEntry, last7, today }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  return useContext(HealthContext);
}
