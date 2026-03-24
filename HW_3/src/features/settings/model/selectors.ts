import type { RootState } from '@/app/store/store'

export const selectLanguage = (state: RootState) => state.settings.language
export const selectTheme = (state: RootState) => state.settings.theme
export const selectCatalogPageSize = (state: RootState) =>
  state.settings.catalogPageSize
