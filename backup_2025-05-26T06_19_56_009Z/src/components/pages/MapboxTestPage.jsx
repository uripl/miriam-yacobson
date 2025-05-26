// src/components/pages/MapboxTestPage.jsx
import React, { useEffect } from 'react';
import JourneyMap from '../common/JourneyMap'; // הגרסה החדשה שיצרנו
import { journeyLocations } from '../../data/timelineData';
import '../../styles/JourneyMapPage.css';

const MapboxTestPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="journey-map-page">
      <header className="page-header">
        <div className="container">
          <h1>בדיקת מפת Mapbox</h1>
          <p className="subtitle">
            זהו דף בדיקה להערכת תפקוד מפת Mapbox החדשה לפני הטמעתה בדף הראשי
          </p>
        </div>
      </header>

      <div className="container">
        <div className="journey-map-content">
          <section className="journey-map-full">
            <JourneyMap 
              locations={journeyLocations} 
            />
          </section>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>אם המפה נטענת ומוצגת כראוי, אפשר להטמיע אותה בדף הראשי של מפת המסע.</p>
        </div>
      </div>
    </div>
  );
};

export default MapboxTestPage;
