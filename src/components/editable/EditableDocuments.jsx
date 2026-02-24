import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaTimes, FaSpinner, FaFilePdf, FaFileImage, FaExternalLinkAlt, FaEllipsisV, FaPen } from 'react-icons/fa';
import ChapterFilter from '../common/ChapterFilter';
import ImageLightbox from '../common/ImageLightbox';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { CHAPTERS, MONTHS_HE, formatItemDate, formatItemChapters } from '../../utils/constants';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

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

const isPdf = (url) => url?.toLowerCase().includes('.pdf') || url?.includes('application%2Fpdf');

const PdfThumbnail = ({ url }) => {
  const [status, setStatus] = useState('loading');
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ed-pdf-thumb-wrapper" ref={containerRef}>
      {status === 'loading' && (
        <div className="ed-pdf-loading"><FaSpinner className="editable-image-spinner" /></div>
      )}
      {status === 'error' && (
        <div className="ed-pdf-icon"><FaFilePdf /></div>
      )}
      {status !== 'error' && containerWidth > 0 && (
        <Document
          file={{ url, withCredentials: false }}
          onLoadSuccess={() => setStatus('success')}
          onLoadError={() => setStatus('error')}
          loading={null}
        >
          {status === 'success' && (
            <Page
              pageNumber={1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          )}
        </Document>
      )}
    </div>
  );
};

const EditableDocuments = ({ collectionName = 'documents' }) => {
  const { user, isAdmin, editMode } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
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
  const [activeChapter, setActiveChapter] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

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
    setDocType(item.docType || '');
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
    if (!editItem && !selectedFile) return;

    if (selectedFile && selectedFile.size > 25 * 1024 * 1024) {
      alert('הקובץ גדול מדי. גודל מקסימלי: 25MB');
      return;
    }

    setUploading(true);
    try {
      if (editItem) {
        const updated = {
          title: title.trim(),
          description: description.trim(),
          docType: docType || '',
          chapters: selectedChapters,
          ...(dateYear ? { dateYear: Number(dateYear) } : { dateYear: null }),
          ...(dateYear && dateMonth ? { dateMonth: Number(dateMonth) } : { dateMonth: null }),
          ...(dateYear && dateMonth && dateDay ? { dateDay: Number(dateDay) } : { dateDay: null }),
        };
        await updateDoc(doc(db, collectionName, editItem.id), updated);
        setItems(prev => prev.map(i => i.id === editItem.id ? { ...i, ...updated } : i));
      } else {
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
          addedAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, collectionName), newDoc);
        setItems(prev => [{ id: docRef.id, ...newDoc }, ...prev]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving document:', err);
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

  if (loading) return <div className="eg-loading"><FaSpinner className="editable-image-spinner" /></div>;

  const filteredItems = activeChapter
    ? items.filter(item => item.chapters?.includes(activeChapter))
    : items;

  return (
    <div className="ed-wrapper" onClick={() => setOpenMenuId(null)}>
      <ChapterFilter selected={activeChapter} onChange={setActiveChapter} />
      <div className="ed-grid">
        {filteredItems.map(item => {
          const pdf = isPdf(item.fileUrl) || item.fileType?.includes('pdf');
          return (
            <div key={item.id} className="ed-card" onClick={() => handleClick(item)}>
              <div className="ed-card-thumb">
                {pdf ? <PdfThumbnail url={item.fileUrl} /> : <img src={item.fileUrl} alt={item.title} />}
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

        {isAdmin && editMode && (
          <button className="eg-add-card" onClick={() => { setEditItem(null); setShowForm(true); }}>
            <FaPlus />
            <span>הוסף מסמך</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="eg-modal-overlay" onClick={resetForm}>
          <form className="eg-modal" onClick={e => e.stopPropagation()} onSubmit={handleAdd}>
            <div className="eg-modal-header">
              <h3>{editItem ? 'עריכת מסמך' : 'הוספת מסמך'}</h3>
              <button type="button" className="eg-modal-close" onClick={resetForm}><FaTimes /></button>
            </div>

            {!editItem && (
              <div className="eg-form-field">
                <label>קובץ (תמונה או PDF) *</label>
                <input ref={fileInputRef} type="file" accept="image/*,.pdf" onChange={e => setSelectedFile(e.target.files[0])} required />
              </div>
            )}

            <div className="eg-form-field">
              <label>כותרת *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>

            <div className="eg-form-field">
              <label>סוג מסמך</label>
              <select value={docType} onChange={e => setDocType(e.target.value)}>
                {DOC_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
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
                  {Array.from({ length: 126 }, (_, i) => 1900 + i).map(y => <option key={y} value={y}>{y}</option>)}
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

      {preview && (
        <ImageLightbox
          src={preview.fileUrl}
          alt={preview.title}
          caption={[preview.title, preview.description].filter(Boolean).join('\n')}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
};

export default EditableDocuments;
