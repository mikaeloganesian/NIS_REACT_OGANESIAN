import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLoginMutation } from '@/shared/api/dummy-json-api'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { getApiErrorMessage } from '@/shared/lib/error/api-error'

const MIN_PASSWORD = 3

export function LoginForm() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [touched, setTouched] = useState({ username: false, password: false })
  const [login, { isLoading, error, isError }] = useLoginMutation()

  const errors = useMemo(() => {
    const u =
      touched.username && !username.trim()
        ? t('auth.validation.required')
        : undefined
    const p =
      touched.password && password.length < MIN_PASSWORD
        ? t('auth.validation.minLength', { min: MIN_PASSWORD })
        : undefined
    return { username: u, password: p }
  }, [password, t, touched.password, touched.username, username])

  const canSubmit =
    username.trim().length > 0 && password.length >= MIN_PASSWORD && !isLoading

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ username: true, password: true })
    if (!username.trim() || password.length < MIN_PASSWORD) {
      return
    }
    try {
      await login({ username: username.trim(), password }).unwrap()
    } catch {
      /* error shown from RTK Query */
    }
  }

  const apiMessage = isError ? getApiErrorMessage(error) : undefined

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        name="username"
        autoComplete="username"
        label={t('auth.username')}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => setTouched((s) => ({ ...s, username: true }))}
        error={errors.username}
      />
      <div style={{ height: '1rem' }} />
      <Input
        name="password"
        type="password"
        autoComplete="current-password"
        label={t('auth.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouched((s) => ({ ...s, password: true }))}
        error={errors.password}
      />
      {isError ? (
        <p
          style={{ color: 'var(--color-danger)', marginTop: '0.75rem' }}
          role="alert"
        >
          {apiMessage ?? t('errors.api')}
        </p>
      ) : null}
      <div style={{ height: '1.25rem' }} />
      <Button
        type="submit"
        variant="primary"
        disabled={!canSubmit}
        style={{ width: '100%' }}
      >
        {t('auth.submitLogin')}
      </Button>
    </form>
  )
}
