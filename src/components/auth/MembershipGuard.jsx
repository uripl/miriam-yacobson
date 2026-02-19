import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';
import '../../styles/MembershipGuard.css';

const EMAILJS_SERVICE_ID = 'service_f50jxvs';
const EMAILJS_TEMPLATE_ID = 'template_qoofvkg';
const EMAILJS_PUBLIC_KEY = '7cR1q8Kjhf5Cc8hKi';

const MembershipGuard = ({ children }) => {
  const { user, isAdmin, loading, login, logout } = useAuth();
  const [isMember, setIsMember] = useState(false);
  const [checkingMembership, setCheckingMembership] = useState(true);
  const [, setEmailSent] = useState(false);

  useEffect(() => {
    if (!user) {
      setCheckingMembership(false);
      return;
    }

    const checkMembership = async () => {
      try {
        const snap = await getDoc(doc(db, 'members', user.uid));
        setIsMember(snap.exists());
      } catch (err) {
        console.error('Error checking membership:', err);
        setIsMember(false);
      } finally {
        setCheckingMembership(false);
      }
    };

    checkMembership();
  }, [user]);

  useEffect(() => {
    if (!user || isAdmin || isMember || checkingMembership) return;

    const sentKey = `membershipRequestSent_${user.uid}`;
    if (localStorage.getItem(sentKey)) {
      setEmailSent(true);
      return;
    }

    const approvalLink = `${window.location.origin}${window.location.pathname}#/approve?uid=${user.uid}&email=${encodeURIComponent(user.email)}`;

    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        user_name: user.displayName || user.email,
        user_email: user.email,
        approval_link: approvalLink,
      },
      EMAILJS_PUBLIC_KEY
    ).then(() => {
      localStorage.setItem(sentKey, 'true');
      setEmailSent(true);
    }).catch((err) => {
      console.error('Failed to send membership request email:', err);
    });
  }, [user, isAdmin, isMember, checkingMembership]);

  if (loading || checkingMembership) {
    return <div className="membership-loading">טוען...</div>;
  }

  if (!user) {
    return (
      <div className="membership-overlay">
        <div className="membership-popup">
          <h2>גישה מוגבלת</h2>
          <p>עמוד זה מיועד לחברים בלבד.</p>
          <p>אנא התחבר כדי לבקש גישה.</p>
          <button className="membership-login-btn" onClick={login}>
            <FaGoogle />
            <span>התחבר עם Google</span>
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin || isMember) {
    return children;
  }

  return (
    <div className="membership-overlay">
      <div className="membership-popup">
        <h2>בקשת גישה נשלחה</h2>
        <p>שלום {user.displayName || user.email},</p>
        <p>בקשת הגישה שלך ממתינה לאישור.</p>
        <p>תקבל הודעה כשגישתך תאושר.</p>
        <button className="membership-logout-btn" onClick={logout}>
          התנתק
        </button>
      </div>
    </div>
  );
};

export default MembershipGuard;
