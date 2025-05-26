#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const readline = require('readline');

// צבעים לקונסול
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// הגדרות
const config = {
  backupDir: `backup_${new Date().toISOString().replace(/[:.]/g, '_')}`,
  dryRun: process.argv.includes('--dry-run'),
  steps: {
    cleanup: true,
    mobileFixes: true,
    optimizations: true
  }
};

// יצירת ממשק לשאלות
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// פונקציות עזר
const log = {
  info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}[✓]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[✗]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[!]${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}═══ ${msg} ═══${colors.reset}\n`)
};

// בדיקה אם קובץ קיים
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// יצירת גיבוי
async function createBackup(filePath) {
  if (!config.dryRun) {
    const backupPath = path.join(config.backupDir, filePath);
    const backupDir = path.dirname(backupPath);
    
    await fs.mkdir(backupDir, { recursive: true });
    
    if (await fileExists(filePath)) {
      await fs.copyFile(filePath, backupPath);
      log.info(`גיבוי נוצר: ${backupPath}`);
    }
  }
}

// מחיקת קובץ
async function deleteFile(filePath, reason) {
  if (await fileExists(filePath)) {
    await createBackup(filePath);
    
    if (!config.dryRun) {
      await fs.unlink(filePath);
      log.success(`נמחק: ${filePath} - ${reason}`);
    } else {
      log.warning(`[DRY-RUN] ימחק: ${filePath} - ${reason}`);
    }
    return true;
  }
  return false;
}

// עדכון קובץ
async function updateFile(filePath, updateFn, description) {
  if (await fileExists(filePath)) {
    const content = await fs.readFile(filePath, 'utf8');
    const newContent = updateFn(content);
    
    if (content !== newContent) {
      await createBackup(filePath);
      
      if (!config.dryRun) {
        await fs.writeFile(filePath, newContent, 'utf8');
        log.success(`עודכן: ${filePath} - ${description}`);
      } else {
        log.warning(`[DRY-RUN] יעודכן: ${filePath} - ${description}`);
      }
      return true;
    }
  }
  return false;
}

// שלב 1: ניקוי קבצים מיותרים
async function cleanupUnusedFiles() {
  log.header('שלב 1: ניקוי קבצים מיותרים');
  
  const filesToDelete = [
    {
      path: 'src/components/pages/HomePage.jsx',
      reason: 'הוחלף ב-NewHomePage.jsx'
    },
    {
      path: 'src/components/pages/MapboxTestPage.jsx',
      reason: 'דף בדיקה - לא נחוץ בפרודקשן'
    },
    {
      path: 'src/styles/HomePage.css',
      reason: 'שייך לדף שנמחק'
    }
  ];
  
  let deletedCount = 0;
  
  for (const file of filesToDelete) {
    if (await deleteFile(file.path, file.reason)) {
      deletedCount++;
    }
  }
  
  // עדכון App.jsx להסיר את הייבוא של MapboxTestPage
  await updateFile('src/App.jsx', (content) => {
    return content
      .replace(/import MapboxTestPage.*\n/, '')
      .replace(/.*<Route.*MapboxTestPage.*\/>\n/, '');
  }, 'הסרת ייבוא של דפים מיותרים');
  
  log.info(`סה"כ נמחקו ${deletedCount} קבצים`);
}

// שלב 2: תיקוני CSS למובייל
async function fixMobileCSS() {
  log.header('שלב 2: תיקוני CSS למובייל');
  
  // תיקון כפתורים למגע
  const cssFiles = [
    'src/styles/globals.css',
    'src/styles/components.css',
    'src/styles/ChapterPage.css'
  ];
  
  for (const file of cssFiles) {
    await updateFile(file, (content) => {
      // הגדלת כפתורים למגע נוח
      content = content.replace(
        /\.btn\s*{([^}]*)}/g,
        (match, props) => {
          if (!props.includes('min-height')) {
            props += '\n  min-height: 44px;';
          }
          if (!props.includes('min-width')) {
            props += '\n  min-width: 44px;';
          }
          return `.btn {${props}}`;
        }
      );
      
      // תיקון padding לכפתורים קטנים
      content = content.replace(
        /padding:\s*var\(--spacing-xs\)\s*var\(--spacing-sm\)/g,
        'padding: var(--spacing-sm) var(--spacing-md)'
      );
      
      return content;
    }, 'התאמת גדלי כפתורים למובייל');
  }
  
  // תיקון ציר הזמן למובייל
  await updateFile('src/styles/timeline-fix.css', (content) => {
    return content + `
/* תיקונים נוספים למובייל */
@media (max-width: 768px) {
  .vertical-timeline-element-date {
    font-size: 11px !important;
    padding: 4px 8px !important;
  }
  
  .timeline-date-hebrew {
    display: none; /* הסתרת תאריך עברי במובייל */
  }
  
  /* הגדלת אזור המגע בציר הזמן */
  .vertical-timeline-element-content {
    padding: var(--spacing-lg) !important;
    margin-bottom: var(--spacing-xl) !important;
  }
  
  /* שיפור קריאות */
  .timeline-title {
    font-size: var(--font-size-lg) !important;
  }
}`;
  }, 'שיפור תצוגת ציר הזמן במובייל');
  
  // תיקון גובה המפה במובייל
  await updateFile('src/styles/JourneyMap.css', (content) => {
    return content.replace(
      'height: 350px !important;',
      'height: 450px !important; /* הגדלת גובה המפה במובייל */'
    );
  }, 'הגדלת גובה המפה במובייל');
}

