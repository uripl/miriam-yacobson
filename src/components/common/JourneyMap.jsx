import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/JourneyMap.css';

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
    zoom: 4,
    bearing: 0,
    pitch: 0
  });

  // מיקום נבחר להצגת פרטים
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // רפרנסים לאלמנטים במפה
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const mapContainerRef = useRef(null);

  // התאמת גודל הקנבס לגודל המפה
  const resizeCanvas = () => {
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
    ctx.scale(scale, scale);
    
    // ציור מחדש של הקווים לאחר שינוי גודל
    drawJourneyLines();
  };

  // ציור הקווים בין נקודות המסע
  const drawJourneyLines = () => {
    const canvas = canvasRef.current;
    const map = mapRef.current?.getMap();
    
    if (!canvas || !map || !map.loaded() || locations.length < 2) return;
    
    const ctx = canvas.getContext('2d');
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
      
      const point = map.project([location.longitude, location.latitude]);
      
      if (firstPoint) {
        ctx.moveTo(point.x, point.y);
        firstPoint = false;
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    
    ctx.stroke();
  };

  // אתחול המצב ההתחלתי - התאמת המפה לראות את כל המסע
  useEffect(() => {
    // הצגת כל המסע בתצוגה הראשונית
    if (locations.length > 0) {
      setTimeout(() => {
        viewFullJourney();
      }, 500);
    }
    
    // הוספת האזנה לשינויי גודל
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // מעקב אחרי שינויים במפה וציור הקווים
  useEffect(() => {
    if (!mapRef.current) return;
    
    const map = mapRef.current.getMap();
    
    // ציור הקווים בכל פעם שהמפה משתנה
    const onRender = () => {
      drawJourneyLines();
    };
    
    if (map.loaded()) {
      // אם המפה כבר נטענה
      resizeCanvas();
      map.on('render', onRender);
    } else {
      // אם המפה עדיין לא נטענה במלואה
      map.once('load', () => {
        resizeCanvas();
        map.on('render', onRender);
      });
    }
    
    return () => {
      if (map.loaded()) {
        map.off('render', onRender);
      }
    };
  }, [locations, selectedLocation, viewport]);

  // מעבר למיקום ספציפי במפה
  const flyToLocation = (location) => {
    if (!mapRef.current) return;

    setSelectedLocation(location);
    
    const map = mapRef.current.getMap();
    
    map.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 8,
      duration: 1500,
      essential: true
    });
  };

  // הצגת כל המסע על המפה
  const viewFullJourney = () => {
    if (!mapRef.current || !locations.length) return;
    
    setSelectedLocation(null);
    
    // מציאת הגבולות של כל המיקומים
    const bounds = new mapboxgl.LngLatBounds();
    
    locations.forEach(location => {
      if (location.latitude && location.longitude) {
        bounds.extend([location.longitude, location.latitude]);
      }
    });
    
    // הוספת מרווח (padding) מסביב לגבולות
    const map = mapRef.current.getMap();
    
    map.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      duration: 1500
    });
  };

  // בדיקה האם מיקום הוא הנבחר הנוכחי
  const isLocationSelected = (location) => {
    return selectedLocation && selectedLocation.id === location.id;
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
            mapStyle="mapbox://styles/mapbox/light-v11"
            onMove={evt => setViewport(evt.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            attributionControl={true}
            reuseMaps
            antialias={true}
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
