/**
 * Явный адаптер под redux-persist: обходит проблемы CJS/ESM interop
 * при `import storage from 'redux-persist/lib/storage'` в Vite.
 */
export const reduxPersistWebStorage = {
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(
      typeof window !== 'undefined' ? window.localStorage.getItem(key) : null,
    )
  },
  setItem(key: string, value: string): Promise<void> {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value)
    }
    return Promise.resolve()
  },
  removeItem(key: string): Promise<void> {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key)
    }
    return Promise.resolve()
  },
}
