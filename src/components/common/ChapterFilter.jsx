import { CHAPTERS } from '../../utils/constants';

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
