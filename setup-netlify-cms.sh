#!/bin/bash

echo "🚀 מתחיל התקנת Netlify CMS..."

# יצירת תיקיות נדרשות
echo "📁 יוצר תיקיות..."
mkdir -p public/admin
mkdir -p src/content/documents
mkdir -p src/content/gallery
mkdir -p public/images/uploads

# יצירת קובץ index.html עבור ה-CMS
echo "📝 יוצר קובץ admin/index.html..."
cat > public/admin/index.html << 'EOF'
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ניהול תוכן - מאפילה לאורה</title>
  
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  
  <!-- Include Netlify Identity Widget for authentication -->
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- This page will be replaced by the CMS interface -->
</body>
</html>
EOF

# יצירת קובץ config.yml
echo "⚙️ יוצר קובץ admin/config.yml..."
cat > public/admin/config.yml << 'EOF'
backend:
  name: git-gateway
  branch: main # שם הענף הראשי שלך ב-GitHub

# אפשרות לתצוגה מקדימה
local_backend: true

# העלאת קבצים
media_folder: "public/images/uploads" # איפה יישמרו הקבצים
public_folder: "/images/uploads" # הנתיב הציבורי לקבצים

# הגדרות בעברית
locale: 'he'

# אוספי תוכן
collections:
  # אוסף מסמכים היסטוריים
  - name: "documents"
    label: "מסמכים היסטוריים"
    folder: "src/content/documents"
    create: true
    slug: "{{slug}}"
    extension: "json"
    fields:
      - {label: "כותרת", name: "title", widget: "string", required: true}
      - {label: "תאריך המסמך", name: "date", widget: "string", required: true}
      - {label: "תיאור", name: "description", widget: "text", required: true}
      - {label: "תמונת המסמך", name: "imageSrc", widget: "image", required: true}
      - {label: "תמונה ממוזערת", name: "thumbnailSrc", widget: "image", required: false}
      - {label: "מקור", name: "source", widget: "string", required: false}
      - {label: "מספר בארכיון", name: "archiveNumber", widget: "string", required: false}
      - {label: "תרגום", name: "translation", widget: "text", required: false}
      - {label: "קטגוריה", name: "category", widget: "select", options: ["reference-card", "certificate", "letter", "testimony", "other"]}
      
  # אוסף תמונות לגלריה
  - name: "gallery"
    label: "תמונות גלריה"
    folder: "src/content/gallery"
    create: true
    slug: "{{slug}}"
    extension: "json"
    fields:
      - {label: "כותרת", name: "title", widget: "string", required: true}
      - {label: "תמונה", name: "src", widget: "image", required: true}
      - {label: "תיאור התמונה", name: "alt", widget: "string", required: true}
      - {label: "כיתוב", name: "caption", widget: "text", required: false}
      - {label: "שנה", name: "year", widget: "string", required: false}
      - {label: "מיקום", name: "location", widget: "string", required: false}
      - {label: "תקופה", name: "period", widget: "select", options: [
          {label: "ילדות בגרמניה", value: "childhood"},
          {label: "בלגיה", value: "belgium"},
          {label: "צרפת", value: "france"},
          {label: "תקופת השואה", value: "holocaust"},
          {label: "השחרור", value: "liberation"},
          {label: "העלייה לארץ", value: "immigration"},
          {label: "חיים בישראל", value: "life-in-israel"}
        ]}
EOF

# הוספת Netlify Identity Widget ל-index.html
echo "🔧 מוסיף Netlify Identity Widget..."
# בודק אם הסקריפט כבר קיים
if ! grep -q "netlify-identity-widget.js" public/index.html; then
  # מוסיף את הסקריפט לפני סוף ה-body
  sed -i '/<\/body>/i \
    <!-- Netlify Identity Widget -->\
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>\
    <script>\
      if (window.netlifyIdentity) {\
        window.netlifyIdentity.on("init", user => {\
          if (!user) {\
            window.netlifyIdentity.on("login", () => {\
              document.location.href = "/admin/";\
            });\
          }\
        });\
      }\
    </script>' public/index.html
fi

# יצירת קובץ דוגמה למסמך
echo "📄 יוצר קובץ דוגמה למסמך..."
cat > src/content/documents/example-document.json << 'EOF'
{
  "title": "מסמך דוגמה",
  "date": "1945",
  "description": "זהו מסמך דוגמה להמחשה",
  "imageSrc": "/images/documents/reference-card-1.jpg",
  "thumbnailSrc": "/images/documents/thumbs/reference-card-1-thumb.jpg",
  "source": "ארכיון המשפחה",
  "archiveNumber": "12345",
  "translation": "תרגום המסמך יופיע כאן",
  "category": "certificate"
}
EOF

# יצירת קובץ דוגמה לתמונה
echo "🖼️ יוצר קובץ דוגמה לתמונה..."
cat > src/content/gallery/example-image.json << 'EOF'
{
  "title": "תמונה לדוגמה",
  "src": "/images/family/leipzig-family.jpg",
  "alt": "משפחת אופנהיימר בלייפציג",
  "caption": "משפחת אופנהיימר בלייפציג, שנות ה-30",
  "year": "1930",
  "location": "לייפציג, גרמניה",
  "period": "childhood"
}
EOF

# הוספת gitkeep לתיקיות ריקות
touch public/images/uploads/.gitkeep

echo "✅ ההתקנה הושלמה!"
echo ""
echo "📌 השלבים הבאים:"
echo "1. הפעל את Netlify Identity באתר שלך ב-Netlify"
echo "2. הוסף משתמשים דרך לוח הבקרה של Netlify"
echo "3. גש ל-/admin בכתובת האתר שלך"
echo ""
echo "🔄 אל תשכח לעשות commit ו-push לשינויים!"

