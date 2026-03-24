import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks/redux'
import { logout } from '@/features/auth/model/auth-slice'
import { dummyJsonApi } from '@/shared/api/dummy-json-api'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

export default function LogoutPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(logout())
    dispatch(dummyJsonApi.util.resetApiState())
    navigate('/login', { replace: true })
  }, [dispatch, navigate])

  return <Spinner label={t('logout.title')} />
}
