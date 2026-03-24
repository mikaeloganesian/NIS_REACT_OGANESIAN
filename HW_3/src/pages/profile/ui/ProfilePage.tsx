import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectAuthUser } from '@/features/auth/model/selectors'
import { Card } from '@/shared/ui/Card/Card'

export default function ProfilePage() {
  const { t } = useTranslation()
  const user = useAppSelector(selectAuthUser)

  return (
    <div>
      <h1 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 600 }}>
        {t('profile.title')}
      </h1>
      <Card>
        {user ? (
          <dl style={{ margin: 0, display: 'grid', gap: '0.75rem' }}>
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('profile.name')}
              </dt>
              <dd style={{ margin: 0 }}>
                {user.firstName} {user.lastName}
              </dd>
            </div>
            <div>
              <dt style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                {t('profile.email')}
              </dt>
              <dd style={{ margin: 0 }}>{user.email}</dd>
            </div>
          </dl>
        ) : (
          <p style={{ margin: 0, color: 'var(--color-muted)' }}>
            {t('states.loading')}
          </p>
        )}
        <p style={{ margin: '1rem 0 0' }}>
          <Link
            to="/logout"
            style={{ color: 'var(--color-accent)', fontSize: '0.875rem' }}
          >
            {t('profile.logout')}
          </Link>
        </p>
      </Card>
    </div>
  )
}
