import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';

const EditableText = ({ contentKey, defaultValue, as: Tag = 'p' }) => {
  const { user, isAdmin, editMode } = useAuth();
  const [text, setText] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const snap = await getDoc(doc(db, 'content', contentKey));
        if (snap.exists()) {
          setText(snap.data().value);
        }
      } catch (err) {
        console.error('Error fetching content:', err);
      }
    };
    fetchContent();
  }, [contentKey]);

  const startEditing = () => {
    setDraft(text);
    setEditing(true);
  };

  const cancel = () => {
    setEditing(false);
    setDraft('');
  };

  const save = async () => {
    if (draft === text) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, 'content', contentKey), {
        value: draft,
        previousValue: text,
        editedBy: user.email,
        editedAt: serverTimestamp(),
      });
      setText(draft);
      setEditing(false);
    } catch (err) {
      console.error('Error saving content:', err);
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <div className="editable-container editing">
        <textarea
          className="editable-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          autoFocus
        />
        <div className="editable-actions">
          <button className="editable-btn save-btn" onClick={save} disabled={saving}>
            <FaSave /> {saving ? 'שומר...' : 'שמור'}
          </button>
          <button className="editable-btn cancel-btn" onClick={cancel} disabled={saving}>
            <FaTimes /> ביטול
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editable-container">
      <Tag>{text}</Tag>
      {isAdmin && editMode && (
        <button className="editable-edit-btn" onClick={startEditing} aria-label="ערוך">
          <FaPen />
        </button>
      )}
    </div>
  );
};

export default EditableText;
