import { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Header';
import Footer from './Footer';
import { FaArrowUp } from 'react-icons/fa';

/**
 * קומפוננטת המבנה הראשי של האתר
 * @param {Object} props
 * @param {React.ReactNode} props.children - תוכן האתר
 */
const Layout = ({ children }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const ticking = useRef(false);
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      setShowScrollTop(window.scrollY > 300);
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // חזרה לראש הדף בלחיצה על כפתור
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="site-wrapper" dir="rtl">
      <Header />
      <main>{children}</main>
      <Footer />
      
      {showScrollTop && (
        <button 
          className="back-to-top" 
          onClick={scrollToTop}
          aria-label="חזרה לראש הדף"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default Layout;
