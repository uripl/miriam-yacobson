import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaTimes, FaSpinner, FaEllipsisV, FaPen } from 'react-icons/fa';
import ChapterFilter from '../common/ChapterFilter';

const CHAPTERS = [
  { value: 'childhood', label: 'ילדות בגרמניה' },
  { value: 'belgium', label: 'החיים בבלגיה' },
  { value: 'france', label: 'צרפת תחת הכיבוש' },
  { value: 'holocaust', label: 'בעמק הבכא' },
  { value: 'liberation', label: 'השחרור והחזרה לליון' },
  { value: 'immigration', label: 'העלייה לישראל' },
  { value: 'israel', label: 'החיים בישראל' },
];

const MONTHS_HE = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

const formatItemDate = (item) => {
  if (item.dateYear) {
    if (item.dateMonth && item.dateDay) return `${item.dateDay} ${MONTHS_HE[item.dateMonth - 1]} ${item.dateYear}`;
    if (item.dateMonth) return `${MONTHS_HE[item.dateMonth - 1]} ${item.dateYear}`;
    return `${item.dateYear}`;
  }
  return item.year || '';
};

const formatItemChapters = (item) => {
  if (!item.chapters?.length) return '';
  return item.chapters.map(c => CHAPTERS.find(ch => ch.value === c)?.label || c).join(', ');
};

const EditableGallery = ({ collectionName = 'gallery' }) => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [dateYear, setDateYear] = useState('');
  const [dateMonth, setDateMonth] = useState('');
  const [dateDay, setDateDay] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeChapter, setActiveChapter] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy('addedAt', 'desc'));
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [collectionName]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSelectedChapters([]);
    setDateYear('');
    setDateMonth('');
    setDateDay('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowForm(false);
    setEditItem(null);
  };

  const toggleChapter = (value) => {
    setSelectedChapters(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    );
  };

  const openEdit = (item) => {
    setEditItem(item);
    setTitle(item.title || '');
    setDescription(item.description || '');
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
        // עריכה
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
        // הוספה
        if (!selectedFile) return;
        const storageRef = ref(storage, `${collectionName}/${Date.now()}_${selectedFile.name}`);
        await uploadBytes(storageRef, selectedFile);
        const url = await getDownloadURL(storageRef);
        const newDoc = {
          imageUrl: url,
          title: title.trim(),
          description: description.trim(),
          chapters: selectedChapters,
          ...(dateYear && { dateYear: Number(dateYear) }),
          ...(dateYear && dateMonth && { dateMonth: Number(dateMonth) }),
          ...(dateYear && dateMonth && dateDay && { dateDay: Number(dateDay) }),
          addedBy: user.email,
          addedAt: new Date().toISOString(),
        };
        const docRef = await addDoc(collection(db, collectionName), newDoc);
        setItems(prev => [{ id: docRef.id, ...newDoc }, ...prev]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving image:', err);
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
      console.error('Error deleting image:', err);
    }
  };

  if (loading) return <div className="eg-loading"><FaSpinner className="editable-image-spinner" /></div>;

  const filteredItems = activeChapter
    ? items.filter(item => item.chapters?.includes(activeChapter))
    : items;

  return (
    <div className="eg-wrapper" onClick={() => setOpenMenuId(null)}>
      <ChapterFilter selected={activeChapter} onChange={setActiveChapter} />
      <div className="eg-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="eg-card">
            <div className="eg-card-image">
              <img src={item.imageUrl} alt={item.title} />
              {isAdmin && (
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
                      <button onClick={() => openEdit(item)}>
                        <FaPen /> עריכה
                      </button>
                      <button className="eg-menu-delete" onClick={() => handleDelete(item)}>
                        <FaTrash /> מחיקה
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="eg-card-info">
              <h4 className="eg-card-title">{item.title}</h4>
              <div className="eg-card-meta">
                {formatItemDate(item) && <span className="eg-card-year">{formatItemDate(item)}</span>}
                {formatItemChapters(item) && <span className="eg-card-chapters">{formatItemChapters(item)}</span>}
              </div>
              {item.description && <p className="eg-card-desc">{item.description}</p>}
            </div>
          </div>
        ))}

        {isAdmin && (
          <button className="eg-add-card" onClick={() => { setEditItem(null); setShowForm(true); }}>
            <FaPlus />
            <span>הוסף תמונה</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="eg-modal-overlay" onClick={resetForm}>
          <form className="eg-modal" onClick={e => e.stopPropagation()} onSubmit={handleAdd}>
            <div className="eg-modal-header">
              <h3>{editItem ? 'עריכת תמונה' : 'הוספת תמונה'}</h3>
              <button type="button" className="eg-modal-close" onClick={resetForm}><FaTimes /></button>
            </div>

            {!editItem && (
              <div className="eg-form-field">
                <label>קובץ תמונה *</label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={e => setSelectedFile(e.target.files[0])} required />
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
                  {Array.from({ length: 61 }, (_, i) => 1900 + i).map(y => <option key={y} value={y}>{y}</option>)}
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
              <button type="submit" className="editable-btn save-btn" disabled={uploading || selectedChapters.length === 0 || (!editItem && !selectedFile)}>
                {uploading ? <><FaSpinner className="editable-image-spinner" /> שומר...</> : editItem ? 'שמור שינויים' : 'הוסף'}
              </button>
              <button type="button" className="editable-btn cancel-btn" onClick={resetForm} disabled={uploading}>ביטול</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditableGallery;
