import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaTimes, FaSpinner, FaPlay, FaEllipsisV, FaPen } from 'react-icons/fa';
import ChapterFilter from '../common/ChapterFilter';
import { CHAPTERS, MONTHS_HE, formatItemDate, formatItemChapters } from '../../utils/constants';
import HebrewDateTooltip from '../common/HebrewDateTooltip';

const extractVideoId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const EditableVideos = ({ collectionName = 'videos' }) => {
  const { user, isAdmin, editMode } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [dateYear, setDateYear] = useState('');
  const [dateMonth, setDateMonth] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [urlError, setUrlError] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy('addedAt', 'desc'));
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [collectionName]);

  const resetForm = () => {
    setYoutubeUrl('');
    setTitle('');
    setDescription('');
    setSelectedChapters([]);
    setDateYear('');
    setDateMonth('');
    setDateDay('');
    setUrlError('');
    setShowForm(false);
    setEditItem(null);
  };

  const toggleChapter = (value) => {
    setSelectedChapters(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    );
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    if (url && !extractVideoId(url)) {
      setUrlError('קישור YouTube לא תקין');
    } else {
      setUrlError('');
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setTitle(item.title || '');
    setDescription(item.description || '');
    setYoutubeUrl(item.youtubeUrl || '');
    setSelectedChapters(item.chapters || []);
    setDateYear(item.dateYear ? String(item.dateYear) : '');
    setDateMonth(item.dateMonth ? String(item.dateMonth) : '');
    setDateDay(item.dateDay ? String(item.dateDay) : '');
    setOpenMenuId(null);
    setShowForm(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || selectedChapters.length === 0) return;

    setUploading(true);
    try {
      if (editItem) {
        const updated = {
          title: title.trim(),
          description: description.trim(),
          chapters: selectedChapters,
          ...(dateYear ? { dateYear: Number(dateYear) } : { dateYear: null }),
          ...(dateYear && dateMonth ? { dateMonth: Number(dateMonth) } : { dateMonth: null }),
          ...(dateYear && dateMonth && dateDay ? { dateDay: Number(dateDay) } : { dateDay: null }),
        };
        await updateDoc(doc(db, collectionName, editItem.id), updated);
        setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...updated } : i));
      } else {
        const videoId = extractVideoId(youtubeUrl);
        if (!videoId) return;
        const newDoc = {
          youtubeUrl: youtubeUrl.trim(),
          videoId,
          title: title.trim(),
          description: description.trim(),
          chapters: selectedChapters,
          ...(dateYear && { dateYear: Number(dateYear) }),
          ...(dateYear && dateMonth && { dateMonth: Number(dateMonth) }),
          ...(dateYear && dateMonth && dateDay && { dateDay: Number(dateDay) }),
          addedBy: user.email,
          addedAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, collectionName), newDoc);
        setItems(prev => [{ id: docRef.id, ...newDoc }, ...prev]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving video:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    setOpenMenuId(null);
    if (!window.confirm(`למחוק את "${item.title}"?`)) return;
    try {
      await deleteDoc(doc(db, collectionName, item.id));
      setItems(prev => prev.filter(i => i.id !== item.id));
    } catch (err) {
      console.error('Error deleting video:', err);
    }
  };

  const closeLightbox = () => setLightboxItem(null);

  if (loading) return <div className="eg-loading"><FaSpinner className="editable-image-spinner" /></div>;

  const filteredItems = activeChapter
    ? items.filter(item => item.chapters?.includes(activeChapter))
    : items;

  return (
    <div className="eg-wrapper" onClick={() => setOpenMenuId(null)}>
      <ChapterFilter selected={activeChapter} onChange={setActiveChapter} />
      <div className="eg-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="eg-card" onClick={() => setLightboxItem(item)} style={{ cursor: 'pointer' }}>
            <div className="ev-card-thumbnail">
              <img src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`} alt={item.title} />
              <div className="ev-play-overlay"><FaPlay /></div>
              {isAdmin && editMode && (
                <div className="eg-menu-wrapper" onClick={e => e.stopPropagation()}>
                  <button
                    className="eg-menu-btn"
                    onClick={() => setOpenMenuId(openMenuId === item.id ? null : item.id)}
                    aria-label="אפשרויות"
                  >
                    <FaEllipsisV />
                  </button>
                  {openMenuId === item.id && (
                    <div className="eg-menu-dropdown">
                      <button onClick={() => openEdit(item)}><FaPen /> עריכה</button>
                      <button className="eg-menu-delete" onClick={() => handleDelete(item)}><FaTrash /> מחיקה</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="eg-card-info">
              <h4 className="eg-card-title">{item.title}</h4>
              <div className="eg-card-meta">
                {formatItemDate(item) && <HebrewDateTooltip item={item}><span className="eg-card-year">{formatItemDate(item)}</span></HebrewDateTooltip>}
                {formatItemChapters(item) && <span className="eg-card-chapters">{formatItemChapters(item)}</span>}
              </div>
              {item.description && <p className="eg-card-desc">{item.description}</p>}
            </div>
          </div>
        ))}

        {isAdmin && editMode && (
          <button className="eg-add-card" onClick={() => { setEditItem(null); setShowForm(true); }}>
            <FaPlus />
            <span>הוסף סרטון</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="eg-modal-overlay" onClick={resetForm}>
          <form className="eg-modal" onClick={e => e.stopPropagation()} onSubmit={handleAdd}>
            <div className="eg-modal-header">
              <h3>{editItem ? 'עריכת סרטון' : 'הוספת סרטון'}</h3>
              <button type="button" className="eg-modal-close" onClick={resetForm}><FaTimes /></button>
            </div>

            {!editItem && (
              <div className="eg-form-field">
                <label>קישור YouTube *</label>
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={handleUrlChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                  style={{ direction: 'ltr', textAlign: 'left' }}
                />
                {urlError && <span style={{ color: 'var(--error)', fontSize: 'var(--font-size-xs)' }}>{urlError}</span>}
              </div>
            )}

            <div className="eg-form-field">
              <label>כותרת *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="eg-form-field">
              <label>תיאור</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} />
            </div>

            <div className="eg-form-field">
              <label>פרקים * <span className="eg-required-note">(חובה לפחות אחד)</span></label>
              <div className="eg-chapters-checkboxes">
                {CHAPTERS.map(ch => (
                  <label key={ch.value} className="eg-chapter-checkbox">
                    <input type="checkbox" checked={selectedChapters.includes(ch.value)} onChange={() => toggleChapter(ch.value)} />
                    {ch.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="eg-form-field">
              <label>תאריך</label>
              <div className="eg-date-selects">
                <select value={dateYear} onChange={e => { setDateYear(e.target.value); setDateMonth(''); setDateDay(''); }}>
                  <option value="">-- שנה --</option>
                  {Array.from({ length: new Date().getFullYear() - 1900 + 41 }, (_, i) => 1900 + i).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                {dateYear && (
                  <select value={dateMonth} onChange={e => { setDateMonth(e.target.value); setDateDay(''); }}>
                    <option value="">-- חודש --</option>
                    {MONTHS_HE.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                  </select>
                )}
                {dateYear && dateMonth && (
                  <select value={dateDay} onChange={e => setDateDay(e.target.value)}>
                    <option value="">-- יום --</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                )}
              </div>
            </div>

            <div className="eg-modal-actions">
              <button type="submit" className="editable-btn save-btn" disabled={uploading || selectedChapters.length === 0 || (!editItem && (!youtubeUrl || !!urlError))}>
                {uploading ? <><FaSpinner className="editable-image-spinner" /> שומר...</> : editItem ? 'שמור שינויים' : 'הוסף'}
              </button>
              <button type="button" className="editable-btn cancel-btn" onClick={resetForm} disabled={uploading}>ביטול</button>
            </div>
          </form>
        </div>
      )}

      {lightboxItem && (
        <div className="ev-lightbox-overlay" onClick={closeLightbox}>
          <div className="ev-lightbox" onClick={e => e.stopPropagation()}>
            <button className="eg-modal-close ev-lightbox-close" onClick={closeLightbox}><FaTimes /></button>
            <div className="ev-lightbox-video">
              <iframe
                src={`https://www.youtube.com/embed/${lightboxItem.videoId}`}
                title={lightboxItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="ev-lightbox-info">
              <h3>{lightboxItem.title}</h3>
              <div className="eg-card-meta">
                {formatItemDate(lightboxItem) && <HebrewDateTooltip item={lightboxItem}><span className="eg-card-year">{formatItemDate(lightboxItem)}</span></HebrewDateTooltip>}
                {formatItemChapters(lightboxItem) && <span className="eg-card-chapters">{formatItemChapters(lightboxItem)}</span>}
              </div>
              {lightboxItem.description && <p>{lightboxItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableVideos;
