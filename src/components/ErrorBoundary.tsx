import { Component, ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(): State { return { hasError: true } }
  componentDidCatch(error: Error) { console.error('Portfolio error:', error) }
  render() {
    if (this.state.hasError) return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--muted)' }}>
        Something went wrong.{' '}
        <button
          onClick={() => this.setState({ hasError: false })}
          style={{ color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Retry
        </button>
      </div>
    )
    return this.props.children
  }
}
