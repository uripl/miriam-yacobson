# תכנית מעבר לדומיין מאפילה-לאורה.ישראל

## מצב נוכחי

| רכיב | מצב נוכחי |
|-------|-----------|
| **אירוח** | GitHub Pages (`uripl.github.io/miriam-yacobson`) |
| **דומיין** | אין דומיין מותאם אישית |
| **ניתוב (Router)** | HashRouter — כתובות עם `/#/` (למשל `/#/chapters/childhood`) |
| **homepage ב-package.json** | `/miriam-yacobson` (נתיב משנה של GitHub Pages) |
| **Firebase Auth Domain** | `uripl.github.io` |
| **Netlify** | קיים קובץ `netlify.toml` אבל לא ברור אם פעיל |
| **SSL** | מסופק אוטומטית דרך GitHub Pages |
| **CNAME** | לא קיים |

## דומיין יעד

- **דומיין:** `מאפילה-לאורה.ישראל`
- **Punycode:** `xn----zhcbocfyyco1evc.xn--4dbrk0ce` (הייצוג הטכני של הדומיין)
- **שרתי DNS:** `ns1.sitedepot.com`, `ns2.sitedepot.com`

---

## שלבי המעבר

### שלב 1: בחירת פלטפורמת אירוח

**המלצה: Netlify** (עדיפה על GitHub Pages לדומיין מותאם אישית)

| | GitHub Pages | Netlify |
|---|---|---|
| דומיין IDN (עברית) | תמיכה חלקית | תמיכה מלאה |
| SSL אוטומטי | כן | כן (Let's Encrypt) |
| הפניות (Redirects) | לא | כן — חיוני ל-SPA |
| Netlify CMS | לא רלוונטי | כבר מוגדר בפרויקט |
| Build מותאם | מוגבל | מלא |

> **GitHub Pages** דורש קובץ CNAME ותומך בדומיינים מותאמים, אבל ל-Netlify יש תמיכה טובה יותר בהפניות SPA ובניהול DNS. בנוסף, כבר קיימת תשתית Netlify בפרויקט.

---

### שלב 2: שינויי קוד בפרויקט

#### 2.1 — עדכון `package.json`
```diff
- "homepage": "/miriam-yacobson",
+ "homepage": "https://xn----zhcbocfyyco1evc.xn--4dbrk0ce",
```
> או להסיר את השדה לגמרי (Netlify לא צריך אותו).

#### 2.2 — מעבר מ-HashRouter ל-BrowserRouter
קובץ: `src/App.jsx`
```diff
- import { HashRouter as Router, Routes, Route } from 'react-router-dom';
+ import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
```
> **למה?** עם דומיין מותאם אישית, כתובות נקיות (`/chapters/childhood`) עדיפות על כתובות Hash (`/#/chapters/childhood`). זה גם טוב יותר ל-SEO.

#### 2.3 — עדכון `public/_redirects` (עבור Netlify)
```
# SPA fallback — כל הנתיבים מנותבים ל-index.html
/*    /index.html   200
```

#### 2.4 — הוספת קובץ `public/404.html` (גיבוי)
העתקה של `index.html` כ-`404.html` לטיפול בנתיבי SPA.

---

### שלב 3: עדכון Firebase

#### 3.1 — עדכון Auth Domain
קובץ: `src/services/firebase.js`
```diff
- authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "uripl.github.io",
+ authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "xn----zhcbocfyyco1evc.xn--4dbrk0ce",
```

#### 3.2 — הוספת הדומיין לרשימת הדומיינים המורשים ב-Firebase
ב-Firebase Console:
1. לך ל-**Authentication** → **Settings** → **Authorized domains**
2. הוסף את `xn----zhcbocfyyco1evc.xn--4dbrk0ce`
3. (אופציונלי) הוסף גם את `מאפילה-לאורה.ישראל`

---

### שלב 4: הגדרת DNS ב-SiteDepot

ב-ממשק הניהול של SiteDepot (שבו שרתי ה-DNS שלך), יש להגדיר:

#### אפשרות א׳: אם משתמשים ב-Netlify
```
סוג        שם                  ערך
──────────────────────────────────────────────────
ALIAS/A     @                   כתובת IP של Netlify (ניתנת בהגדרות הדומיין ב-Netlify)
CNAME       www                 [your-site].netlify.app
```

#### אפשרות ב׳: אם נשארים עם GitHub Pages
```
סוג        שם                  ערך
──────────────────────────────────────────────────
A           @                   185.199.108.153
A           @                   185.199.109.153
A           @                   185.199.110.153
A           @                   185.199.111.153
CNAME       www                 uripl.github.io
```
ובנוסף: יצירת קובץ `public/CNAME` עם התוכן:
```
xn----zhcbocfyyco1evc.xn--4dbrk0ce
```

---

### שלב 5: הגדרת הדומיין בפלטפורמת האירוח

#### ב-Netlify:
1. לך ל-**Site Settings** → **Domain management** → **Add custom domain**
2. הזן: `xn----zhcbocfyyco1evc.xn--4dbrk0ce`
3. Netlify יספק כתובות IP / CNAME להגדרת ה-DNS
4. הפעל **HTTPS** (אוטומטי דרך Let's Encrypt)

#### ב-GitHub Pages (אם נבחר):
1. לך ל-**Settings** → **Pages** → **Custom domain**
2. הזן את הדומיין ב-Punycode
3. סמן **Enforce HTTPS**

---

### שלב 6: עדכון משתני סביבה

#### ב-Netlify (`netlify.toml` או ממשק הניהול):
- `REACT_APP_FIREBASE_AUTH_DOMAIN` = `xn----zhcbocfyyco1evc.xn--4dbrk0ce`

#### ב-GitHub Actions (אם ממשיכים להשתמש):
- עדכן את ה-Secret `REACT_APP_FIREBASE_AUTH_DOMAIN`

---

### שלב 7: עדכון Netlify CMS (אם רלוונטי)

קובץ: `public/admin/config.yml`
```yaml
backend:
  name: git-gateway
  branch: main
```
> ההגדרה הנוכחית תקינה. יש לוודא ש-Netlify Identity מוגדר גם לדומיין החדש.

---

## סיכום שינויים בקבצים

| קובץ | שינוי |
|-------|-------|
| `package.json` | הסרת/עדכון `homepage` |
| `src/App.jsx` | HashRouter → BrowserRouter |
| `src/services/firebase.js` | עדכון authDomain לדומיין החדש |
| `public/_redirects` | הוספת SPA fallback rule |
| `netlify.toml` | (אופציונלי) הוספת משתני סביבה |
| `public/CNAME` | (רק אם GitHub Pages) הוספת קובץ CNAME |

## פעולות מחוץ לקוד

| פעולה | איפה |
|-------|------|
| הגדרת רשומות DNS | ממשק ניהול SiteDepot |
| הוספת דומיין מותאם | Netlify / GitHub Pages Settings |
| הוספת דומיין מורשה | Firebase Console → Authentication |
| הפעלת HTTPS | Netlify (אוטומטי) / GitHub Pages |
| בדיקת Netlify Identity | Netlify Console (אם משתמשים ב-CMS) |

---

## הערות חשובות

1. **דומיין עברי (IDN):** הדומיין `מאפילה-לאורה.ישראל` הוא דומיין בינלאומי. מערכות טכניות רבות דורשות את הייצוג ב-Punycode: `xn----zhcbocfyyco1evc.xn--4dbrk0ce`. יש לוודא את הערך המדויק של ה-Punycode דרך כלי המרה מוסמך.

2. **זמן התפשטות DNS:** לאחר שינוי רשומות DNS, יכולות לעבור עד 48 שעות עד שהשינוי יתפשט לכל העולם.

3. **שמירת הגישה הישנה:** מומלץ להשאיר את GitHub Pages פעיל עם הפניה (redirect) לדומיין החדש לתקופת מעבר.

4. **גיבוי:** לפני ביצוע שינויים, יש לוודא שכל הקוד מגובה ב-Git.
