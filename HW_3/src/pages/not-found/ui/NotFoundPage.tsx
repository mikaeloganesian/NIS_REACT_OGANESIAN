import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Card } from '@/shared/ui/Card/Card'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Card>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>
          {t('notFound.title')}
        </h1>
        <Link className="link" to="/" style={{ color: 'var(--color-accent)' }}>
          {t('notFound.back')}
        </Link>
      </Card>
    </div>
  )
}
