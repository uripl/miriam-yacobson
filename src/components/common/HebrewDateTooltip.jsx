import { useState, useRef, useEffect } from 'react';
import { getHebrewDateForItem } from '../../utils/hebrewDate';

const HebrewDateTooltip = ({ item, children }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const hebrewDate = getHebrewDateForItem(item);

  useEffect(() => {
    if (show && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = triggerRect.top - tooltipRect.height - 8;
      let left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;

      // Keep within viewport
      if (top < 4) top = triggerRect.bottom + 8;
      if (left < 4) left = 4;
      if (left + tooltipRect.width > window.innerWidth - 4) {
        left = window.innerWidth - tooltipRect.width - 4;
      }

      setPosition({ top, left });
    }
  }, [show]);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShow(prev => !prev);
  };

  // סגירת tooltip בלחיצה במקום אחר (מובייל)
  useEffect(() => {
    if (!show) return;
    const handleOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [show]);

  if (!hebrewDate) return children;

  return (
    <span
      ref={triggerRef}
      className="hebrew-date-trigger"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={handleClick}
      onTouchEnd={handleClick}
      role="button"
      tabIndex={0}
    >
      {children}
      {show && (
        <span
          ref={tooltipRef}
          className="hebrew-date-tooltip"
          style={{ top: position.top, left: position.left }}
        >
          <span className="hebrew-date-tooltip-icon">📅</span>
          {hebrewDate}
        </span>
      )}
    </span>
  );
};

export default HebrewDateTooltip;
