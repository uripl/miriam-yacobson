import React, { useState, useEffect, useRef, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
// prevent mapboxgl from checking if WebGL is available during SSR
// necessary for React 18 strict mode
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/JourneyMap.css';

// עקיפת הבעיה של Worker שדורשת ב-Mapbox
if (typeof window !== 'undefined') {
  // מניעת שגיאת "no protocol specified" עם worker-loader
  mapboxgl.workerClass = class {
    constructor() {
      this.self = {
        addEventListener: () => {},
        removeEventListener: () => {},
        postMessage: () => {}
      };
    }
    terminate() {}
    postMessage() {}
  };
}

// עקיפת ההגבלות של mapbox בתוך React
// This prevents the "Failed to initialize WebGL" error in some browsers
if (!mapboxgl.supported && typeof window !== 'undefined' && window.navigator) {
  mapboxgl.supported = () => true;
}

/**
 * קומפוננטת מפת מסע - מציגה את המסע הגיאוגרפי של מרים על מפה אינטראקטיבית
 * @param {Object} props
 * @param {Array} props.locations - מערך של מיקומים במסע
 * @param {string} [props.className] - קלאס נוסף אופציונלי
 */
const JourneyMap = ({ locations, className = '' }) => {
  // מצב התצוגה הראשוני של המפה
  const [viewport, setViewport] = useState({
    latitude: 48.0,
    longitude: 10.0,
    zoom: 4
  });

  // מיקום נבחר להצגת פרטים
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // רפרנסים לאלמנטים במפה
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const mapContainerRef = useRef(null);
  
  // לבדוק אם המפה נטענה
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapLoadError, setMapLoadError] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);

  // הגדרת מפתח ה-API של Mapbox בעת טעינת הקומפוננטה
  useEffect(() => {
    console.log('Setting up Mapbox token');
    
    // הגדרה ישירה של המפתח ללא תלות בסביבה
    const token = "pk.eyJ1IjoidXJpcGxlc3NlciIsImEiOiJjbWEzdzc2emwwMG5kMmtxejAzdWtya3ZqIn0.Ipxq0bDQtuY82BO883EbeA";
    if (token) {
      // תמיד הגדר את המפתח, גם אם הוא כבר הוגדר (לא מזיק)
      mapboxgl.accessToken = token;
      console.log('Mapbox token set directly:', token.substring(0, 10) + '...');
    } else {
      console.error('Mapbox token is missing or invalid');
      setMapLoadError(true);
    }

    // הוסף טיימר להצגת שגיאה אם הטעינה לוקחת יותר מדי זמן
    const timer = setTimeout(() => {
      if (isMapLoading) {
        console.warn('Map loading timeout - might indicate a problem with Mapbox');
        setMapLoadError(true);
      }
    }, 15000); // הגדלת זמן ההמתנה ל-15 שניות
    
    return () => clearTimeout(timer);
  }, [isMapLoading]);

  // ציור הקווים בין נקודות המסע
  const drawJourneyLines = useCallback(() => {
    const canvas = canvasRef.current;
    const map = mapRef.current?.getMap();
    
    if (!canvas || !map || !mapLoaded || locations.length < 2) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // הגדרות סגנון הקו
    ctx.strokeStyle = '#e67e22'; // כתום חם
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 4]);
    ctx.beginPath();
    
    // ציור קו בין כל הנקודות על המפה
    let firstPoint = true;
    locations.forEach(location => {
      if (!location.latitude || !location.longitude) return;
      
      try {
        const point = map.project([location.longitude, location.latitude]);
        
        if (firstPoint) {
          ctx.moveTo(point.x, point.y);
          firstPoint = false;
        } else {
          ctx.lineTo(point.x, point.y);
        }
      } catch (err) {
        console.error('Error projecting coordinates:', err);
      }
    });
    
    ctx.stroke();
  }, [locations, mapLoaded]);

  // התאמת גודל הקנבס לגודל המפה
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = mapContainerRef.current;
    
    if (!canvas || !container) return;

    const { width, height } = container.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.scale(scale, scale);
    
    // ציור מחדש של הקווים לאחר שינוי גודל
    drawJourneyLines();
  }, [drawJourneyLines]);

  // הצגת כל המסע על המפה - ללא שימוש ב-LngLatBounds
  const viewFullJourney = useCallback(() => {
    if (!mapRef.current || !locations.length || !mapLoaded) return;
    
    setSelectedLocation(null);
    
    // מציאת הגבולות של כל המיקומים בצורה ידנית
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    
    locations.forEach(location => {
      if (location.latitude && location.longitude) {
        minLat = Math.min(minLat, location.latitude);
        maxLat = Math.max(maxLat, location.latitude);
        minLng = Math.min(minLng, location.longitude);
        maxLng = Math.max(maxLng, location.longitude);
      }
    });
    
    // הוספת מרווח שוליים
    const padding = 0.5;
    minLat -= padding;
    maxLat += padding;
    minLng -= padding;
    maxLng += padding;
    
    // התאמת המפה לגבולות שחישבנו
    try {
      const map = mapRef.current.getMap();
      
      map.fitBounds(
        [
          [minLng, minLat], // דרום-מערב
          [maxLng, maxLat]  // צפון-מזרח
        ],
        {
          padding: { top: 50, bottom: 50, left: 50, right: 50 },
          duration: 1000
        }
      );
    } catch (err) {
      console.error('Error fitting bounds:', err);
    }
  }, [locations, mapLoaded]);

  // טיפול באירוע טעינת המפה
  const handleMapLoad = useCallback((evt) => {
    console.log('Map loaded successfully');
    setMapLoaded(true);
    setIsMapLoading(false);
    
    // שמירת אובייקט המפה לשימוש עתידי
    if (evt && evt.target) {
      setMapInstance(evt.target);
    }
    
    // קצת השהייה לוודא שהמפה לגמרי מוכנה
    setTimeout(() => {
      resizeCanvas();
      viewFullJourney();
    }, 500);
  }, [resizeCanvas, viewFullJourney]);

  // טיפול בשגיאות מפה
  const handleMapError = (error) => {
    console.error('Mapbox error:', error);
    setMapLoadError(true);
    setIsMapLoading(false);
    
    // נסה לאבחן את הבעיה
    if (error.message && error.message.includes('API key')) {
      console.error('Mapbox API key error. Please check your token.');
    } else if (error.message && error.message.includes('network')) {
      console.error('Network error loading Mapbox resources.');
    }
  };

  // אתחול המצב ההתחלתי - התאמת המפה לראות את כל המסע
  useEffect(() => {
    // הצגת כל המסע בתצוגה הראשונית כאשר המפה נטענה
    if (mapLoaded && locations.length > 0) {
      // קצת השהייה כדי לוודא שהמפה מוכנה
      const timer = setTimeout(() => {
        viewFullJourney();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [mapLoaded, locations.length, viewFullJourney]);

  // אתחול האזנה לשינויי גודל
  useEffect(() => {
    const handleResize = () => {
      if (mapLoaded) {
        resizeCanvas();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeCanvas, mapLoaded]);

  // מעקב אחרי שינויים במפה וציור הקווים
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    
    try {
      const map = mapRef.current.getMap();
      
      // ציור הקווים בכל פעם שהמפה משתנה
      const onRender = () => {
        drawJourneyLines();
      };
      
      map.on('render', onRender);
      
      return () => {
        map.off('render', onRender);
      };
    } catch (err) {
      console.error('Error setting up map render listener:', err);
    }
  }, [drawJourneyLines, mapLoaded]);

  // מעבר למיקום ספציפי במפה
  const flyToLocation = (location) => {
    if (!mapRef.current || !mapLoaded) return;

    setSelectedLocation(location);
    
    try {
      const map = mapRef.current.getMap();
      
      map.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 8,
        duration: 1000
      });
    } catch (err) {
      console.error('Error flying to location:', err);
    }
  };

  // בדיקה האם מיקום הוא הנבחר הנוכחי
  const isLocationSelected = (location) => {
    return selectedLocation && selectedLocation.id === location.id;
  };

  // אם יש שגיאה בטעינת המפה, הצג הודעת שגיאה
  if (mapLoadError) {
    return (
      <div className="journey-map-container journey-map-error-container">
        <div className="journey-map-header">
          <h3 className="journey-map-title">מסע חייה של מרים אופנהיימר יעקובסון</h3>
        </div>
        <div className="journey-map-error">
          <h4>לא ניתן לטעון את המפה</h4>
          <p>אירעה שגיאה בטעינת המפה. נא לבדוק את חיבור האינטרנט שלך או לנסות שוב מאוחר יותר.</p>
          <p>במקרה שהבעיה ממשיכה, ייתכן שיש צורך לבדוק את הגדרות API של Mapbox.</p>
          <button 
            className="journey-map-retry-button"
            onClick={() => window.location.reload()}
          >
            נסה שוב
          </button>
        </div>
        {/* הצגת רשימת המיקומים גם במצב שגיאה */}
        <div className="journey-map-locations-only">
          <h4>מיקומים במסע</h4>
          <ul className="journey-map-location-list">
            {locations.map((location, index) => (
              <li key={location.id} className="journey-map-location-item">
                <div className="journey-map-location-number">{index + 1}</div>
                <div className="journey-map-location-info">
                  <div className="journey-map-location-name">{location.name}</div>
                  <div className="journey-map-location-date">{location.dateRange}</div>
                  <div className="journey-map-location-description">{location.description}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`journey-map-container ${className}`} dir="rtl">
      <div className="journey-map-header">
        <h3 className="journey-map-title">מסע חייה של מרים אופנהיימר יעקובסון</h3>
        <button 
          className="journey-map-view-all" 
          onClick={viewFullJourney}
          disabled={!mapLoaded}
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
        <div className="journey-map-view" ref={mapContainerRef}>
          {/* המפה עצמה */}
          <Map
            {...viewport}
            ref={mapRef}
            initialViewState={{
              latitude: 48.0,
              longitude: 10.0,
              zoom: 4
            }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            onMove={evt => setViewport(evt.viewState)}
            mapboxAccessToken="pk.eyJ1IjoidXJpcGxlc3NlciIsImEiOiJjbWEzdzc2emwwMG5kMmtxejAzdWtya3ZqIn0.Ipxq0bDQtuY82BO883EbeA"
            reuseMaps
            attributionControl={true}
            onLoad={handleMapLoad}
            onError={handleMapError}
            style={{ width: '100%', height: '100%' }}
          >
            {/* כפתורי הזום */}
            <NavigationControl position="top-left" />

            {/* סמנים עבור כל מיקום */}
            {locations.map((location, index) => (
              <Marker
                key={location.id}
                latitude={location.latitude}
                longitude={location.longitude}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  flyToLocation(location);
                }}
              >
                <div className={`journey-map-marker ${isLocationSelected(location) ? 'active' : ''}`}>
                  {index + 1}
                  
                  {/* טולטיפ שמופיע רק למיקום הנבחר */}
                  {isLocationSelected(location) && (
                    <div className="journey-map-marker-tooltip">
                      <div className="journey-map-marker-name">{location.name}</div>
                      <div className="journey-map-marker-date">{location.dateRange}</div>
                    </div>
                  )}
                </div>
              </Marker>
            ))}
          </Map>

          {/* קנבס לציור הקווים בין הנקודות */}
          <canvas
            ref={canvasRef}
            className="journey-map-lines"
          />
          
          {/* אינדיקטור טעינה */}
          {isMapLoading && (
            <div className="journey-map-loading">
              <div className="journey-map-loading-spinner"></div>
              <p>טוען את המפה...</p>
            </div>
          )}
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

export default JourneyMap;
