import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/ChapterPage.css';

/**
 * קומפוננטת ניווט לפרקים בסגנון tabs
 * מציגה את כל הפרקים עם הדגשה לפרק הנוכחי
 */
const ChapterNavBar = ({ position = 'top' }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // רשימת הפרקים
  const chapters = [
    { id: 1, title: 'ילדות בגרמניה', path: '/chapters/childhood' },
    { id: 2, title: 'החיים בבלגיה', path: '/chapters/belgium' },
    { id: 3, title: 'צרפת תחת הכיבוש', path: '/chapters/france' },
    { id: 4, title: 'בעמק הבכא', path: '/chapters/holocaust' },
    { id: 5, title: 'השחרור והחזרה לליון', path: '/chapters/liberation' },
    { id: 6, title: 'העלייה לישראל', path: '/chapters/immigration' },
    { id: 7, title: 'חיים בארץ ישראל', path: '/chapters/israel' },
  ];

  return (
    <div className={`chapter-nav-bar ${position}`}>
      <div className="chapter-nav-container">
        <Link to="/" className="home-link">
          חזרה לדף הבית
        </Link>
        
        <div className="chapter-tabs">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              to={chapter.path}
              className={`chapter-tab ${currentPath === chapter.path ? 'active' : ''}`}
            >
              <span className="chapter-number-badge">{chapter.id}</span>
              <span className="chapter-title">{chapter.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterNavBar;