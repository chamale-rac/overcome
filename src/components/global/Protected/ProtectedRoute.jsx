import { Navigate, Route } from 'react-router-dom'
import { authStore } from '@context'

export const ProtectedRoute = ({ path, element: Element }) => {
  const { isAuthenticated } = authStore

  return (
    <Route
      path={path}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" replace />}
    />
  )
}
