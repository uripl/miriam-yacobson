import React, { useState, useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../styles/JourneyMap.css';

const JourneyMap = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapboxLib, setMapboxLib] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // פונקציה ליצירת קווים מעוקלים
  const createCurvedLine = (start, end, curvature = 0.3) => {
    const midLat = (start[1] + end[1]) / 2;
    const midLng = (start[0] + end[0]) / 2;
    
    const distance = Math.sqrt(
      Math.pow(end[0] - start[0], 2) + 
      Math.pow(end[1] - start[1], 2)
    );
    
    const offsetLat = (end[0] - start[0]) * curvature;
    const offsetLng = (end[1] - start[1]) * curvature;
    
    const controlPoint = [
      midLng - offsetLng,
      midLat + offsetLat
    ];
    
    const points = [];
    for (let i = 0; i <= 50; i++) {
      const t = i / 50;
      const x = Math.pow(1 - t, 2) * start[0] + 
                2 * (1 - t) * t * controlPoint[0] + 
                Math.pow(t, 2) * end[0];
      const y = Math.pow(1 - t, 2) * start[1] + 
                2 * (1 - t) * t * controlPoint[1] + 
                Math.pow(t, 2) * end[1];
      points.push([x, y]);
    }
    
    return points;
  };

  // צבعים לתקופות שונות
  const journeyColors = {
    childhood: '#4A90E2',     // כחול - ילדות
    belgium: '#7ED321',       // ירוק - בלגיה
    france: '#F5A623',        // כתום - צרפת
    holocaust: '#D0021B',     // אדום - השואה
    liberation: '#9013FE',    // סגול - שחרור
    immigration: '#50E3C2',   // טורקיז - עלייה
    'life-in-israel': '#B8E986' // ירוק בהיר - חיים בישראל
  };

  // פונקציה להוספת קווים משופרים
  const addImprovedRoutes = (mapInstance) => {
    if (!mapInstance || !locations || locations.length < 2) return;

    // יצירת קווי מסע מעוקלים
    for (let i = 0; i < locations.length - 1; i++) {
      const currentLoc = locations[i];
      const nextLoc = locations[i + 1];
      
      const start = [currentLoc.longitude, currentLoc.latitude];
      const end = [nextLoc.longitude, nextLoc.latitude];
      
      // חישוב עוצמת העיקול בהתאם למרחק
      const distance = Math.sqrt(
        Math.pow(end[0] - start[0], 2) + 
        Math.pow(end[1] - start[1], 2)
      );
      const curvature = Math.min(0.4, distance * 0.1);
      
      const curvedCoordinates = createCurvedLine(start, end, curvature);
      
      // הוספת מקור נתונים לקו
      mapInstance.addSource(`route-${i}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {
            from: currentLoc.name,
            to: nextLoc.name,
            period: getPeriodFromLocation(currentLoc, nextLoc),
            dateRange: `${currentLoc.dateRange} → ${nextLoc.dateRange}`
          },
          geometry: {
            type: 'LineString',
            coordinates: curvedCoordinates
          }
        }
      });

      // הוספת שכבת הקו עם אנימציה
      mapInstance.addLayer({
        id: `route-${i}`,
        type: 'line',
        source: `route-${i}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': journeyColors[getPeriodFromLocation(currentLoc, nextLoc)] || '#666666',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            3, 3,
            10, 8
          ],
          'line-opacity': 0.8,
          'line-blur': 0.5
        }
      });

      // הוספת אפקט זוהר
      mapInstance.addLayer({
        id: `route-glow-${i}`,
        type: 'line',
        source: `route-${i}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': journeyColors[getPeriodFromLocation(currentLoc, nextLoc)] || '#666666',
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            3, 8,
            10, 16
          ],
          'line-opacity': 0.2,
          'line-blur': 2
        }
      });

      // הוספת חיצים לכיוון
      mapInstance.addLayer({
        id: `route-arrows-${i}`,
        type: 'symbol',
        source: `route-${i}`,
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 150,
          'text-field': '→',
          'text-size': 16,
          'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
          'text-keep-upright': false,
          'text-rotation-alignment': 'map'
        },
        paint: {
          'text-color': journeyColors[getPeriodFromLocation(currentLoc, nextLoc)] || '#666666',
          'text-opacity': 0.8
        }
      });

      // הוספת אירועי hover
      mapInstance.on('mouseenter', `route-${i}`, (e) => {
        mapInstance.getCanvas().style.cursor = 'pointer';
        
        const popup = new mapboxLib.Popup({
          closeButton: false,
          closeOnClick: false
        })
          .setLngLat(e.lngLat)
          .setHTML(`
            <div style="text-align: center; font-family: 'Heebo', Arial, sans-serif; direction: rtl;">
              <h4 style="margin: 0 0 8px 0; color: #2e5077;">${e.features[0].properties.from} ← ${e.features[0].properties.to}</h4>
              <p style="margin: 0; font-size: 12px; color: #666;">${e.features[0].properties.dateRange}</p>
            </div>
          `)
          .addTo(mapInstance);
          
        // שמירת הפופאפ כדי שנוכל להסיר אותו
        mapInstance._currentPopup = popup;
      });

      mapInstance.on('mouseleave', `route-${i}`, () => {
        mapInstance.getCanvas().style.cursor = '';
        if (mapInstance._currentPopup) {
          mapInstance._currentPopup.remove();
          mapInstance._currentPopup = null;
        }
      });

      // אנימציה הדרגתית של הקווים
      setTimeout(() => {
        if (mapInstance.getLayer(`route-${i}`)) {
          mapInstance.setPaintProperty(`route-${i}`, 'line-opacity', 0);
          mapInstance.setPaintProperty(`route-glow-${i}`, 'line-opacity', 0);
          
          const animateIn = (startTime) => {
            const duration = 1000;
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              mapInstance.setPaintProperty(`route-${i}`, 'line-opacity', progress * 0.8);
              mapInstance.setPaintProperty(`route-glow-${i}`, 'line-opacity', progress * 0.2);
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          };
          
          requestAnimationFrame(animateIn);
        }
      }, i * 300);
    }
  };

  // פונקציה לקבלת תקופה מהמיקום
  const getPeriodFromLocation = (currentLoc, nextLoc) => {
    // לוגיקה לקביעת התקופה בהתאם לשמות המיקומים או התאריכים
    if (currentLoc.name.includes('לייפציג')) return 'childhood';
    if (currentLoc.name.includes('בלגיה') || nextLoc.name.includes('בלגיה')) return 'belgium';
    if (currentLoc.name.includes('צרפת') || nextLoc.name.includes('ליון')) return 'france';
    if (currentLoc.name.includes('אושוויץ') || nextLoc.name.includes('אושוויץ')) return 'holocaust';
    if (currentLoc.dateRange && currentLoc.dateRange.includes('1945')) return 'liberation';
    if (currentLoc.name.includes('ישראל') || nextLoc.name.includes('ישראל')) return 'immigration';
    return 'childhood';
  };

  // אתחול המפה (הקוד הקיים שלך...)
  useEffect(() => {
    if (mapContainerRef.current && !map) {
      import('mapbox-gl').then(mapboxglLib => {
        setMapboxLib(mapboxglLib.default);
        
        const mapboxgl = mapboxglLib.default;
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || 'pk.eyJ1IjoidXJpcGxlc3NlciIsImEiOiJjbWEzdzc2emwwMG5kMmtxejAzdWtya3ZqIn0.Ipxq0bDQtuY82BO883EbeA';
        
        if (!mapboxgl.supported()) {
          console.error('הדפדפן שלך לא תומך ב-Mapbox GL');
          return;
        }
        
        const newMap = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [25.0, 42.0],
          zoom: 3
        });
        
        newMap.on('load', () => {
          setMapLoaded(true);
          console.log('מפת Mapbox נטענה בהצלחה');
          
          newMap.addControl(new mapboxgl.NavigationControl(), 'top-left');
          
          // הוספת סמנים (הקוד הקיים שלך...)
          locations.forEach((location, index) => {
            const el = document.createElement('div');
            el.className = 'journey-map-marker';
            el.innerHTML = index + 1;
            el.addEventListener('click', () => {
              setSelectedLocation(location);
              newMap.flyTo({
                center: [location.longitude, location.latitude],
                zoom: 8,
                duration: 1000
              });
            });
            
            new mapboxgl.Marker(el)
              .setLngLat([location.longitude, location.latitude])
              .addTo(newMap);
          });
          
          // הוספת הקווים המשופרים
          setTimeout(() => {
            addImprovedRoutes(newMap);
          }, 1000);
          
          setTimeout(() => {
            viewFullJourneyInternal(newMap, mapboxgl);
          }, 1500);
        });
        
        setMap(newMap);
      });
    }
    
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [locations]);

  // שאר הקוד הקיים שלك...
  const viewFullJourneyInternal = (mapInstance, libInstance) => {
    if (!mapInstance || !libInstance || locations.length === 0) return;
    
    const customBounds = new libInstance.LngLatBounds(
      [0, 30],
      [35, 55]
    );
    
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
  };

  const viewFullJourney = () => {
    setSelectedLocation(null);
    viewFullJourneyInternal(map, mapboxLib);
  };

  // שאר הקוד זהה לקוד הקיים שלך...
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
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          height: isMobile ? 'auto' : '600px'
        }}
      >
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

        <div 
          className="journey-map-view" 
          ref={mapContainerRef}
          style={{ 
            flex: isMobile ? 'none' : '0 0 66.666%', 
            width: isMobile ? '100%' : '66.666%',
            height: isMobile ? '400px' : 'auto',
            minHeight: isMobile ? '400px' : 'auto',
            position: 'relative',
            order: isMobile ? 2 : 2
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
