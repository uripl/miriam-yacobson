import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPlus, FaTrash, FaTimes, FaSpinner } from 'react-icons/fa';

const EditableGallery = ({ collectionName = 'gallery' }) => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
        imageUrl: url,
        title: title.trim(),
        description: description.trim(),
        year: year.trim(),
        addedBy: user.email,
        addedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, collectionName), newDoc);
      setItems(prev => [{ id: docRef.id, ...newDoc }, ...prev]);
      resetForm();
    } catch (err) {
      console.error('Error adding image:', err);
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
      console.error('Error deleting image:', err);
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
    <div className="eg-wrapper">
      <div className="eg-grid">
        {items.map(item => (
          <div key={item.id} className="eg-card">
            <div className="eg-card-image">
              <img src={item.imageUrl} alt={item.title} />
              {isAdmin && (
                <button className="eg-delete-btn" onClick={() => handleDelete(item)} aria-label="מחק">
                  <FaTrash />
                </button>
              )}
            </div>
            <div className="eg-card-info">
              <h4 className="eg-card-title">{item.title}</h4>
              {item.year && <span className="eg-card-year">{item.year}</span>}
              {item.description && <p className="eg-card-desc">{item.description}</p>}
            </div>
          </div>
        ))}

        {isAdmin && (
          <button className="eg-add-card" onClick={() => setShowForm(true)}>
            <FaPlus />
            <span>הוסף תמונה</span>
          </button>
        )}
      </div>

      {showForm && (
        <div className="eg-modal-overlay" onClick={resetForm}>
          <form className="eg-modal" onClick={e => e.stopPropagation()} onSubmit={handleAdd}>
            <div className="eg-modal-header">
              <h3>הוספת תמונה</h3>
              <button type="button" className="eg-modal-close" onClick={resetForm}>
                <FaTimes />
              </button>
            </div>

            <div className="eg-form-field">
              <label>תמונה *</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
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
    </div>
  );
};

export default EditableGallery;
