import React from 'react';

const CHAPTERS = [
  { value: 'childhood', label: 'ילדות בגרמניה' },
  { value: 'belgium', label: 'החיים בבלגיה' },
  { value: 'france', label: 'צרפת תחת הכיבוש' },
  { value: 'holocaust', label: 'בעמק הבכא' },
  { value: 'liberation', label: 'השחרור והחזרה לליון' },
  { value: 'immigration', label: 'העלייה לישראל' },
  { value: 'israel', label: 'החיים בישראל' },
];

const ChapterFilter = ({ selected, onChange }) => {
  return (
    <div className="chapter-filter">
      <button
        className={`chapter-filter-btn ${selected === null ? 'active' : ''}`}
        onClick={() => onChange(null)}
      >
        הכל
      </button>
      {CHAPTERS.map(ch => (
        <button
          key={ch.value}
          className={`chapter-filter-btn ${selected === ch.value ? 'active' : ''}`}
          onClick={() => onChange(ch.value)}
        >
          {ch.label}
        </button>
      ))}
    </div>
  );
};

export default ChapterFilter;
