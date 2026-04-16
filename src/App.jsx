import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (email, password) => {
    // TODO: SECURITY — Replace this mock with a real server-side authentication
    // call (e.g. POST /api/auth/login). Never trust client-side-only auth.
    // The server must validate credentials, return a signed session token (JWT
    // or opaque), and the client should store it in an httpOnly cookie — not
    // in React state or localStorage.
    setUser({ email })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <div className="app">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
