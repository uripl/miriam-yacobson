import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { mapboxWorker } from './mapbox-worker';

// אתחול העובדים של Mapbox
if (typeof window !== 'undefined') {
  mapboxWorker.initialize();
}

// מניעת אתחול כפול במצב Strict Mode של React
window.MAPBOX_INITIALIZED = false;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
