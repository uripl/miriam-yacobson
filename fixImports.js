// fixImportsWithBackup.js
const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      fixImports(fullPath); // סריקה ריקורסיבית
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // חיפוש ייבוא בעייתי
      const regex = /import\s+['"]\.\.\/\.\.\/\.\.\/styles\//g;
      if (regex.test(content)) {
        const updatedContent = content.replace(regex, 'import \'../styles/');

        // שמירת גיבוי בקובץ נוסף
        const backupPath = fullPath + '.backup';
        fs.writeFileSync(backupPath, content, 'utf-8');
        console.log(`🛡️ Backup created: ${backupPath}`);

        // כתיבת התיקון
        fs.writeFileSync(fullPath, updatedContent, 'utf-8');
        console.log(`✅ Fixed: ${fullPath}`);
      }
    }
  });
}

// התחלה מהתיקייה src
fixImports(path.join(__dirname, 'src'));
