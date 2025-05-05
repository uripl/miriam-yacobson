import React, { useState } from 'react';
import '../../styles/components.css';
import PlaceholderImage from './PlaceholderImage';

/**
 * קומפוננטת גלריית תמונות - מציגה אוסף תמונות עם אפשרות להגדלה
 * @param {Object} props
 * @param {Array} props.images - מערך תמונות להצגה בגלריה
 * @param {string} [props.className] - קלאס נוסף אופציונלי
 */
const ImageGallery = ({ images, className = '' }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // פתיחת תצוגת תמונה מוגדלת
  const openModal = (index) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden'; // מניעת גלילה ברקע
  };

  // סגירת תצוגת תמונה מוגדלת
  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto'; // החזרת הגלילה
  };

  // מעבר לתמונה הבאה
  const nextImage = () => {
    setSelectedImage((selectedImage + 1) % images.length);
  };

  // מעבר לתמונה הקודמת
  const prevImage = () => {
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  // בדיקה אם התמונה קיימת
  const imageExists = (src) => src && typeof src === 'string' && src.length > 0;

  return (
    <div className={`gallery-container ${className}`}>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => openModal(index)}
          >
            {imageExists(image.src) ? (
              <img 
                src={image.src} 
                alt={image.alt || 'תמונה בגלריה'} 
                className="gallery-image"
                loading="lazy"
              />
            ) : (
              <PlaceholderImage 
                alt={image.alt || 'תמונה בגלריה'} 
                category={image.period || 'default'}
                className="gallery-image"
                width="100%"
                height="200px"
              />
            )}
            {image.caption && (
              <div className="gallery-caption">{image.caption}</div>
            )}
          </div>
        ))}
      </div>

      {/* תצוגת תמונה מוגדלת במודל */}
      {selectedImage !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close-button" onClick={closeModal}>×</button>
            <button className="gallery-nav-button gallery-prev-button" onClick={prevImage}>&#10094;</button>
            <button className="gallery-nav-button gallery-next-button" onClick={nextImage}>&#10095;</button>
            
            <div className="gallery-modal-image-container">
              {imageExists(images[selectedImage].src) ? (
                <img 
                  src={images[selectedImage].src} 
                  alt={images[selectedImage].alt || 'תמונה מוגדלת'} 
                  className="gallery-modal-image"
                />
              ) : (
                <PlaceholderImage 
                  alt={images[selectedImage].alt || 'תמונה מוגדלת'} 
                  category={images[selectedImage].period || 'default'} 
                  className="gallery-modal-image"
                  width="80%"
                  height="500px"
                />
              )}
            </div>
            
            {images[selectedImage].caption && (
              <div className="gallery-modal-caption">
                {images[selectedImage].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
