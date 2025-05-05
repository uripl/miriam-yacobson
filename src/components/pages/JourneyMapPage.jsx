import React, { useEffect, useState } from 'react';
import JourneyMap from '../common/JourneyMap';
import { journeyLocations } from '../../data/timelineData';
import '../../styles/JourneyMapPage.css';

/**
 * דף מפת המסע - מציג את המסע הגיאוגרפי של מרים על מפה אינטראקטיבית
 */
const JourneyMapPage = () => {
  const [mapKey, setMapKey] = useState(Date.now()); // מפתח ייחודי לאילוץ רינדור מחדש של המפה
  const [isMapboxLoaded, setIsMapboxLoaded] = useState(false);
  const [mapLoadRetries, setMapLoadRetries] = useState(0);

  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // וידוא טעינת ספריית Mapbox
  useEffect(() => {
    // בדיקה האם הספרייה נטענה
    const checkMapboxLoaded = () => {
      if (window.mapboxgl) {
        console.log('Mapbox GL JS is loaded');
        setIsMapboxLoaded(true);
        return true;
      }
      return false;
    };

    // אם הספרייה לא נטענה, נסה לטעון אותה שוב
    if (!checkMapboxLoaded() && mapLoadRetries < 3) {
      console.log(`Forcing mapbox reload (attempt ${mapLoadRetries + 1})`);
      
      // כפה רינדור מחדש של המפה
      setMapKey(Date.now());
      setMapLoadRetries(prev => prev + 1);
      
      // נסה שוב לבדוק אם הספרייה נטענה אחרי זמן קצר
      const timer = setTimeout(() => {
        if (!checkMapboxLoaded()) {
          console.warn('Mapbox still not loaded after retry. This may indicate a problem with the Mapbox library or network.');
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [mapLoadRetries]);

  // פונקציה לניסיון מחדש במקרה של כישלון טעינה
  const handleRetryMapLoad = () => {
    setMapKey(Date.now());
    setMapLoadRetries(0);
  };

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
            
            {!isMapboxLoaded && mapLoadRetries >= 3 && (
              <div className="map-loading-message map-load-error">
                <p><strong>הערה:</strong> נראה שיש בעיה בטעינת המפה. אם המפה אינה מופיעה, ייתכן שיש בעיה בחיבור האינטרנט או בטעינת ספריית Mapbox.</p>
                <button 
                  className="map-retry-button"
                  onClick={handleRetryMapLoad}
                >
                  נסה שוב
                </button>
              </div>
            )}
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
