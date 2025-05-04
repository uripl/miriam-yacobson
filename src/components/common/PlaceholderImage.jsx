import React from 'react';
import { getImageSrc } from '../../utils/imageUtils';

/**
 * קומפוננטת תמונת דמה שתוחלף בתמונה אמיתית בהמשך
 * @param {Object} props
 * @param {string} props.src מקור התמונה האמיתית (אם קיים)
 * @param {string} props.alt טקסט חלופי לתמונה
 * @param {string} props.category קטגוריית התמונה
 * @param {number} props.width רוחב התמונה
 * @param {number} props.height גובה התמונה
 * @param {string} props.className קלאסים נוספים
 * @param {Object} props.style סגנון נוסף
 */
const PlaceholderImage = ({ 
  src, 
  alt = 'תמונה', 
  category = 'default', 
  width = 400, 
  height = 300, 
  className = '', 
  style = {},
  ...props
}) => {
  const imageSrc = getImageSrc(src, category, width, height, alt);
  
  // סגנון בסיסי לתמונות דמה
  const placeholderStyle = !src ? {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#333',
    fontSize: '14px',
    textAlign: 'center',
    objectFit: 'cover',
    ...style
  } : style;
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`placeholder-image ${className}`}
      style={placeholderStyle}
      loading="lazy"
      {...props}
    />
  );
};

export default PlaceholderImage;
