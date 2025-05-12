import React, { useEffect, useState } from 'react';
import '../../styles/JourneyMap.css';

/**
 * גרסה פשוטה של מפת מסע עם iframe של Google Maps
 * משתמשת בפתרון שלא דורש Mapbox ולכן יציב יותר
 */
const SimpleJourneyMap = ({ locations, className = '' }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  
  // טיפול בטעינת המפה
  const handleMapLoad = () => {
    setIsMapLoading(false);
    console.log('Google Maps iframe loaded successfully');
  };
  
  // מעבר למיקום ספציפי במפה
  const flyToLocation = (location) => {
    // שמור את העיצוב הנוכחי לפני השינוי
    const currentViewEl = document.querySelector('.journey-map-view');
    const currentLocationsEl = document.querySelector('.journey-map-locations');
    
    if (currentViewEl && currentLocationsEl) {
      // זכור את המידות הנוכחיות
      const viewWidth = currentViewEl.offsetWidth;
      const locationsWidth = currentLocationsEl.offsetWidth;
      
      // קבע סגנון קבוע - זה ימנע שינויים כשמחליפים נקודה
      currentViewEl.style.width = `${viewWidth}px`;
      currentLocationsEl.style.width = `${locationsWidth}px`;
    }
    
    // עכשיו הגדר את המיקום הנבחר
    setSelectedLocation(location);
  };
  
  // וודא שמידות הרכיבים נשמרות גם בעת טעינה ראשונית
  useEffect(() => {
    // נותן לדפדפן זמן לרנדר את הרכיבים לפני הגדרת גדלים
    const timer = setTimeout(() => {
      const viewEl = document.querySelector('.journey-map-view');
      const locationsEl = document.querySelector('.journey-map-locations');
      
      if (viewEl && locationsEl) {
        // הגדרת סגנונות באתחול - זה ימנע שינויים בהמשך
        viewEl.style.flex = '0 0 66.666%';
        viewEl.style.width = '66.666%';
        locationsEl.style.flex = '0 0 33.333%';
        locationsEl.style.width = '33.333%';
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // בדיקה האם מיקום הוא הנבחר הנוכחי
  const isLocationSelected = (location) => {
    return selectedLocation && selectedLocation.id === location.id;
  };
  
  // מפה סטטית של מרכז אירופה וישראל
  // אפשר להחליף ב-iframe עם המיקומים המסומנים של GoogleMaps
  const mapUrl = () => {
    // במקרה שיש מיקום נבחר, הצג אותו
    if (selectedLocation) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${selectedLocation.latitude},${selectedLocation.longitude}&zoom=8`;
    }
    
    // אחרת, הצג את כל המפה של אירופה וישראל
    return 'https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=45.0,20.0&zoom=4';
  };
  
  return (
    <div className={`journey-map-container ${className}`} dir="rtl">
      <div className="journey-map-header">
        {/* <h3 className="journey-map-title">מסע חייה של מרים אופנהיימר יעקובסון</h3> */}
        <button 
          className="journey-map-view-all" 
          onClick={() => setSelectedLocation(null)}
        >
          הצג את כל המסע
        </button>
      </div>
      
      <div className="journey-map-content">
        {/* רשימת המיקומים לניווט מהיר */}
        <div className="journey-map-locations" style={{ flex: '0 0 33.333%', width: '33.333%' }}>
          <ul className="journey-map-location-list">
            {locations.map((location, index) => (
              <li
                key={location.id}
                className={`journey-map-location-item ${isLocationSelected(location) ? 'active' : ''}`}
                onClick={() => flyToLocation(location)}
              >
                <div className="journey-map-location-number">{index + 1}</div>
                <div className="journey-map-location-info">
                  <div className="journey-map-location-name">{location.name}</div>
                  <div className="journey-map-location-date">{location.dateRange}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* מכיל המפה - חשוב לקבוע גודל קבוע */}
        <div className="journey-map-view" style={{ flex: '0 0 66.666%', width: '66.666%' }}>
          {isMapLoading && (
            <div className="journey-map-loading" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%', 
              width: '100%', 
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 5
            }}>
              <p>טוען את המפה...</p>
            </div>
          )}
          
          {/* מפה פשוטה מבוססת Google Maps במקום Mapbox */}
          <iframe
            width="100%"
            height="100%"
            style={{ 
              border: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl()}
            onLoad={handleMapLoad}
            className="google-map-iframe"
          />
        </div>
      </div>
      
      {/* תיבת פרטים למיקום הנבחר */}
      {selectedLocation && (
        <div className="journey-map-details">
          <h4 className="journey-map-details-title">{selectedLocation.name}</h4>
          <p className="journey-map-details-date">{selectedLocation.dateRange}</p>
          <p className="journey-map-details-description">{selectedLocation.description}</p>
        </div>
      )}
    </div>
  );
};

export default SimpleJourneyMap;
