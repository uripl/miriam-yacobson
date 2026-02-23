# תכנית מעבר לדומיין מאפילה-לאורה.ישראל

## דומיין יעד

- **דומיין:** `מאפילה-לאורה.ישראל`
- **Punycode:** `xn----zhcbocfyyco1evc.xn--4dbrk0ce`
- **שרתי DNS:** `ns1.sitedepot.com`, `ns2.sitedepot.com`
- **פלטפורמת אירוח:** GitHub Pages

---

## שינויי קוד שבוצעו

| קובץ | שינוי | סטטוס |
|-------|-------|-------|
| `package.json` | `homepage` עודכן לדומיין החדש | בוצע |
| `src/services/firebase.js` | `authDomain` עודכן לדומיין החדש | בוצע |
| `public/CNAME` | נוצר עם הדומיין ב-Punycode | בוצע |
| `public/index.html` | הוסר Netlify Identity Widget | בוצע |
| `netlify.toml` | נמחק | בוצע |
| `public/_redirects` | נמחק | בוצע |
| `public/admin/` | נמחקה תיקיית Netlify CMS | בוצע |

---

## פעולות שנדרשות ממך (מחוץ לקוד)

### 1. הגדרת DNS ב-SiteDepot

ב-ממשק הניהול של SiteDepot, הגדר את הרשומות הבאות:

```
סוג        שם       ערך
────────────────────────────────────────
A           @        185.199.108.153
A           @        185.199.109.153
A           @        185.199.110.153
A           @        185.199.111.153
CNAME       www      uripl.github.io
```

> אלה כתובות ה-IP של GitHub Pages. רשומת ה-CNAME עבור `www` מפנה לדומיין של GitHub.

### 2. הגדרת דומיין מותאם ב-GitHub Pages

1. לך ל-GitHub → ריפו `miriam-yacobson` → **Settings** → **Pages**
2. בשדה **Custom domain** הזן: `xn----zhcbocfyyco1evc.xn--4dbrk0ce`
3. לחץ **Save**
4. המתן לאימות DNS (יכול לקחת כמה דקות)
5. סמן **Enforce HTTPS**

### 3. הוספת דומיין מורשה ב-Firebase

1. לך ל-[Firebase Console](https://console.firebase.google.com)
2. פתח פרויקט **miriam-yacobson**
3. לך ל-**Authentication** → **Settings** → **Authorized domains**
4. לחץ **Add domain**
5. הוסף: `xn----zhcbocfyyco1evc.xn--4dbrk0ce`

### 4. עדכון GitHub Secrets

ב-GitHub → ריפו → **Settings** → **Secrets and variables** → **Actions**:

עדכן (או הוסף) את ה-Secret:
```
REACT_APP_FIREBASE_AUTH_DOMAIN = xn----zhcbocfyyco1evc.xn--4dbrk0ce
```

---

## הערות

1. **Punycode:** הדומיין `מאפילה-לאורה.ישראל` הוא דומיין בינלאומי (IDN). שירותים טכניים דורשים את הייצוג ב-Punycode: `xn----zhcbocfyyco1evc.xn--4dbrk0ce`. מומלץ לוודא את הערך דרך כלי המרה מוסמך.

2. **זמן התפשטות DNS:** לאחר הגדרת רשומות DNS, יכולות לעבור עד 48 שעות עד שהשינוי יתפשט.

3. **HashRouter:** הפרויקט משתמש ב-HashRouter (כתובות עם `/#/`). זה עובד מצוין עם GitHub Pages ללא צורך בהגדרות נוספות. אם בעתיד תרצה כתובות נקיות, תצטרך לעבור ל-BrowserRouter עם טריק של `404.html`.
