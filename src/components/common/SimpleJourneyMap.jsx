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
    setSelectedLocation(location);
  };

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
        <h3 className="journey-map-title">מסע חייה של מרים אופנהיימר יעקובסון</h3>
        <button 
          className="journey-map-view-all" 
          onClick={() => setSelectedLocation(null)}
        >
          הצג את כל המסע
        </button>
      </div>

      <div className="journey-map-content">
        {/* רשימת המיקומים לניווט מהיר */}
        <div className="journey-map-locations">
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
        <div className="journey-map-view">
          {isMapLoading && (
            <div className="journey-map-loading">
              <div className="journey-map-loading-spinner"></div>
              <p>טוען את המפה...</p>
            </div>
          )}
          
          {/* מפה פשוטה מבוססת Google Maps במקום Mapbox */}
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
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