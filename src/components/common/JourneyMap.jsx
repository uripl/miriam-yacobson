import React, { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/JourneyMap.css';

const JourneyMap = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapboxLib, setMapboxLib] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // אתחול המפה
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      // יבוא דינמי של mapboxgl
      import('mapbox-gl').then(mapboxglLib => {
        // שמור את הספרייה לשימוש אחר כך
        setMapboxLib(mapboxglLib.default);
        
        const mapboxgl = mapboxglLib.default;
        // שימוש במפתח API מהסביבה או ערך ברירת מחדל
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoidXJpcGxlc3NlciIsImEiOiJjbWEzdzc2emwwMG5kMmtxejAzdWtya3ZqIn0.Ipxq0bDQtuY82BO883EbeA';
        
        // בדיקה אם WebGL נתמך
        if (!mapboxgl.supported()) {
          console.error('הדפדפן שלך לא תומך ב-Mapbox GL');
          return;
        }
        
        const newMap = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [20.0, 45.0], // מיקום התחלתי במרכז אירופה
          zoom: 3.5
        });
        
        newMap.on('load', () => {
          setMapLoaded(true);
          console.log('מפת Mapbox נטענה בהצלחה');
          
          // הוספת שכבת קווים למסע
          if (locations.length > 1) {
            newMap.addSource('route', {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                  'type': 'LineString',
                  'coordinates': locations.map(loc => [loc.longitude, loc.latitude])
                }
              }
            });
            
            newMap.addLayer({
              'id': 'route',
              'type': 'line',
              'source': 'route',
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
              },
              'paint': {
                'line-color': '#e67e22',
                'line-width': 3,
                'line-dasharray': [2, 1]
              }
            });
          }
          
          // הוספת סמנים למפה
          locations.forEach((location, index) => {
            // יצירת אלמנט HTML מותאם לסמן
            const el = document.createElement('div');
            el.className = 'journey-map-marker';
            el.innerHTML = index + 1;
            el.addEventListener('click', () => {
              setSelectedLocation(location);
              
              // טיסה למיקום הנבחר
              newMap.flyTo({
                center: [location.longitude, location.latitude],
                zoom: 8,
                duration: 1000
              });
            });
            
            // הוספת הסמן למפה
            new mapboxgl.Marker(el)
              .setLngLat([location.longitude, location.latitude])
              .addTo(newMap);
          });
        });
        
        // טיפול בשגיאות טעינה
        newMap.on('error', (e) => {
          console.error('שגיאה בטעינת מפת Mapbox:', e);
        });
        
        setMap(newMap);
      }).catch(err => {
        console.error('נכשל בטעינת Mapbox GL:', err);
      });
    }
    
    // ניקוי בעת פירוק הקומפוננטה
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [locations]); // תלות בlocations

  // וודא שמידות הרכיבים נשמרות גם בעת טעינה ראשונית
  useEffect(() => {
    // פונקציה להגדרת הגדלים הקבועים
    const setFixedSizes = () => {
      // קונטיינר ראשי
      const containerEl = document.querySelector('.journey-map-container');
      if (containerEl) {
        containerEl.style.width = '100%';
        containerEl.style.maxWidth = '100%';
      }
      
      // קונטיינר התוכן
      const contentEl = document.querySelector('.journey-map-content');
      if (contentEl) {
        contentEl.style.width = '100%';
        contentEl.style.display = 'flex';
        contentEl.style.flexDirection = 'row';
      }
      
      // אזור המפה
      const viewEl = document.querySelector('.journey-map-view');
      if (viewEl) {
        viewEl.style.flex = '0 0 66.666%';
        viewEl.style.width = '66.666%';
      }
      
      // אזור הרשימה
      const locationsEl = document.querySelector('.journey-map-locations');
      if (locationsEl) {
        locationsEl.style.flex = '0 0 33.333%';
        locationsEl.style.width = '33.333%';
      }
    };
    
    // קריאה ראשונית לפונקציה
    setFixedSizes();
    
    // קריאה נוספת אחרי זמן קצר (למקרה שהתצוגה לא התייצבה לגמרי)
    const timer = setTimeout(setFixedSizes, 100);
    
    // Observer לניטור שינויים במידות האלמנטים
    if (typeof ResizeObserver !== 'undefined') {
      const container = document.querySelector('.journey-map-container');
      if (container) {
        const resizeObserver = new ResizeObserver(() => {
          setFixedSizes();
        });
        
        resizeObserver.observe(container);
        
        // ניקוי ה-observer
        return () => {
          resizeObserver.disconnect();
          clearTimeout(timer);
        };
      }
    }
    
    return () => clearTimeout(timer);
  }, []);

  // הצגת כל המסע במפה
  const viewFullJourney = () => {
    if (!map || !mapboxLib || locations.length === 0) return;
    
    setSelectedLocation(null);
    
    const bounds = new mapboxLib.LngLatBounds();
    locations.forEach(location => {
      bounds.extend([location.longitude, location.latitude]);
    });
    
    map.fitBounds(bounds, {
      padding: 50,
      duration: 1000
    });
  };

  return (
    <div 
      className="journey-map-container"
      dir="rtl"
      style={{ 
        width: '100%', 
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="journey-map-header">
        <button 
          className="journey-map-view-all" 
          onClick={viewFullJourney}
        >
          הצג את כל המסע
        </button>
      </div>

      <div 
        className="journey-map-content"
        style={{ 
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '600px'
        }}
      >
        {/* רשימת המיקומים - בצד ימין */}
        <div 
          className="journey-map-locations" 
          style={{ 
            flex: '0 0 33.333%', 
            width: '33.333%',
            overflow: 'auto',
            order: 1 /* רשימה ראשונה (מימין) בגישה RTL */
          }}
        >
          <ul className="journey-map-location-list">
            {locations.map((location, index) => (
              <li
                key={location.id}
                className={`journey-map-location-item ${selectedLocation && selectedLocation.id === location.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedLocation(location);
                  
                  if (map) {
                    map.flyTo({
                      center: [location.longitude, location.latitude],
                      zoom: 8,
                      duration: 1000
                    });
                  }
                }}
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

        {/* מכל המפה - בצד שמאל */}
        <div 
          className="journey-map-view" 
          ref={mapContainerRef}
          style={{ 
            flex: '0 0 66.666%', 
            width: '66.666%',
            position: 'relative',
            order: 2 /* מפה שנייה (משמאל) בגישה RTL */
          }}
        >
          {!mapLoaded && (
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f5f5f5',
                zIndex: 5
              }}
            >
              טוען מפה...
            </div>
          )}
        </div>
      </div>

      {/* פרטי המיקום הנבחר */}
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
