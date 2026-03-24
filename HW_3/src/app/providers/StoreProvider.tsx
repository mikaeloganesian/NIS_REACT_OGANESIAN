import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useTranslation } from 'react-i18next'
import { store, persistor } from '@/app/store/store'
import { Spinner } from '@/shared/ui/Spinner/Spinner'

function PersistLoading() {
  const { t } = useTranslation()
  return <Spinner label={t('app.loading')} />
}

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
