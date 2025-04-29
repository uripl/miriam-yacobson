import React, { useState } from 'react';
import '../../styles/components.css';

/**
 * קומפוננטת תצוגת מסמכים - מציגה מסמכים היסטוריים עם אפשרות להגדלה
 * @param {Object} props
 * @param {Object} props.document - אובייקט המכיל מידע על המסמך
 * @param {string} [props.className] - קלאס נוסף אופציונלי
 */
const DocumentPreview = ({ document, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // פתיחת תצוגת מסמך מוגדל
  const openDocument = () => {
    setIsExpanded(true);
    document.body.style.overflow = 'hidden'; // מניעת גלילה ברקע
  };

  // סגירת תצוגת מסמך מוגדל
  const closeDocument = () => {
    setIsExpanded(false);
    document.body.style.overflow = 'auto'; // החזרת הגלילה
  };

  return (
    <div className={`document-container ${className}`}>
      <div className="document-preview" onClick={openDocument}>
        <div className="document-image-container">
          <img 
            src={document.thumbnailSrc || document.imageSrc} 
            alt={document.title} 
            className="document-thumbnail"
            loading="lazy"
          />
          <div className="document-overlay">
            <span className="document-expand-icon">+</span>
          </div>
        </div>
        <div className="document-info">
          <h4 className="document-title">{document.title}</h4>
          <p className="document-date">{document.date}</p>
          {document.description && (
            <p className="document-description">{document.description}</p>
          )}
        </div>
      </div>

      {/* תצוגת מסמך מוגדל במודל */}
      {isExpanded && (
        <div className="document-modal" onClick={closeDocument}>
          <div className="document-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="document-close-button" onClick={closeDocument}>×</button>
            
            <div className="document-modal-image-container">
              <img 
                src={document.imageSrc} 
                alt={document.title} 
                className="document-modal-image"
              />
            </div>
            
            <div className="document-modal-info">
              <h3 className="document-modal-title">{document.title}</h3>
              <p className="document-modal-date">{document.date}</p>
              
              {document.description && (
                <p className="document-modal-description">{document.description}</p>
              )}
              
              {document.source && (
                <p className="document-modal-source">
                  <strong>מקור: </strong>
                  {document.source}
                </p>
              )}
              
              {document.archiveNumber && (
                <p className="document-modal-archive">
                  <strong>מספר בארכיון: </strong>
                  {document.archiveNumber}
                </p>
              )}
              
              {document.translation && (
                <div className="document-modal-translation">
                  <h4>תרגום מהמסמך המקורי:</h4>
                  <p>{document.translation}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
