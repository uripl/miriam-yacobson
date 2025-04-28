import React, { useState, useEffect } from 'react';
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

  // מעקב אחר גלילה להצגת כפתור חזרה לראש הדף
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // ניקוי האזנה לאירוע בעת פירוק הקומפוננטה
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
