import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectIsAuthenticated } from '@/features/auth/model/selectors'

export function RequireAuth() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}
