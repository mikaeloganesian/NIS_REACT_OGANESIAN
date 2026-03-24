import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { reduxPersistWebStorage } from '@/shared/lib/storage/redux-persist-web-storage'
import { dummyJsonApi } from '@/shared/api/dummy-json-api'
import { authReducer } from '@/features/auth/model/auth-slice'
import { settingsReducer } from '@/features/settings/model/settings-slice'

const authPersistConfig = {
  key: 'hw3-auth',
  storage: reduxPersistWebStorage,
}

const settingsPersistConfig = {
  key: 'hw3-settings',
  storage: reduxPersistWebStorage,
}

const rootReducer = combineReducers({
  [dummyJsonApi.reducerPath]: dummyJsonApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  settings: persistReducer(settingsPersistConfig, settingsReducer),
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(dummyJsonApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
