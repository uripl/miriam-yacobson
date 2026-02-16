#!/usr/bin/env node

/**
 * Upload chapter content to Firestore.
 *
 * Usage:
 *   node scripts/uploadChapter.js <chapterId> <jsonFile>
 *
 * Example:
 *   node scripts/uploadChapter.js childhood scripts/data/childhood.json
 *
 * JSON format:
 * {
 *   "sections": [
 *     {
 *       "title": "כותרת הסעיף",
 *       "paragraphs": ["פסקה ראשונה", "פסקה שנייה"],
 *       "image": "/images/example.jpg",    // optional
 *       "caption": "כיתוב לתמונה"          // optional, requires image
 *     }
 *   ]
 * }
 *
 * Each section becomes a doc in chapters/{chapterId}/sections (with order, hasImage, paragraphCount).
 * The actual text/image values go into the "content" collection, keyed by:
 *   {chapterId}-section-{docId}-title
 *   {chapterId}-section-{docId}-p0, p1, ...
 *   {chapterId}-section-{docId}-image   (if image provided)
 *   {chapterId}-section-{docId}-caption  (if caption provided)
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, setDoc, doc } = require('firebase/firestore');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadChapter(chapterId, jsonPath) {
  const fullPath = path.resolve(jsonPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  if (!data.sections || !Array.isArray(data.sections)) {
    console.error('JSON must have a "sections" array');
    process.exit(1);
  }

  console.log(`Uploading ${data.sections.length} sections to chapters/${chapterId}/sections ...\n`);

  for (let i = 0; i < data.sections.length; i++) {
    const section = data.sections[i];
    const hasImage = !!section.image;
    const paragraphCount = section.paragraphs ? section.paragraphs.length : 0;

    // 1. Create section doc
    const sectionDoc = {
      order: i,
      hasImage,
      paragraphCount,
    };

    const docRef = await addDoc(collection(db, `chapters/${chapterId}/sections`), sectionDoc);
    const sectionId = docRef.id;
    console.log(`  [${i}] Section "${section.title}" → ${sectionId}`);

    // 2. Write title to content collection
    if (section.title) {
      await setDoc(doc(db, 'content', `${chapterId}-section-${sectionId}-title`), {
        value: section.title,
        editedBy: 'upload-script',
        editedAt: new Date().toISOString(),
      });
    }

    // 3. Write paragraphs
    if (section.paragraphs) {
      for (let j = 0; j < section.paragraphs.length; j++) {
        await setDoc(doc(db, 'content', `${chapterId}-section-${sectionId}-p${j}`), {
          value: section.paragraphs[j],
          editedBy: 'upload-script',
          editedAt: new Date().toISOString(),
        });
      }
    }

    // 4. Write image URL (if provided)
    if (section.image) {
      await setDoc(doc(db, 'content', `${chapterId}-section-${sectionId}-image`), {
        value: section.image,
        editedBy: 'upload-script',
        editedAt: new Date().toISOString(),
      });
    }

    // 5. Write caption (if provided)
    if (section.caption) {
      await setDoc(doc(db, 'content', `${chapterId}-section-${sectionId}-caption`), {
        value: section.caption,
        editedBy: 'upload-script',
        editedAt: new Date().toISOString(),
      });
    }
  }

  console.log(`\nDone! Uploaded ${data.sections.length} sections for chapter "${chapterId}".`);
  process.exit(0);
}

// --- CLI ---
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node scripts/uploadChapter.js <chapterId> <jsonFile>');
  console.log('Example: node scripts/uploadChapter.js childhood scripts/data/childhood.json');
  process.exit(1);
}

uploadChapter(args[0], args[1]);
