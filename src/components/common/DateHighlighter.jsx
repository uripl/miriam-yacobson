import { toHebrewDate } from '../../utils/hebrewDate';
import HebrewDateTooltip from './HebrewDateTooltip';

const MONTHS_MAP = {
  'ינואר': 1, 'פברואר': 2, 'מרץ': 3, 'אפריל': 4,
  'מאי': 5, 'יוני': 6, 'יולי': 7, 'אוגוסט': 8,
  'ספטמבר': 9, 'אוקטובר': 10, 'נובמבר': 11, 'דצמבר': 12,
};

const MONTH_NAMES = Object.keys(MONTHS_MAP).join('|');

// סדר חשוב: תבניות ספציפיות קודם
const DATE_PATTERNS = [
  // DD בחודש YYYY — למשל "15 במרץ 1943" או "15 מרץ 1943"
  new RegExp(`(\\d{1,2})\\s+(?:ב)?(${MONTH_NAMES})\\s+(\\d{4})`, 'g'),
  // חודש YYYY — למשל "מרץ 1943"
  new RegExp(`(?:ב)?(${MONTH_NAMES})\\s+(\\d{4})`, 'g'),
  // DD/MM/YYYY או DD.MM.YYYY
  /(\d{1,2})[./](\d{1,2})[./](\d{4})/g,
];

function parseDateMatch(match, patternIndex) {
  if (patternIndex === 0) {
    const day = parseInt(match[1], 10);
    const month = MONTHS_MAP[match[2]];
    const year = parseInt(match[3], 10);
    if (year >= 1850 && year <= 2030 && day >= 1 && day <= 31) {
      return { year, month, day };
    }
  }
  if (patternIndex === 1) {
    const month = MONTHS_MAP[match[1]];
    const year = parseInt(match[2], 10);
    if (year >= 1850 && year <= 2030) {
      return { year, month };
    }
  }
  if (patternIndex === 2) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    if (year >= 1850 && year <= 2030 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return { year, month, day };
    }
  }
  return null;
}

/**
 * סורק טקסט ומזהה תאריכים לועזיים, עוטף אותם ב-HebrewDateTooltip
 */
const DateHighlighter = ({ text }) => {
  if (!text || typeof text !== 'string') return text || null;

  // מצא את כל ההתאמות עם מיקומן
  const allMatches = [];

  DATE_PATTERNS.forEach((pattern, patternIndex) => {
    const regex = new RegExp(pattern.source, pattern.flags);
    let m;
    while ((m = regex.exec(text)) !== null) {
      const parsed = parseDateMatch(m, patternIndex);
      if (parsed) {
        allMatches.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
          ...parsed,
        });
      }
    }
  });

  if (allMatches.length === 0) return text;

  // מיון לפי מיקום, הסרת חפיפות (תבנית ראשונה עדיפה)
  allMatches.sort((a, b) => a.start - b.start || b.end - a.end);
  const filtered = [];
  let lastEnd = 0;
  for (const match of allMatches) {
    if (match.start >= lastEnd) {
      filtered.push(match);
      lastEnd = match.end;
    }
  }

  // בנה מערך של רכיבים
  const parts = [];
  let cursor = 0;

  filtered.forEach((match, i) => {
    if (match.start > cursor) {
      parts.push(text.slice(cursor, match.start));
    }

    const item = {
      dateYear: match.year,
      dateMonth: match.month,
      dateDay: match.day,
    };

    parts.push(
      <HebrewDateTooltip key={i} item={item}>
        <span>{match.text}</span>
      </HebrewDateTooltip>
    );

    cursor = match.end;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
};

export default DateHighlighter;
