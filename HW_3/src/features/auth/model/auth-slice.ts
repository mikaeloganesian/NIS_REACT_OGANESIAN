import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/entities/user/model/types'

export interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: User
      }>,
    ) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.user = action.payload.user
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.accessToken = null
      state.refreshToken = null
      state.user = null
    },
  },
})

export const { setCredentials, setUser, logout } = authSlice.actions
export const authReducer = authSlice.reducer
