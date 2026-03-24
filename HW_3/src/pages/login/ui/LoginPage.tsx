import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { Card } from '@/shared/ui/Card/Card'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <div className={styles.shell}>
      <Card className={styles.card}>
        <h1 className={styles.title}>{t('auth.loginTitle')}</h1>
        <LoginForm />
        <p className={styles.footer}>
          <Link className={styles.link} to="/register">
            {t('auth.registerTitle')}
          </Link>
        </p>
      </Card>
    </div>
  )
}
