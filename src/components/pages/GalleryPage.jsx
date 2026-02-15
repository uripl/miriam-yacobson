import React, { useEffect } from 'react';
import EditableGallery from '../editable/EditableGallery';
import '../../styles/GalleryPage.css';

/**
 * דף גלריית התמונות - מציג את כל התמונות בחייה של מרים
 */
const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gallery-page">
      <header className="page-header">
        <div className="container">
          <h1>גלריית תמונות</h1>
          <p className="subtitle">מסע חיים בתמונות</p>
        </div>
      </header>

      <div className="container">
        <div className="gallery-page-content">
          <section className="gallery-intro">
            <p>
              גלריה זו מציגה תמונות מתקופות שונות בחייה של מרים אופנהיימר (יעקובסון).
              התמונות נאספו מארכיון המשפחה וממקורות היסטוריים, ומספרות את סיפור חייה הייחודי.
            </p>
          </section>

          <section className="gallery-main">
            <EditableGallery collectionName="gallery" />
          </section>

          <section className="gallery-info">
            <div className="gallery-box">
              <h3>אוסף התמונות</h3>
              <p>
                האוסף כולל תמונות ממקורות שונים, בהם ארכיון המשפחה, ארכיונים היסטוריים
                ותמונות שנשמרו על ידי חברים וקרובי משפחה.
              </p>
              <p>
                כל התמונות האישיות שייכות למשפחת יעקובסון, והתמונות ההיסטוריות הן ברשות הציבור
                או נמצאות בשימוש הוגן למטרות היסטוריות וחינוכיות.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
