import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active-nav-link' : ''
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/community', label: 'Community' },
    { path: '/game', label: 'Game' },
    { path: '/govt-schemes', label: 'Govt Schemes' },
    { path: '/finance', label: 'Finance' }
  ]

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            <motion.div 
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="logo-icon"
            >
              🌱
            </motion.div>
            <span>AgriFuture</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links desktop-menu">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${isActive(link.path)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="user-actions">
          {currentUser ? (
            <div className="user-info">
              <div className="points-display">
                <span className="points-icon">🏆</span>
                <span className="points-value">{currentUser.points}</span>
              </div>
              <div className="user-dropdown">
                <button className="user-dropdown-btn">
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-avatar">👨‍🌾</span>
                </button>
                <div className="dropdown-content">
                  <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                  <Link to="/image-upload" className="dropdown-item">Analyze Crop</Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-icon">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`mobile-nav-link ${isActive(link.path)}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {currentUser && (
              <>
                <Link 
                  to="/dashboard" 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/image-upload" 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Analyze Crop
                </Link>
                <button 
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }} 
                  className="mobile-nav-link logout-btn"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar