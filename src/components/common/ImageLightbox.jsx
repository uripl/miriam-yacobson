import { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';

const ImageLightbox = ({ src, alt, onClose }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setScale(prev => Math.min(Math.max(prev - e.deltaY * 0.001, 1), 5));
  }, []);

  const handleMouseDown = (e) => {
    if (scale === 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.5, 5));
  const zoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <div className="lightbox-controls" onClick={e => e.stopPropagation()}>
        <button onClick={zoomIn} aria-label="הגדל"><FaSearchPlus /></button>
        <span>{Math.round(scale * 100)}%</span>
        <button onClick={zoomOut} aria-label="הקטן"><FaSearchMinus /></button>
        <button onClick={onClose} aria-label="סגור"><FaTimes /></button>
      </div>
      <div
        className="lightbox-image-wrapper"
        onClick={e => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: scale > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
            transition: dragging ? 'none' : 'transform 0.2s ease',
          }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageLightbox;
