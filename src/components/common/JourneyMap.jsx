import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/JourneyMap.css';

const JourneyMap = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapboxLib, setMapboxLib] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // refs לניהול cleanup
  const animationTimeoutsRef = useRef([]);
  const isCleanedUpRef = useRef(false);
  const markersRef = useRef([]);

  // בדיקת מובייל
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // פונקציה לניקוי timeouts
  const clearAllTimeouts = useCallback(() => {
    animationTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    animationTimeoutsRef.current = [];
  }, []);

  // פונקציה לניקוי markers
  const clearAllMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      try {
        marker.remove();
      } catch (error) {
        console.warn('שגיאה בהסרת marker:', error);
      }
    });
    markersRef.current = [];
  }, []);

  // פונקציה פנימית להצגת כל המסע
  const viewFullJourneyInternal = useCallback((mapInstance, libInstance) => {
    if (!mapInstance || !libInstance || locations.length === 0 || isCleanedUpRef.current) return;
    
    try {
      // גבולות מותאמים אישית שמכסים את אירופה וישראל
      const customBounds = new libInstance.LngLatBounds(
        [0, 30],  // דרום-מערב
        [35, 55]  // צפון-מזרח
      );
      
      // הוסף את כל המיקומים לגבולות
      locations.forEach(location => {
        if (location.longitude < 0 || location.longitude > 35 ||
            location.latitude < 30 || location.latitude > 55) {
          customBounds.extend([location.longitude, location.latitude]);
        }
      });
      
      mapInstance.fitBounds(customBounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        duration: 1000,
        maxZoom: 5
      });
    } catch (error) {
      console.warn('שגיאה בהצגת כל המסע:', error);
    }
  }, [locations]);

  // אתחול המפה - גרסה מתוקנת
  useEffect(() => {
    let mapInstance = null;
    
    if (mapContainerRef.current && !map && !isCleanedUpRef.current) {
      // יבוא דינמי של mapboxgl
      import('mapbox-gl').then(mapboxglLib => {
        if (isCleanedUpRef.current) return;
        
        setMapboxLib(mapboxglLib.default);
        
        const mapboxgl = mapboxglLib.default;
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoidXJpcGxlc3NlciIsImEiOiJjbWEzdzc2emwwMG5kMmtxejAzdWtya3ZqIn0.Ipxq0bDQtuY82BO883EbeA';
        
        if (!mapboxgl.supported()) {
          console.error('הדפדפן שלך לא תומך ב-Mapbox GL');
          return;
        }
        
        mapInstance = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [25.0, 42.0],
          zoom: 3
        });
        
        mapInstance.on('load', () => {
          if (isCleanedUpRef.current) return;
          
          setMapLoaded(true);
          console.log('מפת Mapbox נטענה בהצלחה');
          
          try {
            // הוספת בקרי ניווט במפה
            mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-left');
            
            // הוספת שכבת קווים למסע - עם בדיקות בטיחות
            if (locations.length > 1) {
              // בדיקה אם ה-source כבר קיים
              if (!mapInstance.getSource('route')) {
                mapInstance.addSource('route', {
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
              }
              
              // בדיקה אם ה-layer כבר קיים
              if (!mapInstance.getLayer('route')) {
                mapInstance.addLayer({
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
            }
            
            // הוספת סמנים למפה
            locations.forEach((location, index) => {
              if (isCleanedUpRef.current) return;
              
              const el = document.createElement('div');
              el.className = 'journey-map-marker';
              el.innerHTML = index + 1;
              
              const clickHandler = () => {
                if (isCleanedUpRef.current) return;
                
                setSelectedLocation(location);
                
                // טיסה למיקום הנבחר
                try {
                  mapInstance.flyTo({
                    center: [location.longitude, location.latitude],
                    zoom: 8,
                    duration: 1000
                  });
                } catch (error) {
                  console.warn('שגיאה בטיסה למיקום:', error);
                }
              };
              
              el.addEventListener('click', clickHandler);
              
              // יצירת הסמן
              const marker = new mapboxgl.Marker(el)
                .setLngLat([location.longitude, location.latitude])
                .addTo(mapInstance);
              
              // שמירת הסמן לניקוי עתידי
              markersRef.current.push(marker);
            });
            
            // הצג את כל המסע בטעינה ראשונית
            const timeout = setTimeout(() => {
              if (!isCleanedUpRef.current) {
                viewFullJourneyInternal(mapInstance, mapboxgl);
              }
            }, 500);
            
            animationTimeoutsRef.current.push(timeout);
            
          } catch (error) {
            console.error('שגיאה באתחול המפה:', error);
          }
        });
        
        // טיפול בשגיאות טעינה
        mapInstance.on('error', (e) => {
          console.error('שגיאה בטעינת מפת Mapbox:', e);
        });
        
        setMap(mapInstance);
      }).catch(err => {
        console.error('נכשל בטעינת Mapbox GL:', err);
      });
    }
    
    // ניקוי בעת פירוק הקומפוננטה
    return () => {
      isCleanedUpRef.current = true;
      
      // ניקוי timeouts
      clearAllTimeouts();
      
      // ניקוי markers
      clearAllMarkers();
      
      // ניקוי המפה
      if (mapInstance) {
        try {
          // בדיקה והסרה בטוחה של השכבות
          if (mapInstance.getLayer && typeof mapInstance.getLayer === 'function') {
            if (mapInstance.getLayer('route')) {
              mapInstance.removeLayer('route');
            }
          }
          
          if (mapInstance.getSource && typeof mapInstance.getSource === 'function') {
            if (mapInstance.getSource('route')) {
              mapInstance.removeSource('route');
            }
          }
          
          // הריסת המפה
          if (mapInstance.remove && typeof mapInstance.remove === 'function') {
            mapInstance.remove();
          }
        } catch (error) {
          console.warn('שגיאה בניקוי המפה:', error);
        }
      }
    };
  }, [locations, clearAllTimeouts, clearAllMarkers, viewFullJourneyInternal]); // eslint-disable-line react-hooks/exhaustive-deps

  // הצגת כל המסע במפה - פונקציה ציבורית
  const viewFullJourney = useCallback(() => {
    if (isCleanedUpRef.current) return;
    
    setSelectedLocation(null);
    viewFullJourneyInternal(map, mapboxLib);
  }, [map, mapboxLib, viewFullJourneyInternal]);

  // פונקציה לטיפול בלחיצה על מיקום ברשימה
  const handleLocationClick = useCallback((location) => {
    if (isCleanedUpRef.current) return;
    
    setSelectedLocation(location);
    
    if (map && typeof map.flyTo === 'function') {
      try {
        map.flyTo({
          center: [location.longitude, location.latitude],
          zoom: 8,
          duration: 1000
        });
      } catch (error) {
        console.warn('שגיאה בטיסה למיקום:', error);
      }
    }
  }, [map]);

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
          disabled={!mapLoaded}
        >
          הצג את כל המסע
        </button>
      </div>

      <div 
        className="journey-map-content"
        style={{ 
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          height: isMobile ? 'auto' : '600px'
        }}
      >
        {/* רשימת המיקומים */}
        <div 
          className="journey-map-locations" 
          style={{ 
            flex: isMobile ? 'none' : '0 0 33.333%', 
            width: isMobile ? '100%' : '33.333%',
            height: isMobile ? '200px' : 'auto',
            overflow: 'auto',
            order: 1
          }}
        >
          <ul className="journey-map-location-list">
            {locations.map((location, index) => (
              <li
                key={location.id || `location-${index}`}
                className={`journey-map-location-item ${
                  selectedLocation && selectedLocation.id === location.id ? 'active' : ''
                }`}
                onClick={() => handleLocationClick(location)}
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

        {/* מכל המפה */}
        <div 
          className="journey-map-view" 
          ref={mapContainerRef}
          style={{ 
            flex: isMobile ? 'none' : '0 0 66.666%', 
            width: isMobile ? '100%' : '66.666%',
            height: isMobile ? '400px' : 'auto',
            minHeight: isMobile ? '400px' : 'auto',
            position: 'relative',
            order: 2
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
