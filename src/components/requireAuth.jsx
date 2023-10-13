import { Navigate, Outlet } from 'react-router-dom'
import { authStore } from '@context'

const RequireAuth = ({ type = 'User' }) => {
  const { auth } = authStore

  if (type === 'User') {
    // User role is by default, in the future this can help to ban users.
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
  } else if (type === 'Admin') {
    // Check auth.user.roles.Admin exists
    const isAdmin = (auth.user.roles?.Admin ?? 0) === 1

    return isAdmin && auth.isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/home" replace />
    )
  }
}

export default RequireAuth
