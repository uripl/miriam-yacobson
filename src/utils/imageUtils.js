/**
 * שירותי עזר לטיפול בתמונות וייצור תמונות דמה
 */

// קבועים לתמונות דמה עבור קטגוריות שונות
const PLACEHOLDER_COLORS = {
  'childhood': 'e6f7ff',      // כחול בהיר
  'belgium': 'e6ffe6',        // ירוק בהיר
  'france': 'ffe6e6',         // אדום בהיר
  'holocaust': 'f0f0f0',      // אפור בהיר
  'liberation': 'f7e6ff',     // סגול בהיר
  'immigration': 'fff2e6',    // כתום בהיר
  'life-in-israel': 'e6ffff', // טורקיז בהיר
  'documents': 'f5f5dc',      // בז'
  'default': 'eeeeee'         // אפור בהיר מאוד
};

// אייקונים לפי קטגוריה
const PLACEHOLDER_ICONS = {
  'childhood': '👶',
  'belgium': '🏠',
  'france': '🏙️',
  'holocaust': '🕯️',
  'liberation': '✨',
  'immigration': '🚢',
  'life-in-israel': '🏡',
  'documents': '📄',
  'default': '📷'
};

/**
 * פונקציה שמחזירה URL של תמונה דמה עבור הקטגוריה הנתונה
 * @param {string} category קטגוריית התמונה
 * @param {number} width רוחב התמונה
 * @param {number} height גובה התמונה
 * @param {string} text טקסט להצגה (ברירת מחדל: שם הקטגוריה)
 * @returns {string} URL של תמונת דמה
 */
export function getPlaceholderImage(category, width = 400, height = 300, text) {
  const color = PLACEHOLDER_COLORS[category] || PLACEHOLDER_COLORS.default;
  const displayText = text || `${PLACEHOLDER_ICONS[category] || PLACEHOLDER_ICONS.default} ${category || 'תמונה'}`;
  
  // שימוש בשירות ייצור תמונות מקוון במקום בקבצים מקומיים
  return `https://via.placeholder.com/${width}x${height}/${color}/333333?text=${encodeURIComponent(displayText)}`;
}

/**
 * פונקציה שמחזירה מקור תמונה, אם קיימת, או תמונת דמה אם לא
 * @param {string} imageSrc מקור תמונה מקורי
 * @param {string} category קטגוריית התמונה
 * @param {number} width רוחב התמונה
 * @param {number} height גובה התמונה
 * @param {string} fallbackText טקסט חלופי
 * @returns {string} URL של התמונה המקורית או דמה
 */
export function getImageSrc(imageSrc, category, width = 400, height = 300, fallbackText) {
  // בדיקה האם מקור תמונה תקין
  if (imageSrc && typeof imageSrc === 'string' && imageSrc.length > 0) {
    return imageSrc;
  }
  
  // לא נמצא מקור תקין, החזר דמה
  return getPlaceholderImage(category, width, height, fallbackText);
}

/**
 * פונקציה שבודקת האם קובץ תמונה קיים (שימוש בסביבת ייצור)
 * @param {string} imagePath נתיב לתמונה
 * @returns {boolean} האם התמונה קיימת
 */
export function imageExists(imagePath) {
  // בסביבת פיתוח תמיד נחזיר false כדי להשתמש בדמה
  if (process.env.NODE_ENV === 'development') {
    const devMode = process.env.REACT_APP_USE_REAL_IMAGES;
    if (devMode !== 'true') {
      return false;
    }
  }
  
  // בדיקה פשוטה - לא באמת בודקת קיום פיזי של הקובץ בצד הלקוח
  return imagePath && typeof imagePath === 'string' && imagePath.length > 0;
}
