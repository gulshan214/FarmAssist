import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in from local storage
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Mock login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // In a real app, you would validate with a backend
      if (email && password) {
        const userData = {
          id: '1',
          name: 'Demo Farmer',
          email,
          points: 120,
          role: 'farmer'
        }
        localStorage.setItem('user', JSON.stringify(userData))
        setCurrentUser(userData)
        resolve(userData)
      } else {
        reject(new Error('Invalid credentials'))
      }
    })
  }

  // Mock register function
  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      // In a real app, you would send this to your backend
      if (name && email && password) {
        const userData = {
          id: '1',
          name,
          email,
          points: 0,
          role: 'farmer'
        }
        localStorage.setItem('user', JSON.stringify(userData))
        setCurrentUser(userData)
        resolve(userData)
      } else {
        reject(new Error('Invalid registration data'))
      }
    })
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}