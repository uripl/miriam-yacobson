import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { FaPen, FaSave, FaTimes } from 'react-icons/fa';
import DateHighlighter from '../common/DateHighlighter';
import { saveEditHistory } from '../../utils/editHistory';

const EditableSectionBody = ({ chapterId, sectionId, paragraphCount = 1 }) => {
  const { user, isAdmin, editMode } = useAuth();
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const bodyKey = `${chapterId}-section-${sectionId}-body`;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Try unified body key first
        const bodySnap = await getDoc(doc(db, 'content', bodyKey));
        if (bodySnap.exists()) {
          setText(bodySnap.data().value);
          setLoaded(true);
          return;
        }

        // Fallback: load individual paragraphs and merge
        const paragraphs = [];
        for (let i = 0; i < paragraphCount; i++) {
          const pKey = `${chapterId}-section-${sectionId}-p${i}`;
          const snap = await getDoc(doc(db, 'content', pKey));
          if (snap.exists()) {
            paragraphs.push(snap.data().value);
          }
        }
        if (paragraphs.length > 0) {
          setText(paragraphs.join('\n\n'));
        }
      } catch (err) {
        console.error('Error fetching section body:', err);
      } finally {
        setLoaded(true);
      }
    };
    fetchContent();
  }, [bodyKey, chapterId, sectionId, paragraphCount]);

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
      await setDoc(doc(db, 'content', bodyKey), {
        value: draft,
        previousValue: text,
        editedBy: user.email,
        editedAt: serverTimestamp(),
      });
      await saveEditHistory({
        contentKey: bodyKey,
        type: 'text',
        previousValue: text,
        newValue: draft,
        editedBy: user.email,
      });
      setText(draft);
      setEditing(false);
    } catch (err) {
      console.error('Error saving section body:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) return null;

  if (editing) {
    return (
      <div className="editable-container editing">
        <textarea
          className="editable-textarea editable-textarea-body"
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

  const paragraphs = text ? text.split('\n\n').filter(p => p.trim()) : [];

  return (
    <div className="editable-container editable-section-body">
      <div className="editable-section-paragraphs">
        {paragraphs.map((p, i) => (
          <p key={i}><DateHighlighter text={p} /></p>
        ))}
      </div>
      {isAdmin && editMode && (
        <button className="editable-edit-btn" onClick={startEditing} aria-label="ערוך">
          <FaPen />
        </button>
      )}
    </div>
  );
};

export default EditableSectionBody;
