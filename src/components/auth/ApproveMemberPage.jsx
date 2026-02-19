import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';
import '../../styles/MembershipGuard.css';

const ApproveMemberPage = () => {
  const [searchParams] = useSearchParams();
  const { user, isAdmin, loading, login } = useAuth();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const uid = searchParams.get('uid');
  const email = searchParams.get('email');

  const handleApprove = async () => {
    if (!uid || !email) return;
    setStatus('loading');
    try {
      await setDoc(doc(db, 'members', uid), {
        email,
        approvedBy: user.email,
        approvedAt: new Date().toISOString(),
      });
      setStatus('success');
    } catch (err) {
      console.error('Error approving member:', err);
      setStatus('error');
    }
  };

  if (loading) {
    return <div className="membership-loading">טוען...</div>;
  }

  if (!user) {
    return (
      <div className="approve-page">
        <h2>נדרשת התחברות</h2>
        <p>יש להתחבר כמנהל כדי לאשר חברים.</p>
        <button className="approve-btn" onClick={login}>
          התחבר עם Google
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="approve-page">
        <h2>אין הרשאה</h2>
        <p>רק מנהלים יכולים לאשר חברים.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="approve-page approve-success">
        <h2>אושר בהצלחה!</h2>
        <p>הכתובת <strong>{email}</strong> נוספה לרשימת החברים.</p>
        <p>המשתמש יוכל כעת לגשת לתכני הארכיון.</p>
      </div>
    );
  }

  return (
    <div className="approve-page">
      <h2>אישור חבר</h2>
      {uid && email ? (
        <>
          <p>האם לאשר גישה לארכיון עבור:</p>
          <p><strong>{email}</strong></p>
          <button
            className="approve-btn"
            onClick={handleApprove}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'מאשר...' : 'אשר גישה'}
          </button>
          {status === 'error' && (
            <p className="approve-error">שגיאה באישור. נסה שוב.</p>
          )}
        </>
      ) : (
        <p>פרטי המשתמש חסרים בקישור.</p>
      )}
    </div>
  );
};

export default ApproveMemberPage;
