import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { HealthProvider } from './context/HealthContext';
import AddEntry from './pages/AddEntry';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Home from './pages/Home';

export default function App() {
  return (
    <HealthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddEntry />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </HealthProvider>
  );
}
