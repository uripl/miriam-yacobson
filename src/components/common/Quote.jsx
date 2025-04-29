import React from 'react';
import '../../styles/components.css';

/**
 * קומפוננטת ציטוט - מציגה ציטוט עם מקור ומספר עמוד אופציונלי
 * @param {Object} props
 * @param {string} props.text - טקסט הציטוט
 * @param {string} props.source - מקור הציטוט (שם הספר או הדובר)
 * @param {number} [props.page] - מספר עמוד (אופציונלי)
 * @param {string} [props.className] - קלאס נוסף אופציונלי
 */
const Quote = ({ text, source, page, className = '' }) => {
  return (
    <div className={`quote-container ${className}`}>
      <blockquote className="quote-text">
        <span className="quote-mark quote-mark-open">"</span>
        {text}
        <span className="quote-mark quote-mark-close">"</span>
      </blockquote>
      <div className="quote-source">
        {source}
        {page && <span className="quote-page">, עמ' {page}</span>}
      </div>
    </div>
  );
};

export default Quote;
