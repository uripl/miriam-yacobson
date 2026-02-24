import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container" style={{ textAlign: 'center', padding: 'var(--spacing-4xl) 0' }}>
          <h1>404</h1>
          <p>הדף שחיפשת לא נמצא.</p>
          <Link to="/" className="timeline-link" style={{ display: 'inline-block', marginTop: 'var(--spacing-lg)' }}>
            חזרה לדף הבית
          </Link>
        </div>
      </header>
    </div>
  );
};

export default NotFoundPage;
