import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return currentUser ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute