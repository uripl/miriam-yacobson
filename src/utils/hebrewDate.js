import { HDate, gematriya, months } from '@hebcal/core';

const HEBREW_MONTHS = {
  [months.NISAN]: 'ניסן',
  [months.IYYAR]: 'אייר',
  [months.SIVAN]: 'סיון',
  [months.TAMUZ]: 'תמוז',
  [months.AV]: 'אב',
  [months.ELUL]: 'אלול',
  [months.TISHREI]: 'תשרי',
  [months.CHESHVAN]: 'חשוון',
  [months.KISLEV]: 'כסלו',
  [months.TEVET]: 'טבת',
  [months.SHVAT]: 'שבט',
  [months.ADAR_I]: 'אדר א׳',
  [months.ADAR_II]: 'אדר ב׳',
};

/**
 * Convert a Gregorian date to a Hebrew date string
 * @param {number} year - Gregorian year
 * @param {number} [month] - Gregorian month (1-12)
 * @param {number} [day] - Gregorian day
 * @returns {string} Hebrew date string
 */
export function toHebrewDate(year, month, day) {
  try {
    if (year && month && day) {
      const hd = new HDate(new Date(year, month - 1, day));
      const hDay = gematriya(hd.getDate());
      const hMonth = HEBREW_MONTHS[hd.getMonth()] || hd.getMonthName('h');
      const hYear = gematriya(hd.getFullYear());
      return `${hDay} ${hMonth} ${hYear}`;
    }
    if (year && month) {
      // Use the 15th of the month as representative date
      const hd = new HDate(new Date(year, month - 1, 15));
      const hMonth = HEBREW_MONTHS[hd.getMonth()] || hd.getMonthName('h');
      const hYear = gematriya(hd.getFullYear());
      return `${hMonth} ${hYear}`;
    }
    if (year) {
      // Use Tishrei 1 of the Hebrew year that overlaps
      const hd = new HDate(new Date(year, 6, 1)); // July 1 approximation
      const hYear = gematriya(hd.getFullYear());
      return hYear;
    }
  } catch (e) {
    return '';
  }
  return '';
}

/**
 * Get Hebrew date from an item with dateYear, dateMonth, dateDay fields
 */
export function getHebrewDateForItem(item) {
  if (item.dateYear) {
    return toHebrewDate(
      Number(item.dateYear),
      item.dateMonth ? Number(item.dateMonth) : undefined,
      item.dateDay ? Number(item.dateDay) : undefined
    );
  }
  if (item.year) {
    return toHebrewDate(Number(item.year));
  }
  return '';
}
