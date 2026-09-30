import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar     from './components/Navbar';
import Home       from './pages/Home';
import Dashboard  from './pages/Dashboard';
import AddEntry   from './pages/AddEntry';
import History    from './pages/History';
import { initialEntries } from './data/mockData';

export default function App() {
  const [entries, setEntries] = useState(initialEntries);

  function handleAddEntry(newEntry) {
    setEntries(prev => [
      ...prev,
      { ...newEntry, id: Date.now() },
    ]);
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/dashboard" element={<Dashboard entries={entries} />} />
            <Route path="/add"       element={<AddEntry onAddEntry={handleAddEntry} />} />
            <Route path="/history"   element={<History entries={entries} />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-100 py-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} VitalTrack · Your Health, Your Journey
        </footer>
      </div>
    </BrowserRouter>
  );
}
