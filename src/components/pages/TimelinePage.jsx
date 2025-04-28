import React, { useEffect } from 'react';
import Timeline from '../common/Timeline';
import '../../../styles/TimelinePage.css';

/**
 * דף ציר הזמן המלא - מציג את כל אירועי החיים של מרים
 */
const TimelinePage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="timeline-page">
      <header className="page-header">
        <div className="container">
          <h1>ציר זמן - מסע חייה של מרים</h1>
          <p className="subtitle">נקודות ציון מרכזיות מלייפציג 1925 ועד ישראל</p>
        </div>
      </header>

      <div className="container">
        <div className="timeline-page-content">
          <section className="timeline-intro">
            <p>
              ציר הזמן להלן מציג את נקודות הציון המרכזיות בחייה של מרים אופנהיימר (יעקובסון).
              מלידתה בגרמניה בשנת 1925, דרך התקופה הקשה של השואה, ועד לעלייתה לארץ ישראל והקמת משפחה.
            </p>
            <p>
              ניתן לסנן את האירועים לפי תקופות חיים על ידי לחיצה על הקטגוריות השונות.
              לחיצה על "קרא עוד" תוביל אתכם לפרק המתאים עם מידע מפורט יותר.
            </p>
          </section>

          <section className="timeline-full">
            <Timeline simplified={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
