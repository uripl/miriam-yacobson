// הצגת כל המסע במפה
const viewFullJourney = () => {
  if (!map || !mapboxLib || locations.length === 0) return;
  
  setSelectedLocation(null);
  
  const bounds = new mapboxLib.LngLatBounds();
  
  // הוספת כל המיקומים לגבולות
  locations.forEach(location => {
    bounds.extend([location.longitude, location.latitude]);
  });
  
  // הוספת שולי בטיחות ומרווח
  map.fitBounds(bounds, {
    padding: {
      top: 80,
      bottom: 80,
      left: 80,
      right: 80
    },
    duration: 1000,
    // מגביל את רמת הזום המינימלית כך שנראה אזורים מרוחקים יותר
    minZoom: 2,
    // מבטיח שהמפה לא תתקרב מדי
    maxZoom: 5
  });
  
  // תיקון רמת זום נמוכה מדי במקרה של נקודות מרוחקות מאוד
  setTimeout(() => {
    const currentZoom = map.getZoom();
    if (currentZoom > 4) {
      map.zoomTo(4, { duration: 500 });
    }
  }, 1100);
};
