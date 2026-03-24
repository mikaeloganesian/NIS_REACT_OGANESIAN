import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card } from '@/shared/ui/Card/Card'
import styles from './RegisterPage.module.css'

export default function RegisterPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.shell}>
      <Card className={styles.card}>
        <h1 className={styles.title}>{t('auth.registerTitle')}</h1>
        <p className={styles.stub}>{t('auth.registerStub')}</p>
        <Link className={styles.back} to="/login">
          {t('auth.backToLogin')}
        </Link>
      </Card>
    </div>
  )
}
