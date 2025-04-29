import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import '../../styles/JourneyMap.css';
// צריך להתקין: npm install react-map-gl d3-ease mapbox-gl

/**
 * קומפוננטת מפת מסע - מציגה את מסלול חייה של מרים על מפה אינטראקטיבית
 * @param {Object} props
 * @param {Array} props.locations - מערך מיקומים להצגה במפה
 * @param {string} [props.className] - קלאס נוסף אופציונלי
 */
const JourneyMap = ({ locations, className = '' }) => {
  const [viewport, setViewport] = useState({
    latitude: 50.0,
    longitude: 10.0,
    zoom: 4,
    bearing: 0,
    pitch: 0
  });
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  const linesRef = useRef(null);
  const mapRef = useRef(null);
  
  // יצירת קווי מסע בין הנקודות
  useEffect(() => {
    if (locations.length > 1 && linesRef.current) {
      const ctx = linesRef.current.getContext('2d');
      ctx.clearRect(0, 0, linesRef.current.width, linesRef.current.height);
      
      // עיצוב הקו
      ctx.strokeStyle = '#ff4d00';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 3]);
      
      ctx.beginPath();
      
      // מעבר על כל המיקומים ויצירת קו ביניהם
      locations.forEach((location, index) => {
        const [x, y] = project(location.longitude, location.latitude);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    }
  }, [locations, viewport]);
  
  // פונקציה להמרת קואורדינטות גיאוגרפיות לפיקסלים על המפה
  const project = (longitude, latitude) => {
    const scale = Math.pow(2, viewport.zoom);
    const worldSize = 512 * scale;
    const mercatorX = (longitude + 180) / 360;
    const mercatorY = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / Math.PI;
    const pixelX = mercatorX * worldSize;
    const pixelY = (0.5 - mercatorY) * worldSize;
    
    return [pixelX, pixelY];
  };
  
  // טיסה למיקום נבחר - משתמש בAPI החדש של react-map-gl
  const flyToLocation = (location) => {
    setSelectedLocation(location);
    
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 9,
        duration: 1000,
        easing: easeCubic
      });
    }
  };
  
  // טיסה לתצוגה מלאה של כל המסע
  const viewFullJourney = () => {
    setSelectedLocation(null);
    
    // חישוב הגבולות שיכללו את כל הנקודות
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    
    locations.forEach(loc => {
      minLat = Math.min(minLat, loc.latitude);
      maxLat = Math.max(maxLat, loc.latitude);
      minLng = Math.min(minLng, loc.longitude);
      maxLng = Math.max(maxLng, loc.longitude);
    });
    
    // הוספת שוליים
    const padding = 2;
    minLat -= padding;
    maxLat += padding;
    minLng -= padding;
    maxLng += padding;
    
    if (mapRef.current) {
      // השתמש ב-fitBounds במקום FlyToInterpolator
      mapRef.current.fitBounds(
        [
          [minLng, minLat], // דרום-מערב
          [maxLng, maxLat]  // צפון-מזרח
        ],
        { duration: 1000, easing: easeCubic }
      );
    }
  };
  
  return (
    <div className={`journey-map-container ${className}`} dir="rtl">
      <div className="journey-map-header">
        <h3 className="journey-map-title">מסע חייה של מרים אופנהיימר יעקובסון</h3>
        <button className="journey-map-view-all" onClick={viewFullJourney}>
          הצג את כל המסע
        </button>
      </div>
      
      <div className="journey-map-content">
        <div className="journey-map-locations">
          <ul className="journey-map-location-list">
            {locations.map((location, index) => (
              <li 
                key={location.id} 
                className={`journey-map-location-item ${selectedLocation?.id === location.id ? 'active' : ''}`}
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
        
        <div className="journey-map-view">
          <Map
            {...viewport}
            ref={mapRef}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/light-v10"
            onMove={evt => setViewport(evt.viewState)}
            mapboxAccessToken="YOUR_MAPBOX_ACCESS_TOKEN_HERE" // יש להחליף במפתח אמיתי
          >
            {/* קווי המסע */}
            <canvas
              ref={linesRef}
              className="journey-map-lines"
              width={500}
              height={500}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                pointerEvents: 'none'
              }}
            />
            
            {/* סימוני מיקום */}
            {locations.map((location, index) => (
              <Marker 
                key={location.id}
                latitude={location.latitude}
                longitude={location.longitude}
                offset={[-15, -30]}
              >
                <div 
                  className={`journey-map-marker ${selectedLocation?.id === location.id ? 'active' : ''}`}
                  onClick={() => flyToLocation(location)}
                >
                  <div className="journey-map-marker-number">{index + 1}</div>
                  {selectedLocation?.id === location.id && (
                    <div className="journey-map-marker-tooltip">
                      <div className="journey-map-marker-name">{location.name}</div>
                      <div className="journey-map-marker-date">{location.dateRange}</div>
                    </div>
                  )}
                </div>
              </Marker>
            ))}
            
            {/* כפתורי ניווט במפה */}
            <NavigationControl position="top-left" />
          </Map>
        </div>
      </div>
      
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

export default JourneyMap;
