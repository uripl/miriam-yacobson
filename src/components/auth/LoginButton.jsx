import { useAuth } from '../../context/AuthContext';
import { FaGoogle, FaSignOutAlt } from 'react-icons/fa';

const LoginButton = () => {
  const { user, isAdmin, loading, login, logout } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <button className="login-btn" onClick={login}>
        <FaGoogle />
        <span>התחבר</span>
      </button>
    );
  }

  if (!isAdmin) {
    return (
      <div className="login-status">
        <span className="login-unauthorized">אין הרשאת עריכה</span>
        <button className="login-btn logout-btn" onClick={logout}>
          <FaSignOutAlt />
          <span>התנתק</span>
        </button>
      </div>
    );
  }

  return (
    <div className="login-status">
      <span className="login-user-name">{user.displayName}</span>
      <button className="login-btn logout-btn" onClick={logout}>
        <FaSignOutAlt />
        <span>התנתק</span>
      </button>
    </div>
  );
};

export default LoginButton;
