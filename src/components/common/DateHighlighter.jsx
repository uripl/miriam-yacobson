import HebrewDateTooltip from './HebrewDateTooltip';

const MONTHS_MAP = {
  'ינואר': 1, 'פברואר': 2, 'מרץ': 3, 'אפריל': 4,
  'מאי': 5, 'יוני': 6, 'יולי': 7, 'אוגוסט': 8,
  'ספטמבר': 9, 'אוקטובר': 10, 'נובמבר': 11, 'דצמבר': 12,
};

const MONTH_NAMES = Object.keys(MONTHS_MAP).join('|');

// סדר חשוב: תבניות ספציפיות קודם, כלליות אחרונות
const DATE_PATTERNS = [
  // DD בחודש YYYY — "15 במרץ 1943", "2 במאי 1945", "15 מרץ 1943"
  { regex: new RegExp(`(\\d{1,2})\\s+(?:ב)?(${MONTH_NAMES})\\s+(\\d{4})`, 'g'), type: 'dmy' },
  // DD.MM.YYYY או DD/MM/YYYY — "24.10.1925", "27/1/1941"
  { regex: /(\d{1,2})[./](\d{1,2})[./](\d{4})/g, type: 'numeric' },
  // בחודש YYYY / חודש YYYY — "בספטמבר 1939", "מרץ 1944", "מאי 1940"
  { regex: new RegExp(`(?:ב)?(${MONTH_NAMES})\\s+(\\d{4})`, 'g'), type: 'my' },
  // שנה לבד — "1938", "בשנת 1938", "ב-1941", "(1932)", "קיץ 1938"
  // נתפסת רק אם לא חלק ממספר גדול יותר
  { regex: /(?<!\d)(\d{4})(?!\d)/g, type: 'year' },
];

function parseDateMatch(match, type) {
  if (type === 'dmy') {
    const day = parseInt(match[1], 10);
    const month = MONTHS_MAP[match[2]];
    const year = parseInt(match[3], 10);
    if (year >= 1850 && year <= 2030 && day >= 1 && day <= 31) {
      return { year, month, day };
    }
  }
  if (type === 'numeric') {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    if (year >= 1850 && year <= 2030 && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return { year, month, day };
    }
  }
  if (type === 'my') {
    const month = MONTHS_MAP[match[1]];
    const year = parseInt(match[2], 10);
    if (year >= 1850 && year <= 2030) {
      return { year, month };
    }
  }
  if (type === 'year') {
    const year = parseInt(match[1], 10);
    // טווח סביר לטקסט היסטורי
    if (year >= 1850 && year <= 2030) {
      return { year };
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

  DATE_PATTERNS.forEach(({ regex, type }) => {
    const re = new RegExp(regex.source, regex.flags);
    let m;
    while ((m = re.exec(text)) !== null) {
      const parsed = parseDateMatch(m, type);
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

  // מיון לפי מיקום; בחפיפה — תבנית ספציפית עדיפה (ארוכה יותר)
  allMatches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
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
