import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectAuthUser } from '@/features/auth/model/selectors'
import { Card } from '@/shared/ui/Card/Card'

export default function DashboardPage() {
  const { t } = useTranslation()
  const user = useAppSelector(selectAuthUser)

  return (
    <div>
      <h1 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 600 }}>
        {t('dashboard.title')}
      </h1>
      <Card>
        <p style={{ margin: 0, lineHeight: 1.6 }}>
          {t('dashboard.welcome', {
            name: user ? `${user.firstName} ${user.lastName}` : '',
          })}
        </p>
        <p
          style={{
            margin: '0.75rem 0 0',
            color: 'var(--color-muted)',
            lineHeight: 1.5,
          }}
        >
          {t('dashboard.hint')}
        </p>
      </Card>
    </div>
  )
}
