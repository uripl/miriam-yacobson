import React, { useState, useEffect } from 'react';
import DocumentPreview from '../common/DocumentPreview';
import { historicalDocuments } from '../../data/timelineData';
import '../../styles/DocumentsPage.css';

/**
 * דף המסמכים ההיסטוריים - מציג את כל המסמכים מחייה של מרים
 */
const DocumentsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredDocuments, setFilteredDocuments] = useState(historicalDocuments);

  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // סינון מסמכים לפי קטגוריה
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredDocuments(historicalDocuments);
    } else {
      // הסינון הוא לפי תנאי דוגמא, בפועל אפשר לשנות לפי המבנה האמיתי של המסמכים
      setFilteredDocuments(
        historicalDocuments.filter(doc => {
          if (activeCategory === 'identification') return doc.id.includes('card') || doc.id.includes('certificate');
          if (activeCategory === 'letters') return doc.id.includes('letter');
          if (activeCategory === 'testimonies') return doc.id.includes('testimony');
          return true;
        })
      );
    }
  }, [activeCategory]);

  const categories = [
    { id: 'all', name: 'כל המסמכים' },
    { id: 'identification', name: 'תעודות זיהוי' },
    { id: 'letters', name: 'מכתבים' },
    { id: 'testimonies', name: 'עדויות' }
  ];

  return (
    <div className="documents-page">
      <header className="page-header">
        <div className="container">
          <h1>מסמכים היסטוריים</h1>
          <p className="subtitle">ארכיון מסמכים מחייה של מרים</p>
        </div>
      </header>

      <div className="container">
        <div className="documents-page-content">
          <section className="documents-intro">
            <p>
              מסמכים אלה מייצגים את מסעה האישי של מרים אופנהיימר (יעקובסון) לאורך התקופות השונות בחייה.
              מכרטיסי רישום ותעודות מתקופת השואה ועד למסמכים מתקופת העלייה לארץ והחיים בישראל.
            </p>
            <p>
              לחיצה על כל מסמך תפתח תצוגה מורחבת עם תיאור ותרגום של המסמך.
            </p>
          </section>

          <section className="documents-filters">
            <h2>סינון לפי סוג</h2>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-button ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          <section className="documents-grid">
            {filteredDocuments.length > 0 ? (
              <div className="documents-list">
                {filteredDocuments.map(document => (
                  <DocumentPreview key={document.id} document={document} />
                ))}
              </div>
            ) : (
              <div className="no-documents-message">
                <p>אין מסמכים בקטגוריה זו</p>
              </div>
            )}
          </section>

          <section className="documents-info">
            <div className="documents-box">
              <h3>אודות הארכיון</h3>
              <p>
                המסמכים המופיעים כאן נאספו ממקורות שונים, ביניהם ארכיונים היסטוריים כמו
                שירות האיתור הבינלאומי (ITS), יד ושם, וארכיון המשפחה הפרטי.
              </p>
              <p>
                חלק מהמסמכים כוללים תרגום מהשפה המקורית. התרגומים נעשו בניסיון לשמור על המשמעות
                המקורית ככל האפשר, תוך התחשבות בהקשר ההיסטורי.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;
