import { Component, type ErrorInfo, type ReactNode } from 'react'
import { i18n } from '@/shared/config/i18n/i18n'
import { Button } from '@/shared/ui/Button/Button'

type Props = { children: ReactNode }

type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
          }}
        >
          <div style={{ maxWidth: 420, textAlign: 'center' }}>
            <h1 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {i18n.t('errors.boundary')}
            </h1>
            <Button type="button" onClick={() => window.location.reload()}>
              {i18n.t('states.retry')}
            </Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
