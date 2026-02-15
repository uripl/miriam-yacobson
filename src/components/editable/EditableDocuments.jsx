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
  const [year, setYear] = useState('');
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
    setYear('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowForm(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectedFile || !title.trim()) return;

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
        year: year.trim(),
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
                  {item.year && <span className="ed-card-year">{item.year}</span>}
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
              <label>שנה</label>
              <input
                type="text"
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="לדוגמה: 1945"
              />
            </div>

            <div className="eg-modal-actions">
              <button type="submit" className="editable-btn save-btn" disabled={uploading}>
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
