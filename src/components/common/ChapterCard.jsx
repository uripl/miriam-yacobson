import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components.css';
import PlaceholderImage from './PlaceholderImage';

/**
 * קומפוננטת כרטיסיית פרק - מציגה כרטיסייה עם תמונה וסיכום של פרק חיים
 * @param {Object} props
 * @param {string} props.title - כותרת הפרק
 * @param {string} props.years - טווח שנים של הפרק
 * @param {string} props.summary - תקציר הפרק
 * @param {string} props.imageSrc - כתובת תמונה לפרק
 * @param {string} props.route - נתיב לעמוד הפרק המלא
 * @param {string} [props.className] - קלאס נוסף אופציונלי
 */
const ChapterCard = ({ title, years, summary, imageSrc, route, className = '' }) => {
  return (
    <div className={`chapter-card ${className}`}>
      <div className="chapter-card-image-container">
         <img 
          src={imageSrc} 
          alt={title}
          className="chapter-card-image" 
          loading="lazy"
        />
        <div className="chapter-card-years">{years}</div>
      </div>
      <div className="chapter-card-content">
        <h3 className="chapter-card-title">{title}</h3>
        <p className="chapter-card-summary">{summary}</p>
        <Link to={route} className="chapter-card-link">
          המשך לקרוא
        </Link>
      </div>
    </div>
  );
};

export default ChapterCard;
