// src/components/pages/NewHomePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Timeline from '../common/Timeline';
import '../../styles/TimelinePage.css';
import '../../styles/NewHomePage.css'; // הוספת הסגנונות החדשים

const NewHomePage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // פרקי החיים העיקריים לקיצורי דרך
  const chapters = [
    { id: 'childhood', name: 'ילדות בגרמניה' },
    { id: 'belgium', name: 'בלגיה' },
    { id: 'france', name: 'צרפת בכיבוש' },
    { id: 'holocaust', name: 'השואה' },
    { id: 'liberation', name: 'השחרור' },
    { id: 'immigration', name: 'העלייה לארץ' },
    { id: 'israel', name: 'חיים בישראל' }
  ];

  return (
    <div className="home-timeline-page">
      <header className="page-header home-timeline-header">
        <div className="container">
          <h1>מאפילה לאורה - סיפור חייה של מרים אופנהיימר (יעקובסון)</h1>
          <p className="subtitle">ציר זמן - נקודות ציון מרכזיות מלייפציג 1925 ועד ישראל</p>
        </div>
      </header>

      <div className="container">
        <div className="timeline-page-content">
          <section className="home-timeline-intro">
            <p>
              ציר הזמן להלן מציג את נקודות הציון המרכזיות בחייה של מרים אופנהיימר (יעקובסון).
              מלידתה בגרמניה בשנת 1925, דרך התקופה הקשה של השואה, ועד לעלייתה לארץ ישראל והקמת משפחה.
            </p>
            <p>
              ניתן לסנן את האירועים לפי תקופות חיים על ידי לחיצה על הקטגוריות השונות.
              לחיצה על "קרא עוד" תוביל אתכם לפרק המתאים עם מידע מפורט יותר.
            </p>
          </section>

          {/* קיצורי דרך לפרקים */}
          <section className="chapter-shortcuts">
            {chapters.map(chapter => (
              <Link
                key={chapter.id}
                to={`/chapters/${chapter.id}`}
                className="chapter-shortcut-button"
              >
                {chapter.name}
              </Link>
            ))}
          </section>

          <section className="home-timeline-full">
            <Timeline simplified={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
