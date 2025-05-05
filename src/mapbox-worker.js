// פתרון עבור העובדים ב-Mapbox GL
export const mapboxWorker = {
  initialize: () => {
    // נטרל את האזהרות בקונסול לגבי עובדים של Mapbox
    if (window && !window.mapboxWorkerInitialized) {
      window.mapboxWorkerInitialized = true;
      
      // פתרון חלופי במקרה שאין worker-loader
      if (typeof Worker !== 'undefined') {
        try {
          // נחשב מראש כמה עובדים יכולים להיות פעילים
          const workerPoolSize = Math.max(2, navigator.hardwareConcurrency || 4);
          console.log(`Initializing Mapbox workers with pool size: ${workerPoolSize}`);
          
          // הגדר משתנה גלובלי כדי שמאפבוקס ידע שיש תמיכה בעובדים
          window.mapboxgl_workerCount = workerPoolSize;
        } catch (e) {
          console.warn('Error initializing Mapbox workers:', e);
        }
      }
    }
  }
};