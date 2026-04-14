import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';

const CHAPTER_LABELS = {
  childhood: 'ילדות בגרמניה',
  belgium: 'החיים בבלגיה',
  france: 'צרפת תחת הכיבוש',
  holocaust: 'בעמק הבכא',
  liberation: 'השחרור והחזרה לליון',
  immigration: 'העלייה לישראל',
  israel: 'החיים בישראל',
};

export const parseContentKey = (contentKey) => {
  if (contentKey === 'site-logo') return 'לוגו האתר';

  // Pattern: {chapterId}-section-{sectionId}-{field}
  const match = contentKey.match(/^(\w+)-section-[\w]+-(.+)$/);
  if (match) {
    const chapterLabel = CHAPTER_LABELS[match[1]] || match[1];
    const field = match[2];
    let fieldLabel;
    if (field === 'title') fieldLabel = 'כותרת';
    else if (field === 'body') fieldLabel = 'טקסט';
    else if (field === 'caption') fieldLabel = 'כיתוב תמונה';
    else if (field === 'image') fieldLabel = 'תמונה';
    else if (field.startsWith('p')) {
      const num = parseInt(field.slice(1), 10) + 1;
      fieldLabel = `פסקה ${num}`;
    } else {
      fieldLabel = field;
    }
    return `${chapterLabel} — ${fieldLabel}`;
  }

  return contentKey;
};

export const saveEditHistory = async ({ contentKey, type, previousValue, newValue, editedBy }) => {
  try {
    await addDoc(collection(db, 'editHistory'), {
      contentKey,
      type,
      previousValue: previousValue || '',
      newValue: newValue || '',
      editedBy,
      editedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error saving edit history:', err);
  }
};
