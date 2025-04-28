import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// קומפוננטות מבנה
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Layout from './components/layout/Layout';

// דפים
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import TimelinePage from './components/pages/TimelinePage';
import JourneyMapPage from './components/pages/JourneyMapPage';
import GalleryPage from './components/pages/GalleryPage';
import DocumentsPage from './components/pages/DocumentsPage';
import AboutProjectPage from './components/pages/AboutProjectPage';

// פרקי חיים
import ChildhoodPage from './components/pages/chapters/ChildhoodPage';
import BelgiumPage from './components/pages/chapters/BelgiumPage';
import FrancePage from './components/pages/chapters/FrancePage';
import HolocaustPage from './components/pages/chapters/HolocaustPage';
import LiberationPage from './components/pages/chapters/LiberationPage';
import ImmigrationPage from './components/pages/chapters/ImmigrationPage';
import IsraelPage from './components/pages/chapters/IsraelPage';

// סגנונות
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/journey-map" element={<JourneyMapPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/about-project" element={<AboutProjectPage />} />
          
          {/* נתיבים לפרקים */}
          <Route path="/chapters/childhood" element={<ChildhoodPage />} />
          <Route path="/chapters/belgium" element={<BelgiumPage />} />
          <Route path="/chapters/france" element={<FrancePage />} />
          <Route path="/chapters/holocaust" element={<HolocaustPage />} />
          <Route path="/chapters/liberation" element={<LiberationPage />} />
          <Route path="/chapters/immigration" element={<ImmigrationPage />} />
          <Route path="/chapters/israel" element={<IsraelPage />} />
          
          {/* במקרה של נתיב לא קיים */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
