import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPen, FaSpinner } from 'react-icons/fa';

const EditableImage = ({ contentKey, defaultSrc, alt }) => {
  const { user, isAdmin, editMode } = useAuth();
  const [src, setSrc] = useState(defaultSrc);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const snap = await getDoc(doc(db, 'content', contentKey));
        if (snap.exists()) {
          setSrc(snap.data().value);
        }
      } catch (err) {
        console.error('Error fetching image:', err);
      }
    };
    fetchContent();
  }, [contentKey]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('הקובץ גדול מדי. גודל מקסימלי: 10MB');
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `content/${contentKey}/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await setDoc(doc(db, 'content', contentKey), {
        value: url,
        previousValue: src,
        editedBy: user.email,
        editedAt: serverTimestamp(),
      });

      setSrc(url);
    } catch (err) {
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="editable-image-container">
      <img src={src} alt={alt} onError={() => setSrc(defaultSrc)} />
      {uploading && (
        <div className="editable-image-overlay">
          <FaSpinner className="editable-image-spinner" />
          <span>מעלה תמונה...</span>
        </div>
      )}
      {isAdmin && editMode && !uploading && (
        <button
          className="editable-image-btn"
          onClick={() => fileInputRef.current.click()}
          aria-label="החלף תמונה"
        >
          <FaPen />
        </button>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};

export default EditableImage;
