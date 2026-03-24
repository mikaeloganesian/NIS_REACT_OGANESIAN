import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks/redux'
import {
  setCatalogPageSize,
  setLanguage,
  setTheme,
} from '@/features/settings/model/settings-slice'
import {
  selectCatalogPageSize,
  selectLanguage,
  selectTheme,
} from '@/features/settings/model/selectors'
import type { AppLanguage } from '@/features/settings/model/settings-slice'
import { Card } from '@/shared/ui/Card/Card'
import styles from './SettingsPage.module.css'

const PAGE_SIZES = [5, 10, 20, 50] as const

export default function SettingsPage() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const language = useAppSelector(selectLanguage)
  const theme = useAppSelector(selectTheme)
  const pageSize = useAppSelector(selectCatalogPageSize)

  return (
    <div>
      <h1 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 600 }}>
        {t('settings.title')}
      </h1>
      <Card>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="language">
            {t('settings.language')}
          </label>
          <select
            id="language"
            className={styles.select}
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value as AppLanguage))}
          >
            <option value="en">{t('settings.localeEn')}</option>
            <option value="ru">{t('settings.localeRu')}</option>
          </select>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>{t('settings.theme')}</span>
          <div className={styles.segment}>
            <button
              type="button"
              className={[styles.segBtn, theme === 'light' ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => dispatch(setTheme('light'))}
            >
              {t('settings.themeLight')}
            </button>
            <button
              type="button"
              className={[styles.segBtn, theme === 'dark' ? styles.active : '']
                .filter(Boolean)
                .join(' ')}
              onClick={() => dispatch(setTheme('dark'))}
            >
              {t('settings.themeDark')}
            </button>
          </div>
        </div>
        <div className={styles.row}>
          <label className={styles.label} htmlFor="pageSize">
            {t('settings.catalogPageSize')}
          </label>
          <select
            id="pageSize"
            className={styles.select}
            value={pageSize}
            onChange={(e) =>
              dispatch(setCatalogPageSize(Number(e.target.value)))
            }
          >
            {PAGE_SIZES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </Card>
    </div>
  )
}
