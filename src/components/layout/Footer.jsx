// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

/**
 * קומפוננטת הכותרת התחתונה של האתר
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-column">
            <h3>מאפילה לאורה</h3>
            <p>
              אתר הנצחה המספר את סיפור חייה של מרים אופנהיימר (יעקובסון), 
              ניצולת שואה שעלתה לארץ ישראל והקימה בה בית לתפארת.
            </p>
          </div>

          <div className="footer-column">
            <h3>ניווט מהיר</h3>
            <ul>
              <li>
                <Link to="/">ציר זמן</Link>
              </li>
              <li>
                <Link to="/journey-map">מפת מסע</Link>
              </li>
              <li>
                <Link to="/gallery">גלריה</Link>
              </li>
              <li>
                <Link to="/documents">מסמכים</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>פרקי חיים</h3>
            <ul>
              <li>
                <Link to="/chapters/childhood">ילדות בלייפציג</Link>
              </li>
              <li>
                <Link to="/chapters/belgium">החיים בבלגיה</Link>
              </li>
              <li>
                <Link to="/chapters/france">צרפת תחת הכיבוש</Link>
              </li>
              <li>
                <Link to="/chapters/holocaust">בעמק הבכא</Link>
              </li>
              <li>
                <Link to="/chapters/liberation">השחרור והחזרה לליון</Link>
              </li>
              <li>
                <Link to="/chapters/immigration">העלייה לישראל</Link>
              </li>
              <li>
                <Link to="/chapters/israel">חיים בארץ ישראל</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>צרו קשר</h3>
            <p>
              <a href="mailto:info@miriam-story.org.il">
                <FaEnvelope /> info@miriam-story.org.il
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} מאפילה לאורה - כל הזכויות שמורות | 
            פרויקט הנצחה למרים אופנהיימר (יעקובסון)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
