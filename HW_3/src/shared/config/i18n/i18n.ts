import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/shared/config/i18n/locales/en.json'
import ru from '@/shared/config/i18n/locales/ru.json'

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export { i18n }
