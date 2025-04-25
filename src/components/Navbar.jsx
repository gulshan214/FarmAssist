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
    return location.pathname === path ? 'text-yellow-400' : 'text-white'
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/community', label: 'Community' },
    { path: '/game', label: 'Game' },
    { path: '/govt-schemes', label: 'Govt Schemes' },
    { path: '/finance', label: 'Finance' }
  ]

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center text-3xl font-semibold text-yellow-500 hover:text-yellow-300 transition duration-300">
            <motion.div 
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl"
            >
              🌱
            </motion.div>
            <span>AgriFuture</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-lg font-medium ${isActive(link.path)} hover:text-yellow-400 transition duration-300`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <span className="text-lg text-white">🏆</span>
                  <span className="text-white">{currentUser.points}</span>
                </div>
                <div className="relative">
                  <button className="flex items-center space-x-2 bg-gray-800 text-white rounded-full py-2 px-4 hover:bg-gray-700 transition duration-300">
                    <span className="text-sm">{currentUser.name}</span>
                    <span className="text-xl">👨‍🌾</span>
                  </button>
                  <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg p-2 w-48">
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-700 transition">Dashboard</Link>
                    <Link to="/image-upload" className="block px-4 py-2 hover:bg-gray-700 transition">Analyze Crop</Link>
                    <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700 transition">Logout</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">Login</Link>
              <Link to="/register" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-400 transition">Sign Up</Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-3xl text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="hamburger-icon">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white p-4">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`block py-2 text-lg ${isActive(link.path)} hover:text-yellow-400`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {currentUser && (
            <>
              <Link 
                to="/dashboard" 
                className="block py-2 text-lg hover:text-yellow-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/image-upload" 
                className="block py-2 text-lg hover:text-yellow-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Analyze Crop
              </Link>
              <button 
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }} 
                className="block py-2 text-lg hover:text-yellow-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
