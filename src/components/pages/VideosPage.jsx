import React, { useEffect } from 'react';
import EditableVideos from '../editable/EditableVideos';
import '../../styles/GalleryPage.css';

const VideosPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gallery-page">
      <header className="page-header">
        <div className="container">
          <h1>סרטונים</h1>
          <p className="subtitle">סרטונים ועדויות מחיי מרים</p>
        </div>
      </header>

      <div className="container">
        <div className="gallery-page-content">
          <section className="gallery-intro">
            <p>
              אוסף סרטונים הכולל עדויות, ראיונות ותיעוד מחיי מרים אופנהיימר (יעקובסון).
              הסרטונים נאספו ממקורות שונים ומספרים את סיפור חייה הייחודי.
            </p>
          </section>

          <section className="gallery-main">
            <EditableVideos collectionName="videos" />
          </section>

          <section className="gallery-info">
            <div className="gallery-box">
              <h3>אוסף הסרטונים</h3>
              <p>
                האוסף כולל סרטונים ממקורות שונים, בהם עדויות אישיות, ראיונות
                ותיעוד היסטורי שנשמר על ידי המשפחה ומוסדות שונים.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;
