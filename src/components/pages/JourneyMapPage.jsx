import React, { useEffect, useState } from 'react';
import JourneyMap from '../common/JourneyMap';
import { journeyLocations } from '../../data/timelineData';
import '../../styles/JourneyMapPage.css';

/**
 * דף מפת המסע - מציג את המסע הגיאוגרפי של מרים על מפה אינטראקטיבית
 */
const JourneyMapPage = () => {
  const [mapKey, setMapKey] = useState(Date.now()); // מפתח ייחודי לאילוץ רינדור מחדש של המפה

  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="journey-map-page">
      <header className="page-header">
        <div className="container">
          <h1>מפת מסע החיים</h1>
          <p className="subtitle">המסע הגיאוגרפי של מרים אופנהיימר (יעקובסון)</p>
        </div>
      </header>

      <div className="container">
        <div className="journey-map-content">
          <section className="journey-map-intro">
            <p>
              מפה זו מציגה את המסע הגיאוגרפי של מרים - מלידתה בלייפציג, גרמניה ב-1925, 
              דרך התקופה בבלגיה, צרפת, מחנות הריכוז בתקופת השואה, ועד לעלייתה לארץ ישראל ב-1948.
            </p>
            <p>
              ניתן ללחוץ על הנקודות במפה או על השמות ברשימה כדי לקבל מידע נוסף על כל מקום 
              ולעקוב אחר ציר הזמן של המסע.
            </p>
          </section>

          <section className="journey-map-full">
            <JourneyMap 
              key={mapKey} 
              locations={journeyLocations} 
            />
          </section>

          <section className="journey-map-facts">
            <h2>עובדות על המסע</h2>
            <div className="facts-grid">
              <div className="fact-card">
                <div className="fact-number">16</div>
                <div className="fact-text">מקומות מרכזיים</div>
              </div>
              <div className="fact-card">
                <div className="fact-number">7</div>
                <div className="fact-text">מדינות</div>
              </div>
              <div className="fact-card">
                <div className="fact-number">23</div>
                <div className="fact-text">שנות נדודים</div>
              </div>
              <div className="fact-card">
                <div className="fact-number">+5,000</div>
                <div className="fact-text">ק"מ של מסע</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default JourneyMapPage;
