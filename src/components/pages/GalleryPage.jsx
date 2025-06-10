import React, { useState, useEffect } from 'react';
import ImageGallery from '../common/ImageGallery';
import { galleryImages } from '../../data/timelineData';
import { loadGalleryImages } from '../../utils/contentLoader';
import '../../styles/GalleryPage.css';

/**
 * דף גלריית התמונות - מציג את כל התמונות בחייה של מרים
 */
const GalleryPage = () => {
  const [filter, setFilter] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [cmsImages, setCmsImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // טעינת תמונות מה-CMS
  useEffect(() => {
    const loadCMSImages = async () => {
      try {
        const images = await loadGalleryImages();
        setCmsImages(images);
      } catch (error) {
        console.error('Failed to load CMS images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCMSImages();
  }, []);

  // סינון תמונות לפי תקופה
  useEffect(() => {
    // שלב את התמונות מה-CMS עם התמונות הקיימות
    const allImages = [...galleryImages, ...cmsImages];
    
    if (filter === 'all') {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter(image => image.period === filter));
    }
  }, [filter, cmsImages]);

  // קטגוריות תקופות חיים לסינון
  const categories = [
    { id: 'all', name: 'כל התמונות' },
    { id: 'childhood', name: 'ילדות בגרמניה' },
    { id: 'belgium', name: 'בלגיה' },
    { id: 'france', name: 'צרפת תחת כיבוש' },
    { id: 'holocaust', name: 'תקופת השואה' },
    { id: 'liberation', name: 'השחרור' },
    { id: 'immigration', name: 'העלייה לארץ' },
    { id: 'life-in-israel', name: 'חיים בישראל' }
  ];

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

          <section className="gallery-filters">
            <h2>סינון לפי תקופה</h2>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-button ${filter === category.id ? 'active' : ''}`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          <section className="gallery-main">
            {isLoading ? (
              <div className="loading-message">
                <p>טוען תמונות...</p>
              </div>
            ) : filteredImages.length > 0 ? (
              <ImageGallery images={filteredImages} />
            ) : (
              <div className="no-images-message">
                <p>אין תמונות לתקופה זו</p>
              </div>
            )}
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