// שלב 3: אופטימיזציות
async function applyOptimizations() {
  log.header('שלב 3: אופטימיזציות');
  
  // הוספת lazy loading משופר לתמונות
  await updateFile('src/components/common/PlaceholderImage.jsx', (content) => {
    return content.replace(
      'loading="lazy"',
      'loading="lazy" decoding="async"'
    );
  }, 'שיפור lazy loading לתמונות');
  
  // הוספת aria-labels לכפתורים
  await updateFile('src/components/layout/Header.jsx', (content) => {
    return content.replace(
      /<button\s+className="mobile-menu-button"/g,
      '<button className="mobile-menu-button" aria-label="תפריט ניווט"'
    );
  }, 'הוספת נגישות לכפתורי ניווט');
  
  // אופטימיזציה של רנדור מיותר
  await updateFile('src/components/common/Timeline.jsx', (content) => {
    return content.replace(
      'export default Timeline;',
      'export default React.memo(Timeline);'
    );
  }, 'הוספת React.memo לאופטימיזציה');
}

// יצירת קובץ שחזור
async function createRestoreScript() {
  const restoreScript = `#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const backupDir = '${config.backupDir}';

async function restore() {
  console.log('\\n🔄 משחזר קבצים מגיבוי: ' + backupDir);
  
  try {
    await restoreDirectory('.');
    console.log('\\n✅ השחזור הושלם בהצלחה!');
  } catch (error) {
    console.error('\\n❌ שגיאה בשחזור:', error.message);
  }
}

async function restoreDirectory(dir) {
  const backupPath = path.join(backupDir, dir);
  
  try {
    const entries = await fs.readdir(backupPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const backupItemPath = path.join(backupPath, entry.name);
      const originalPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        await fs.mkdir(originalPath, { recursive: true });
        await restoreDirectory(originalPath);
      } else {
        await fs.copyFile(backupItemPath, originalPath);
        console.log('  ✓ שוחזר:', originalPath);
      }
    }
  } catch (error) {
    // תיקייה לא קיימת בגיבוי
  }
}

restore();
`;

  await fs.writeFile('restore-backup.js', restoreScript, { mode: 0o755 });
  log.info('נוצר סקריפט שחזור: restore-backup.js');
}

// תהליך ראשי
async function main() {
  console.clear();
  log.header('ניקוי ואופטימיזציה של פרויקט מרים יעקובסון');
  
  if (config.dryRun) {
    log.warning('מצב DRY-RUN - לא יבוצעו שינויים בפועל');
  }
  
  // בדיקת תיקיית פרויקט
  if (!await fileExists('package.json')) {
    log.error('לא נמצא package.json - האם אתה בתיקיית הפרויקט?');
    process.exit(1);
  }
  
  // יצירת תיקיית גיבוי
  if (!config.dryRun) {
    await fs.mkdir(config.backupDir, { recursive: true });
    log.success(`נוצרה תיקיית גיבוי: ${config.backupDir}`);
  }
  
  // ביצוע שלבים
  const steps = [
    { name: 'cleanup', fn: cleanupUnusedFiles, title: 'ניקוי קבצים מיותרים' },
    { name: 'mobileFixes', fn: fixMobileCSS, title: 'תיקוני CSS למובייל' },
    { name: 'optimizations', fn: applyOptimizations, title: 'אופטימיזציות' }
  ];
  
  for (const step of steps) {
    if (config.steps[step.name]) {
      const answer = await question(`\n${colors.yellow}האם לבצע ${step.title}? (y/n) ${colors.reset}`);
      
      if (answer.toLowerCase() === 'y') {
        await step.fn();
      } else {
        log.warning(`דילוג על ${step.title}`);
      }
    }
  }
  
  // יצירת סקריפט שחזור
  if (!config.dryRun) {
    await createRestoreScript();
  }
  
  log.header('סיום התהליך');
  
  if (!config.dryRun) {
    log.info(`💾 הגיבוי נשמר ב: ${config.backupDir}`);
    log.info('🔄 לביטול השינויים הרץ: node restore-backup.js');
  }
  
  rl.close();
}

// הרצה
main().catch(error => {
  log.error(`שגיאה: ${error.message}`);
  process.exit(1);
});
