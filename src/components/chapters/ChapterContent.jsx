import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import EditableText from '../editable/EditableText';
import EditableImage from '../editable/EditableImage';
import { FaPlus, FaTrash, FaSpinner } from 'react-icons/fa';
import '../../styles/ChapterContent.css';

const ChapterContent = ({ chapterId }) => {
  const { isAdmin } = useAuth();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionsPath = `chapters/${chapterId}/sections`;

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const q = query(collection(db, sectionsPath), orderBy('order', 'asc'));
        const snap = await getDocs(q);
        setSections(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Error fetching sections:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [sectionsPath]);

  const handleAddSection = async () => {
    const nextOrder = sections.length > 0
      ? Math.max(...sections.map(s => s.order)) + 1
      : 0;

    try {
      const newSection = {
        order: nextOrder,
        hasImage: false,
        paragraphCount: 1,
      };
      const docRef = await addDoc(collection(db, sectionsPath), newSection);
      setSections(prev => [...prev, { id: docRef.id, ...newSection }]);
    } catch (err) {
      console.error('Error adding section:', err);
    }
  };

  const handleDeleteSection = async (section) => {
    if (!window.confirm('למחוק את הסעיף?')) return;

    try {
      await deleteDoc(doc(db, sectionsPath, section.id));
      setSections(prev => prev.filter(s => s.id !== section.id));
    } catch (err) {
      console.error('Error deleting section:', err);
    }
  };

  if (loading) {
    return (
      <div className="cc-loading">
        <FaSpinner className="editable-image-spinner" />
      </div>
    );
  }

  return (
    <div className="cc-wrapper">
      {sections.map((section) => (
        <section key={section.id} className="cc-section">
          {isAdmin && (
            <button
              className="cc-delete-btn"
              onClick={() => handleDeleteSection(section)}
              aria-label="מחק סעיף"
            >
              <FaTrash />
            </button>
          )}

          <EditableText
            contentKey={`${chapterId}-section-${section.id}-title`}
            defaultValue="כותרת סעיף"
            as="h2"
          />

          {Array.from({ length: section.paragraphCount || 1 }).map((_, i) => (
            <EditableText
              key={i}
              contentKey={`${chapterId}-section-${section.id}-p${i}`}
              defaultValue="טקסט פסקה"
              as="p"
            />
          ))}

          {section.hasImage && (
            <div className="cc-image-container">
              <EditableImage
                contentKey={`${chapterId}-section-${section.id}-image`}
                defaultSrc="/images/placeholder.jpg"
                alt=""
              />
              <EditableText
                contentKey={`${chapterId}-section-${section.id}-caption`}
                defaultValue="כיתוב לתמונה"
                as="p"
              />
            </div>
          )}
        </section>
      ))}

      {isAdmin && (
        <button className="cc-add-section" onClick={handleAddSection}>
          <FaPlus />
          <span>הוסף סעיף</span>
        </button>
      )}
    </div>
  );
};

export default ChapterContent;
