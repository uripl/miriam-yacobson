export const CHAPTERS = [
  { value: 'childhood', label: 'ילדות בגרמניה' },
  { value: 'belgium', label: 'החיים בבלגיה' },
  { value: 'france', label: 'צרפת תחת הכיבוש' },
  { value: 'holocaust', label: 'בעמק הבכא' },
  { value: 'liberation', label: 'השחרור והחזרה לליון' },
  { value: 'immigration', label: 'העלייה לישראל' },
  { value: 'israel', label: 'החיים בישראל' },
];

export const MONTHS_HE = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

export const formatItemDate = (item) => {
  if (item.dateYear) {
    if (item.dateMonth && item.dateDay) return `${item.dateDay} ${MONTHS_HE[item.dateMonth - 1]} ${item.dateYear}`;
    if (item.dateMonth) return `${MONTHS_HE[item.dateMonth - 1]} ${item.dateYear}`;
    return `${item.dateYear}`;
  }
  return item.year || '';
};

export const formatItemChapters = (item) => {
  if (!item.chapters?.length) return '';
  return item.chapters.map(c => CHAPTERS.find(ch => ch.value === c)?.label || c).join(', ');
};
