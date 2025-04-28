import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';

/**
 * דף פרק השחרור והחזרה לליון
 */
const LiberationPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'liberation'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id.includes('liberation') || doc.id.includes('reference-card')
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("תמיד היו אנשים טובים"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>השחרור והחזרה לליון</h1>
          <p className="subtitle">1945-1948</p>
        </div>
      </header>

      <div className="container">
        <div className="chapter-navigation">
          <Link to="/" className="nav-back">חזרה לדף הבית</Link>
          <div className="chapter-pagination">
            <span className="chapter-number">פרק 5 מתוך 7</span>
            <div>
              <span className="pagination-text">פרק קודם: </span>
              <Link to="/chapters/holocaust" className="pagination-link">בעמק הבכא</Link>
            </div>
            <div>
              <span className="pagination-text">פרק הבא: </span>
              <Link to="/chapters/immigration" className="pagination-link">העלייה לישראל</Link>
            </div>
          </div>
        </div>

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>רגע השחרור</h2>
                <p>
                  בתחילת מאי 1945, בימים האחרונים של המלחמה באירופה, שהתה מרים במחנה ניישטדט-גלווה בצפון גרמניה.
                  במפתיע, ב-2 במאי 1945, נעלמו כל השומרים הנאצים, כאילו בלעה אותם האדמה.
                </p>
                <p>
                  "בוקר אחד בתחילת מאי נעלמו כל השומרים ואנשי הס.ס. ה
