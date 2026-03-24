import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import { selectAccessToken } from '@/features/auth/model/selectors'
import { logout } from '@/features/auth/model/auth-slice'
import { dummyJsonApi, useGetMeQuery } from '@/shared/api/dummy-json-api'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const token = useAppSelector(selectAccessToken)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  })

  useEffect(() => {
    if (isError) {
      dispatch(logout())
      dispatch(dummyJsonApi.util.resetApiState())
    }
  }, [dispatch, isError])

  if (!token) {
    return children
  }

  if (isLoading || isError) {
    return <Spinner label={t('app.loading')} />
  }

  return children
}
