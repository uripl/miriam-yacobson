import React, { useEffect } from 'react';
import SimpleJourneyMap from '../common/SimpleJourneyMap'; // שים לב לשינוי כאן!
import { journeyLocations } from '../../data/timelineData';
import '../../styles/JourneyMapPage.css';

const JourneyMapPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="journey-map-page">
      <header className="page-header">
        <div className="container">
          <h1>מפת מסע החיים</h1>
          <p className="subtitle">
            המסע הגיאוגרפי של מרים אופנהיימר (יעקובסון) מלידתה בלייפציג, גרמניה ב-1925, 
            דרך התקופה בבלגיה, צרפת, מחנות הריכוז בתקופת השואה, ועד לעלייתה לארץ ישראל ב-1948
          </p>
        </div>
      </header>

      <div className="container">
        <div className="journey-map-content">
          <section className="journey-map-full">
            <SimpleJourneyMap 
              locations={journeyLocations} 
            />
          </section>
        </div>

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
  );
};

export default JourneyMapPage;
