import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import '../../styles/JourneyMap.css';

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
  const canvasContainerRef = useRef(null);

  // Resize canvas when container resizes
  useEffect(() => {
    const resizeCanvas = () => {
      if (linesRef.current && canvasContainerRef.current) {
        const canvas = linesRef.current;
        const container = canvasContainerRef.current;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        drawJourneyLines();
      }
    };

    const observer = new ResizeObserver(resizeCanvas);
    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    resizeCanvas();

    return () => observer.disconnect();
  }, [locations]);

  const drawJourneyLines = () => {
    const canvas = linesRef.current;
    const ctx = canvas?.getContext('2d');
    const map = mapRef.current;

    if (!ctx || !map || locations.length < 2) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff4d00';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();

    locations.forEach((loc, index) => {
      const { x, y } = map.project([loc.longitude, loc.latitude]);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  };

  useEffect(() => {
    drawJourneyLines();
  }, [viewport, selectedLocation]);

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

  const viewFullJourney = () => {
    setSelectedLocation(null);

    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;

    locations.forEach(loc => {
      minLat = Math.min(minLat, loc.latitude);
      maxLat = Math.max(maxLat, loc.latitude);
      minLng = Math.min(minLng, loc.longitude);
      maxLng = Math.max(maxLng, loc.longitude);
    });

    const padding = 2;
    minLat -= padding;
    maxLat += padding;
    minLng -= padding;
    maxLng += padding;

    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat]
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

        <div className="journey-map-view" ref={canvasContainerRef}>
          <Map
            {...viewport}
            ref={mapRef}
            width="100%"
            height="100%"
            mapStyle="mapbox://styles/mapbox/light-v10"
            onMove={evt => setViewport(evt.viewState)}
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          >
            <NavigationControl position="top-left" />

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
          </Map>

          <canvas
            ref={linesRef}
            className="journey-map-lines"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              pointerEvents: 'none'
            }}
          />
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
