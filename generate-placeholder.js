const { createCanvas } = require('canvas');
const fs = require('fs');

const canvas = createCanvas(400, 300);
const ctx = canvas.getContext('2d');

// רקע
ctx.fillStyle = '#f5f5f5';
ctx.fillRect(0, 0, 400, 300);

// טקסט
ctx.fillStyle = '#2e5077';
ctx.font = 'bold 24px Heebo, Arial, sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('מאפילה לאורה', 200, 150);

// שמירה
fs.mkdirSync('./public/images', { recursive: true }); // אם התיקייה לא קיימת
const buffer = canvas.toBuffer('image/jpeg');
fs.writeFileSync('./public/images/placeholder.jpg', buffer);

console.log('✅ placeholder.jpg נוצר בהצלחה!');
