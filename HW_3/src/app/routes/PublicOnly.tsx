import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectIsAuthenticated } from '@/features/auth/model/selectors'

export function PublicOnly({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}
