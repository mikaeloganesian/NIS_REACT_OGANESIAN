import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '@/shared/lib/hooks/redux'
import { selectLanguage, selectTheme } from '@/features/settings/model/selectors'

export function SettingsSync() {
  const language = useAppSelector(selectLanguage)
  const theme = useAppSelector(selectTheme)
  const { i18n } = useTranslation()

  useEffect(() => {
    void i18n.changeLanguage(language)
  }, [language, i18n])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return null
}
