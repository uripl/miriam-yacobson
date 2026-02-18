import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaTimes, FaSpinner, FaFilePdf, FaFileImage, FaExternalLinkAlt } from 'react-icons/fa';

const DOC_TYPES = [
  { value: '', label: 'בחר סוג...' },
  { value: 'certificate', label: 'תעודה' },
  { value: 'letter', label: 'מכתב' },
  { value: 'testimony', label: 'עדות' },
  { value: 'other', label: 'אחר' },
];

const DOC_TYPE_LABELS = {
  certificate: 'תעודה',
  letter: 'מכתב',
  testimony: 'עדות',
  other: 'אחר',
};

const CHAPTERS = [
  { value: 'childhood', label: 'ילדות' },
  { value: 'belgium', label: 'בלגיה' },
  { value: 'france', label: 'צרפת' },
  { value: 'holocaust', label: 'השואה' },
  { value: 'immigration', label: 'עלייה לארץ' },
  { value: 'israel', label: 'חיים בישראל' },
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

const isPdf = (url) => url?.toLowerCase().includes('.pdf') || url?.includes('application%2Fpdf');

const EditableDocuments = ({ collectionName = 'documents' }) => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [docType, setDocType] = useState('');
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [dateYear, setDateYear] = useState('');
  const [dateMonth, setDateMonth] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(collection(db, collectionName), orderBy('addedAt', 'desc'));
        const snap = await getDocs(q);
        setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching documents:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [collectionName]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDocType('');
    setSelectedChapters([]);
    setDateYear('');
    setDateMonth('');
    setDateDay('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowForm(false);
  };

  const toggleChapter = (value) => {
    setSelectedChapters(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    );
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedFile || !title.trim() || selectedChapters.length === 0) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `${collectionName}/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);

      const newDoc = {
        fileUrl: url,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        title: title.trim(),
        description: description.trim(),
        docType: docType || '',
        chapters: selectedChapters,
        ...(dateYear && { dateYear: Number(dateYear) }),
        ...(dateYear && dateMonth && { dateMonth: Number(dateMonth) }),
        ...(dateYear && dateMonth && dateDay && { dateDay: Number(dateDay) }),
        addedBy: user.email,
        addedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, collectionName), newDoc);
      setItems(prev => [{ id: docRef.id, ...newDoc }, ...prev]);
      resetForm();
    } catch (err) {
      console.error('Error adding document:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`למחוק את "${item.title}"?`)) return;
    try {
      await deleteDoc(doc(db, collectionName, item.id));
      setItems(prev => prev.filter(i => i.id !== item.id));
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const handleClick = (item) => {
    if (isPdf(item.fileUrl) || item.fileType?.includes('pdf')) {
      window.open(item.fileUrl, '_blank');
    } else {
      setPreview(item);
    }
  };

  if (loading) {
    return (
      <div className="eg-loading">
        <FaSpinner className="editable-image-spinner" />
      </div>
    );
  }

  return (
    <div className="ed-wrapper">
      <div className="ed-grid">
        {items.map(item => {
          const pdf = isPdf(item.fileUrl) || item.fileType?.includes('pdf');
          return (
            <div key={item.id} className="ed-card" onClick={() => handleClick(item)}>
              <div className="ed-card-thumb">
                {pdf ? (
                  <div className="ed-pdf-icon"><FaFilePdf /></div>
                ) : (
                  <img src={item.fileUrl} alt={item.title} />
                )}
                {isAdmin && (
                  <button
                    className="eg-delete-btn"
                    onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                    aria-label="מחק"
                  >
                    <FaTrash />
                  </button>
                )}
                <div className="ed-open-icon"><FaExternalLinkAlt /></div>
              </div>
              <div className="ed-card-info">
                <h4 className="ed-card-title">
                  {pdf ? <FaFilePdf className="ed-title-icon" /> : <FaFileImage className="ed-title-icon" />}
                  {item.title}
                </h4>
                <div className="ed-card-meta">
                  {item.docType && <span className="ed-card-type">{DOC_TYPE_LABELS[item.docType] || item.docType}</span>}
                  {formatItemDate(item) && <span className="ed-card-year">{formatItemDate(item)}</span>}
                  {formatItemChapters(item) && <span className="ed-card-chapters">{formatItemChapters(item)}</span>}
                </div>
                {item.description && <p className="ed-card-desc">{item.description}</p>}
              </div>
            </div>
          );
        })}

        {isAdmin && (
          <button className="eg-add-card" onClick={() => setShowForm(true)}>
            <FaPlus />
            <span>הוסף מסמך</span>
          </button>
        )}
      </div>

      {/* טופס הוספה */}
      {showForm && (
        <div className="eg-modal-overlay" onClick={resetForm}>
          <form className="eg-modal" onClick={e => e.stopPropagation()} onSubmit={handleAdd}>
            <div className="eg-modal-header">
              <h3>הוספת מסמך</h3>
              <button type="button" className="eg-modal-close" onClick={resetForm}>
                <FaTimes />
              </button>
            </div>

            <div className="eg-form-field">
              <label>קובץ (תמונה או PDF) *</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={e => setSelectedFile(e.target.files[0])}
                required
              />
            </div>

            <div className="eg-form-field">
              <label>כותרת *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="eg-form-field">
              <label>סוג מסמך</label>
              <select value={docType} onChange={e => setDocType(e.target.value)}>
                {DOC_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="eg-form-field">
              <label>תיאור</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="eg-form-field">
              <label>פרקים * <span className="eg-required-note">(חובה לפחות אחד)</span></label>
              <div className="eg-chapters-checkboxes">
                {CHAPTERS.map(ch => (
                  <label key={ch.value} className="eg-chapter-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(ch.value)}
                      onChange={() => toggleChapter(ch.value)}
                    />
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
                  {Array.from({ length: 61 }, (_, i) => 1900 + i).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {dateYear && (
                  <select value={dateMonth} onChange={e => { setDateMonth(e.target.value); setDateDay(''); }}>
                    <option value="">-- חודש --</option>
                    {MONTHS_HE.map((m, i) => (
                      <option key={i + 1} value={i + 1}>{m}</option>
                    ))}
                  </select>
                )}
                {dateYear && dateMonth && (
                  <select value={dateDay} onChange={e => setDateDay(e.target.value)}>
                    <option value="">-- יום --</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="eg-modal-actions">
              <button type="submit" className="editable-btn save-btn" disabled={uploading || selectedChapters.length === 0}>
                {uploading ? <><FaSpinner className="editable-image-spinner" /> מעלה...</> : 'הוסף'}
              </button>
              <button type="button" className="editable-btn cancel-btn" onClick={resetForm} disabled={uploading}>
                ביטול
              </button>
            </div>
          </form>
        </div>
      )}

      {/* תצוגה מוגדלת לתמונות */}
      {preview && (
        <div className="ed-preview-overlay" onClick={() => setPreview(null)}>
          <div className="ed-preview-content" onClick={e => e.stopPropagation()}>
            <button className="ed-preview-close" onClick={() => setPreview(null)}>
              <FaTimes />
            </button>
            <img src={preview.fileUrl} alt={preview.title} />
            <div className="ed-preview-info">
              <h3>{preview.title}</h3>
              {preview.description && <p>{preview.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableDocuments;
