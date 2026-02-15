// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import LoginButton from '../auth/LoginButton';
import EditableImage from '../editable/EditableImage';

/**
 * קומפוננטת הכותרת העליונה של האתר
 */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // פתיחה/סגירה של התפריט הנייד
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // סגירת התפריט הנייד בניווט
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container container">
        <Link to="/" className="site-logo" onClick={closeMenu}>
          <EditableImage contentKey="site-logo" defaultSrc="/images/logo.png" alt="מאפילה לאורה - לוגו" />
          <span className="site-title">מאפילה לאורה</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li className="nav-item">
              <NavLink to="/" onClick={closeMenu} end>
                ציר זמן
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/chapters/childhood" onClick={closeMenu}>
                פרקי חיים
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/journey-map" onClick={closeMenu}>
                מפת מסע
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/gallery" onClick={closeMenu}>
                גלריה
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/videos" onClick={closeMenu}>
                סרטונים
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/documents" onClick={closeMenu}>
                מסמכים
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <LoginButton />
          <button className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
