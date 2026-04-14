import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, setDoc, serverTimestamp, limit, startAfter } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { parseContentKey, saveEditHistory } from '../../utils/editHistory';
import { FaHistory, FaUndo, FaSpinner, FaEye, FaTimes, FaImage, FaFont, FaChevronDown } from 'react-icons/fa';
import '../../styles/EditHistoryPage.css';

const PAGE_SIZE = 30;

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'הרגע';
  if (minutes < 60) return `לפני ${minutes} דקות`;
  if (hours < 24) return `לפני ${hours} שעות`;
  if (days < 7) return `לפני ${days} ימים`;
  return formatDate(timestamp);
};

const DiffView = ({ previousValue, newValue, type }) => {
  if (type === 'image') {
    return (
      <div className="eh-diff-images">
        <div className="eh-diff-image-box">
          <span className="eh-diff-label eh-diff-old">לפני</span>
          {previousValue ? (
            <img src={previousValue} alt="תמונה קודמת" />
          ) : (
            <div className="eh-diff-no-image">אין תמונה קודמת</div>
          )}
        </div>
        <div className="eh-diff-arrow">←</div>
        <div className="eh-diff-image-box">
          <span className="eh-diff-label eh-diff-new">אחרי</span>
          <img src={newValue} alt="תמונה חדשה" />
        </div>
      </div>
    );
  }

  return (
    <div className="eh-diff-text">
      <div className="eh-diff-block">
        <span className="eh-diff-label eh-diff-old">לפני</span>
        <div className="eh-diff-content eh-diff-content-old">
          {previousValue || <em className="eh-diff-empty">ריק</em>}
        </div>
      </div>
      <div className="eh-diff-block">
        <span className="eh-diff-label eh-diff-new">אחרי</span>
        <div className="eh-diff-content eh-diff-content-new">
          {newValue || <em className="eh-diff-empty">ריק</em>}
        </div>
      </div>
    </div>
  );
};

const EditHistoryPage = () => {
  const { user, isAdmin } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [reverting, setReverting] = useState(null);
  const [filterUser, setFilterUser] = useState('');
  const [filterType, setFilterType] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchEntries = async (afterDoc = null) => {
    try {
      let q;
      if (afterDoc) {
        q = query(
          collection(db, 'editHistory'),
          orderBy('editedAt', 'desc'),
          startAfter(afterDoc),
          limit(PAGE_SIZE)
        );
      } else {
        q = query(
          collection(db, 'editHistory'),
          orderBy('editedAt', 'desc'),
          limit(PAGE_SIZE)
        );
      }
      const snap = await getDocs(q);
      const newEntries = snap.docs.map(d => ({ id: d.id, ...d.data() }));

      if (snap.docs.length < PAGE_SIZE) {
        setHasMore(false);
      }
      if (snap.docs.length > 0) {
        setLastDoc(snap.docs[snap.docs.length - 1]);
      }

      return newEntries;
    } catch (err) {
      console.error('Error fetching edit history:', err);
      return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchEntries();
      setEntries(data);

      const users = [...new Set(data.map(e => e.editedBy).filter(Boolean))];
      setAllUsers(users);
      setLoading(false);
    };
    load();
  }, []);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const newEntries = await fetchEntries(lastDoc);
    setEntries(prev => [...prev, ...newEntries]);

    const newUsers = [...new Set([...allUsers, ...newEntries.map(e => e.editedBy).filter(Boolean)])];
    setAllUsers(newUsers);
    setLoadingMore(false);
  };

  const handleRevert = async (entry) => {
    if (!window.confirm('להחזיר את התוכן למצב הקודם?')) return;

    setReverting(entry.id);
    try {
      await setDoc(doc(db, 'content', entry.contentKey), {
        value: entry.previousValue,
        previousValue: entry.newValue,
        editedBy: user.email,
        editedAt: serverTimestamp(),
      });
      await saveEditHistory({
        contentKey: entry.contentKey,
        type: entry.type,
        previousValue: entry.newValue,
        newValue: entry.previousValue,
        editedBy: user.email,
      });

      const data = await fetchEntries();
      setEntries(data);
      setLastDoc(null);
      setHasMore(true);
    } catch (err) {
      console.error('Error reverting:', err);
      alert('שגיאה בשחזור. נסה שוב.');
    } finally {
      setReverting(null);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const filteredEntries = entries.filter(entry => {
    if (filterUser && entry.editedBy !== filterUser) return false;
    if (filterType && entry.type !== filterType) return false;
    return true;
  });

  if (!isAdmin) {
    return (
      <div className="eh-page">
        <div className="eh-no-access">
          <FaHistory />
          <p>עמוד זה זמין למנהלים בלבד</p>
        </div>
      </div>
    );
  }

  return (
    <div className="eh-page">
      <div className="eh-container">
        <div className="eh-header">
          <h1><FaHistory /> היסטוריית עריכות</h1>
          <p>מעקב אחר כל השינויים שבוצעו באתר</p>
        </div>

        <div className="eh-filters">
          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="eh-filter-select"
          >
            <option value="">כל העורכים</option>
            {allUsers.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="eh-filter-select"
          >
            <option value="">כל הסוגים</option>
            <option value="text">טקסט</option>
            <option value="image">תמונה</option>
          </select>
        </div>

        {loading ? (
          <div className="eh-loading">
            <FaSpinner className="editable-image-spinner" />
            <span>טוען היסטוריה...</span>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="eh-empty">
            <FaHistory />
            <p>אין עריכות להצגה</p>
          </div>
        ) : (
          <>
            <div className="eh-list">
              {filteredEntries.map(entry => (
                <div key={entry.id} className={`eh-entry ${expandedId === entry.id ? 'expanded' : ''}`}>
                  <div className="eh-entry-header" onClick={() => toggleExpand(entry.id)}>
                    <div className="eh-entry-icon">
                      {entry.type === 'image' ? <FaImage /> : <FaFont />}
                    </div>
                    <div className="eh-entry-info">
                      <div className="eh-entry-title">{parseContentKey(entry.contentKey)}</div>
                      <div className="eh-entry-meta">
                        <span className="eh-entry-user">{entry.editedBy}</span>
                        <span className="eh-entry-time" title={formatDate(entry.editedAt)}>
                          {formatRelativeTime(entry.editedAt)}
                        </span>
                      </div>
                    </div>
                    <div className="eh-entry-actions">
                      <button
                        className="eh-btn eh-btn-view"
                        onClick={(e) => { e.stopPropagation(); toggleExpand(entry.id); }}
                        title="הצג שינויים"
                      >
                        {expandedId === entry.id ? <FaTimes /> : <FaEye />}
                      </button>
                      <button
                        className="eh-btn eh-btn-revert"
                        onClick={(e) => { e.stopPropagation(); handleRevert(entry); }}
                        disabled={reverting === entry.id}
                        title="שחזר לגרסה קודמת"
                      >
                        {reverting === entry.id ? <FaSpinner className="editable-image-spinner" /> : <FaUndo />}
                      </button>
                    </div>
                  </div>

                  {expandedId === entry.id && (
                    <div className="eh-entry-diff">
                      <DiffView
                        previousValue={entry.previousValue}
                        newValue={entry.newValue}
                        type={entry.type}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="eh-load-more">
                <button className="eh-btn eh-btn-load-more" onClick={loadMore} disabled={loadingMore}>
                  {loadingMore ? (
                    <><FaSpinner className="editable-image-spinner" /> טוען...</>
                  ) : (
                    <><FaChevronDown /> טען עוד</>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EditHistoryPage;
