import React, { useEffect } from 'react';
import Timeline from '../common/Timeline';
import '../../styles/NewHomePage.css';

const NewHomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="timeline-page">
      {/* Hero מדף הבית המקורי */}
      <section className="hero">
        <div className="hero-content">
          <h1>מאפילה לאורה</h1>
          <h2>סיפור חייה של סבתא מרים יעקובסון (אופנהיימר)</h2>
          <p className="hero-subtitle">
            ממסע של גבורה ואובדן בשואה אל חיים של תקווה ובניין בארץ ישראל
          </p>
        </div>
      </section>

      {/* כותרת ציר הזמן כעת כותרת משנית */}
      <header className="page-header">
        <div className="container">
          <h2>ציר זמן - נקודות ציון מרכזיות</h2>
          <p className="subtitle"> ציר הזמן מציג את נקודות הציון המרכזיות בחייה של סבתא מרים,
      מלידתה בגרמניה בשנת 1925, דרך התקופה הקשה של השואה, ועד לעלייתה לארץ ישראל והקמת משפחה.
      ניתן לסנן את האירועים לפי תקופות חיים על ידי לחיצה על הקטגוריות למטה.</p>
        </div>
      </header>

      <div className="container">
        <div className="timeline-page-content">
         
          <section className="timeline-full">
            <Timeline simplified={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
