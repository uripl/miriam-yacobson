module.exports = {
  "extends": [
    "react-app"
  ],
  "rules": {
    // מקל על בדיקת משתנים שאינם בשימוש ישיר אבל משמשים כגיבוי
    "no-unused-vars": ["warn", { 
      "vars": "all", 
      "args": "after-used",
      "ignoreRestSiblings": true,
      "varsIgnorePattern": "PlaceholderImage|React" // התעלם מאזהרות על PlaceholderImage ו-React
    }],
    
    // מקל על בדיקת תלויות ב-hooks
    "react-hooks/exhaustive-deps": "warn",
    
    // מבטל אזהרות חסרות משמעות שמפריעות בבילד
    "import/no-anonymous-default-export": "off",
    "jsx-a11y/anchor-is-valid": "off",
    
    // מאפשר התייחסות ל-document בתוך רכיבים
    "no-restricted-globals": "off"
  },
  "overrides": [
    {
      "files": ["**/*.js", "**/*.jsx"],
      "rules": {
        // כללים ספציפיים לקבצי JavaScript/JSX
      }
    }
  ]
}
