// src/components/layout/Header.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaPen, FaEye } from 'react-icons/fa';
import LoginButton from '../auth/LoginButton';
import EditableImage from '../editable/EditableImage';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isAdmin, editMode, toggleEditMode } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuBtnRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // סגירת התפריט בלחיצה מחוץ לתפריט
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target) &&
          menuBtnRef.current && !menuBtnRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    // touchstart + mousedown — מגיבים מיד, לפני click
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="header-container container">
        <Link to="/" className="site-logo" onClick={closeMenu}>
          <EditableImage contentKey="site-logo" defaultSrc={process.env.PUBLIC_URL + "/images/logo.png"} alt="מאפילה לאורה - לוגו" />
          <span className="site-title">מאפילה לאורה</span>
        </Link>

        <nav ref={navRef} className={`main-nav ${menuOpen ? 'open' : ''}`}>
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
          {isAdmin && (
            <button
              className={`edit-mode-toggle ${editMode ? 'active' : ''}`}
              onClick={toggleEditMode}
              aria-label={editMode ? 'מצב צפייה' : 'מצב עריכה'}
              title={editMode ? 'עבור למצב צפייה' : 'עבור למצב עריכה'}
            >
              {editMode ? <FaPen /> : <FaEye />}
            </button>
          )}
          <LoginButton />
          <button ref={menuBtnRef} className="mobile-menu-button"
            onClick={toggleMenu}
            onTouchEnd={(e) => { e.preventDefault(); toggleMenu(); }}
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
