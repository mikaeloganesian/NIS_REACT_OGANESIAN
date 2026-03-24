import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectAuthUser } from '@/features/auth/model/selectors'
import styles from './MainLayout.module.css'

const navClass = ({ isActive }: { isActive: boolean }) =>
  [styles.navLink, isActive ? styles.navLinkActive : ''].filter(Boolean).join(' ')

export function MainLayout() {
  const { t } = useTranslation()
  const user = useAppSelector(selectAuthUser)

  return (
    <div className={styles.root}>
      <aside className={styles.sidebar} aria-label={t('app.title')}>
        <div className={styles.brand}>{t('app.title')}</div>
        <nav className={styles.nav}>
          <NavLink to="/" end className={navClass}>
            {t('nav.dashboard')}
          </NavLink>
          <NavLink to="/products" className={navClass}>
            {t('nav.products')}
          </NavLink>
          <NavLink to="/profile" className={navClass}>
            {t('nav.profile')}
          </NavLink>
          <NavLink to="/settings" className={navClass}>
            {t('nav.settings')}
          </NavLink>
          <NavLink to="/logout" className={navClass}>
            {t('nav.logout')}
          </NavLink>
        </nav>
      </aside>
      <div className={styles.main}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>{t('app.title')}</span>
          {user ? (
            <span className={styles.user}>
              {user.firstName} {user.lastName}
            </span>
          ) : null}
        </header>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
