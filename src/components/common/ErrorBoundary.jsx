import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 1rem', direction: 'rtl' }}>
          <h2>משהו השתבש</h2>
          <p style={{ marginTop: '1rem', color: '#666' }}>אירעה שגיאה בלתי צפויה.</p>
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false })}
            style={{ display: 'inline-block', marginTop: '1.5rem', color: '#2e5077' }}
          >
            חזרה לדף הבית
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
