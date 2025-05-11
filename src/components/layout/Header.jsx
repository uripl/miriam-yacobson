import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

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
          <img src="/images/logo.png" alt="מאפילה לאורה - לוגו" />
          <span className="site-title">מאפילה לאורה</span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={toggleMenu}
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li className="nav-item">
              <NavLink to="/" onClick={closeMenu} end>
                דף הבית
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" onClick={closeMenu}>
                אודות מרים
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/timeline" onClick={closeMenu}>
                ציר זמן
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
              <NavLink to="/documents" onClick={closeMenu}>
                מסמכים
              </NavLink>
            </li>
            {/* הוסר זמנית
            <li className="nav-item">
              <NavLink to="/about-project" onClick={closeMenu}>
                אודות הפרויקט
              </NavLink>
            </li>
            */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
