// fixImports.js
const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      fixImports(fullPath); // מעבר תיקיות ריקורסיבי
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // מחפש ייבוא שגוי
      const regex = /import\s+['"]\.\.\/\.\.\/\.\.\/styles\//g;
      if (regex.test(content)) {
        const updated = content.replace(regex, 'import \'../styles/');
        fs.writeFileSync(fullPath, updated, 'utf-8');
        console.log(`✅ Fixed: ${fullPath}`);
      }
    }
  });
}

// מפעיל על תיקיית src
fixImports(path.join(__dirname, 'src'));
