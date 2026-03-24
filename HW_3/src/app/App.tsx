import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { i18n } from '@/shared/config/i18n/i18n'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { SettingsSync } from '@/app/providers/SettingsSync'
import { ErrorBoundary } from '@/app/providers/ErrorBoundary'
import { router } from '@/app/routes/router'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

function AppRoutes() {
  const { t } = useTranslation()
  return (
    <Suspense fallback={<Spinner label={t('app.loading')} />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export function App() {
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <StoreProvider>
          <SettingsSync />
          <AppRoutes />
        </StoreProvider>
      </I18nextProvider>
    </ErrorBoundary>
  )
}
