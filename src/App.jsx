// src/App.jsx
import { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// אימות
import { AuthProvider } from './context/AuthContext';

// קומפוננטות שנטענות תמיד (מבנה + דף הבית)
import Layout from './components/layout/Layout';
import NewHomePage from './components/pages/NewHomePage';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy-loaded pages
const ChildhoodPage = lazy(() => import('./components/pages/chapters/ChildhoodPage'));
const BelgiumPage = lazy(() => import('./components/pages/chapters/BelgiumPage'));
const FrancePage = lazy(() => import('./components/pages/chapters/FrancePage'));
const HolocaustPage = lazy(() => import('./components/pages/chapters/HolocaustPage'));
const LiberationPage = lazy(() => import('./components/pages/chapters/LiberationPage'));
const ImmigrationPage = lazy(() => import('./components/pages/chapters/ImmigrationPage'));
const IsraelPage = lazy(() => import('./components/pages/chapters/IsraelPage'));
const JourneyMapPage = lazy(() => import('./components/pages/JourneyMapPage'));
const GalleryPage = lazy(() => import('./components/pages/GalleryPage'));
const DocumentsPage = lazy(() => import('./components/pages/DocumentsPage'));
const VideosPage = lazy(() => import('./components/pages/VideosPage'));
const MembershipGuard = lazy(() => import('./components/auth/MembershipGuard'));
const ApproveMemberPage = lazy(() => import('./components/auth/ApproveMemberPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
    <Router>
      <Layout>
        <ErrorBoundary>
        <Suspense fallback={<div className="loading-spinner">טוען...</div>}>
        <Routes>
          <Route path="/" element={<NewHomePage />} />

          {/* דפים נוספים שנשמרים */}
          <Route path="/journey-map" element={<JourneyMapPage />} />
          <Route path="/gallery" element={<MembershipGuard><GalleryPage /></MembershipGuard>} />
          <Route path="/videos" element={<MembershipGuard><VideosPage /></MembershipGuard>} />
          <Route path="/documents" element={<MembershipGuard><DocumentsPage /></MembershipGuard>} />
          <Route path="/approve" element={<ApproveMemberPage />} />

          {/* נתיבים לפרקים */}
          <Route path="/chapters/childhood" element={<ChildhoodPage />} />
          <Route path="/chapters/belgium" element={<BelgiumPage />} />
          <Route path="/chapters/france" element={<FrancePage />} />
          <Route path="/chapters/holocaust" element={<HolocaustPage />} />
          <Route path="/chapters/liberation" element={<LiberationPage />} />
          <Route path="/chapters/immigration" element={<ImmigrationPage />} />
          <Route path="/chapters/israel" element={<IsraelPage />} />

          {/* במקרה של נתיב לא קיים */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
      </Layout>
    </Router>
    </AuthProvider>
  );
}


export default App;
