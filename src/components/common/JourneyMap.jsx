import React, { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/JourneyMap.css';

const JourneyMap = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapboxLib, setMapboxLib] = useState(null);

  // אתחול המפה
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      // יבוא דינמי של mapboxgl
      import('mapbox-gl').then(mapboxglLib => {
        // שמור את הספרייה לשימוש אחר כך
        setMapboxLib(mapboxglLib.default);
        
        const mapboxgl = mapboxglLib.default;
        mapboxgl.accessToken = 'pk.eyJ1IjoidXJpcGxlc3NlciIsImEiOiJjbWEzdzc2emwwMG5kMmtxejAzdWtya3ZqIn0.Ipxq0bDQtuY82BO883EbeA';
        
        // בדיקה אם WebGL נתמך
        if (!mapboxgl.supported()) {
          console.error('Your browser does not support Mapbox GL');
          return;
        }
        
        const newMap = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [10.0, 48.0], // מיקום התחלתי במרכז אירופה
          zoom: 4
        });
        
        newMap.on('load', () => {
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
          
          // ציור קווים בין המיקומים
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
        });
        
        setMap(newMap);
      }).catch(err => {
        console.error('Failed to load Mapbox GL:', err);
      });
    }
    
    return () => {
      if (map) map.remove();
    };
  }, [locations]); // הוספנו locations לתלויות

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
    <div className="journey-map-container">
      <div className="journey-map-header">
        {/* הסרת הכותרת המיותרת */}
        <button 
          className="journey-map-view-all" 
          onClick={viewFullJourney}
        >
          הצג את כל המסע
        </button>
      </div>

      <div className="journey-map-content">
        {/* רשימת המיקומים - עכשיו באופן מפורש בצד ימין */}
        <div className="journey-map-locations">
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

        {/* מכל המפה - עכשיו לוקח את שאר השטח */}
        <div className="journey-map-view" ref={mapContainerRef}></div>
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
