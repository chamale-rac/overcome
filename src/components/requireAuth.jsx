import { Navigate, Outlet } from 'react-router-dom'
import { authStore } from '@context'

const RequireAuth = () => {
  const { auth } = authStore

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default RequireAuth
