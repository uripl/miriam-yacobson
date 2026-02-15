import React, { useEffect } from 'react';
import EditableDocuments from '../editable/EditableDocuments';
import '../../styles/DocumentsPage.css';

/**
 * דף המסמכים ההיסטוריים - מציג את כל המסמכים מחייה של מרים
 */
const DocumentsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              לחיצה על כל מסמך תפתח תצוגה מורחבת עם תיאור של המסמך.
            </p>
          </section>

          <section className="documents-grid">
            <EditableDocuments collectionName="documents" />
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
