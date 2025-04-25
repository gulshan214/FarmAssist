import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Context
import { AuthProvider } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ImageUpload from './pages/ImageUpload'
import FinanceTracker from './pages/FinanceTracker'
import Community from './pages/Community'
import GameDashboard from './pages/GameDashboard'
import GovtSchemes from './pages/GovtSchemes'

// Components
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Check if current route is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading AgriFuture...</p>
      </div>
    )
  }

  return (
    <AuthProvider>
      <div className="app">
        {!isAuthPage && <Navbar />}
        <main className={isAuthPage ? "auth-layout" : "main-layout"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/image-upload" element={<ImageUpload />} />
              <Route path="/finance" element={<FinanceTracker />} />
              <Route path="/community" element={<Community />} />
              <Route path="/game" element={<GameDashboard />} />
              <Route path="/govt-schemes" element={<GovtSchemes />} />
            </Route>
          </Routes>
        </main>
        {!isAuthPage && <Footer />}
      </div>
    </AuthProvider>
  )
}

export default App