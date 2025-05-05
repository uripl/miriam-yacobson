import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { mapboxWorker } from './mapbox-worker';

// אתחול העובדים של Mapbox (פתרון לבעיות תאימות)
if (typeof window !== 'undefined') {
  mapboxWorker.initialize();
}

// הגדרת משתנה גלובלי כדי למנוע בעיות בעת אתחול המפה פעמיים בקוד React Strict Mode
window.MAPBOX_INITIALIZED = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
