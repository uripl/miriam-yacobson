import React, { useState, useEffect } from 'react';
import { FaEdit, FaSignInAlt } from 'react-icons/fa';

const AdminEditLink = ({ collection, text = "ערוך תוכן" }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.netlifyIdentity) {
      const currentUser = window.netlifyIdentity.currentUser();
      setUser(currentUser);

      window.netlifyIdentity.on('login', setUser);
      window.netlifyIdentity.on('logout', () => setUser(null));
    }
  }, []);

  const handleClick = (e) => {
    if (!user && window.netlifyIdentity) {
      e.preventDefault();
      window.netlifyIdentity.open();
    }
  };

  const adminUrl = collection ? `/admin/#/collections/${collection}` : '/admin/';

  return (
    <a 
      href={adminUrl} 
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        backgroundColor: user ? '#2e5077' : '#5a7a9f',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '25px',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        transition: 'all 0.2s',
        zIndex: 1000,
        cursor: 'pointer'
      }}
    >
      {user ? <FaEdit /> : <FaSignInAlt />} 
      {user ? text : 'התחבר לעריכה'}
    </a>
  );
};

export default AdminEditLink;
