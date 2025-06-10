/**
 * פונקציות לטעינת תוכן מקבצי JSON שנוצרו על ידי Netlify CMS
 */

// פונקציה לטעינת כל המסמכים
export const loadDocuments = async () => {
  try {
    // ב-Webpack (Create React App) אפשר להשתמש ב-require.context
    const context = require.context('../content/documents', false, /\.json$/);
    const documents = [];
    
    context.keys().forEach(key => {
      // דלג על קובץ הדוגמה
      if (key.includes('example-document')) return;
      
      const document = context(key);
      // הוסף את שם הקובץ כ-id
      const id = key.replace('./', '').replace('.json', '');
      documents.push({
        id,
        ...document
      });
    });
    
    return documents;
  } catch (error) {
    console.error('Error loading documents:', error);
    return [];
  }
};

// פונקציה לטעינת כל התמונות מהגלריה
export const loadGalleryImages = async () => {
  try {
    const context = require.context('../content/gallery', false, /\.json$/);
    const images = [];
    
    context.keys().forEach(key => {
      // דלג על קובץ הדוגמה
      if (key.includes('example-image')) return;
      
      const image = context(key);
      const id = key.replace('./', '').replace('.json', '');
      images.push({
        id,
        ...image
      });
    });
    
    return images;
  } catch (error) {
    console.error('Error loading gallery images:', error);
    return [];
  }
};
