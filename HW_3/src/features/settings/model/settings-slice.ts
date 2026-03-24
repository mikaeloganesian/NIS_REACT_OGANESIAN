import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AppLanguage = 'en' | 'ru'
export type AppTheme = 'light' | 'dark'

export interface SettingsState {
  language: AppLanguage
  theme: AppTheme
  catalogPageSize: number
}

const initialState: SettingsState = {
  language: 'en',
  theme: 'light',
  catalogPageSize: 10,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<AppLanguage>) {
      state.language = action.payload
    },
    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme = action.payload
    },
    setCatalogPageSize(state, action: PayloadAction<number>) {
      state.catalogPageSize = action.payload
    },
  },
})

export const { setLanguage, setTheme, setCatalogPageSize } =
  settingsSlice.actions
export const settingsReducer = settingsSlice.reducer
