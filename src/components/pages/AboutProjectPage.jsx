import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AboutProjectPage.css';

/**
 * דף אודות הפרויקט - מציג מידע על מטרות הפרויקט ויוצריו
 */
const AboutProjectPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-project-page">
      <header className="page-header">
        <div className="container">
          <h1>אודות הפרויקט</h1>
          <p className="subtitle">הנצחת סיפורה של מרים אופנהיימר (יעקובסון)</p>
        </div>
      </header>

      <div className="container">
        <div className="about-project-content">
          <section className="about-project-intro">
            <h2>מטרת הפרויקט</h2>
            <p>
              הפרויקט "מאפילה לאורה" נוצר במטרה לשמר ולהנציח את סיפור חייה המיוחד של מרים אופנהיימר (יעקובסון),
              ניצולת שואה שהצליחה לבנות חיים חדשים בארץ ישראל לאחר תלאות השואה.
            </p>
            <p>
              דרך סיפורה האישי, אנו מבקשים לספר את סיפורו של דור שלם - דור השואה והתקומה - ולהעביר את הזיכרון
              וההיסטוריה לדורות הבאים בצורה חווייתית, אינטראקטיבית ומכבדת.
            </p>
          </section>

          <section className="project-team">
            <h2>צוות הפרויקט</h2>
            <div className="team-members">
              <div className="team-member">
                <h3>משפחת יעקובסון</h3>
                <p className="team-role">יזמי הפרויקט</p>
                <p>
                  בני משפחתה של מרים, אשר אספו מסמכים, תמונות וסיפורים מחייה וחלקו את הנרטיב האישי
                  והמשפחתי לטובת הפרויקט.
                </p>
              </div>
              
              <div className="team-member">
                <h3>צוות פיתוח האתר</h3>
                <p className="team-role">תכנון, עיצוב ופיתוח</p>
                <p>
                  צוות של מפתחים, מעצבים וחוקרים אשר עמלו על הקמת האתר, איסוף החומרים, ארגונם והנגשתם לציבור
                  הרחב בצורה אינטראקטיבית.
                </p>
              </div>
              
              <div className="team-member">
                <h3>מתעדים והיסטוריונים</h3>
                <p className="team-role">מחקר ותיעוד</p>
                <p>
                  אנשי מקצוע אשר סייעו בתיעוד הסיפור, באימות העובדות ובהצגתן בהקשר ההיסטורי הרחב של התקופה.
                </p>
              </div>
            </div>
          </section>

          <section className="technical-info">
            <h2>מידע טכני</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <h3>טכנולוגיות</h3>
                <ul>
                  <li>React.js - פיתוח ממשק המשתמש</li>
                  <li>CSS מודרני - עיצוב ותצוגה רספונסיבית</li>
                  <li>מפות אינטראקטיביות - להצגת מסע החיים</li>
                  <li>ציר זמן אינטראקטיבי - להצגת אירועים היסטוריים</li>
                </ul>
              </div>
              
              <div className="tech-item">
                <h3>מקורות מידע</h3>
                <ul>
                  <li>עדויות אישיות של מרים ובני משפחתה</li>
                  <li>מסמכים מארכיונים היסטוריים</li>
                  <li>תצלומים ממקורות משפחתיים והיסטוריים</li>
                  <li>ספרות וחומר תיעודי על התקופה</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>יצירת קשר</h2>
            <p>
              אנו מזמינים אתכם ליצור עמנו קשר בכל שאלה, הארה, או תוספת מידע שיכולה לשפר ולהעשיר את הפרויקט.
              אם יש לכם מידע נוסף, תמונות, מסמכים או סיפורים אישיים הקשורים לסיפורה של מרים או לתקופה,
              נשמח מאוד לשמוע מכם.
            </p>
            <div className="contact-details">
              <p><strong>דוא"ל:</strong> info@miriam-story.org.il</p>
              <p><strong>טלפון:</strong> 02-1234567</p>
            </div>
          </section>

          <section className="acknowledgements">
            <h2>תודות</h2>
            <p>
              ברצוננו להודות לכל מי שתרם לפרויקט זה - בני משפחה, חברים, אנשי מקצוע, ומוסדות שסייעו באיסוף המידע
              ובהנגשתו. תודה מיוחדת למרים עצמה, על סיפור חייה המרגש ועל המורשת שהותירה לנו כולנו.
            </p>
            <p>
              כל הזכויות שמורות למשפחת יעקובסון © {new Date().getFullYear()}
            </p>
          </section>
          
          <div className="back-to-home">
            <Link to="/" className="btn-primary">
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProjectPage;
