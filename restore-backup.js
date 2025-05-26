#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

const backupDir = 'backup_2025-05-26T06_19_56_009Z';

async function restore() {
  console.log('\n🔄 משחזר קבצים מגיבוי: ' + backupDir);
  
  try {
    await restoreDirectory('.');
    console.log('\n✅ השחזור הושלם בהצלחה!');
  } catch (error) {
    console.error('\n❌ שגיאה בשחזור:', error.message);
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
