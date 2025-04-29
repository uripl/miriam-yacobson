import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AboutPage.css';

/**
 * דף אודות מרים - מציג מידע אישי על מרים ותמונות נבחרות
 */
const AboutPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <header className="page-header">
        <div className="container">
          <h1>אודות מרים אופנהיימר (יעקובסון)</h1>
          <p className="subtitle">מסע חיים מלא תקווה וכוח</p>
        </div>
      </header>

      <div className="container">
        <div className="about-content">
          <section className="about-intro">
            <div className="about-image">
              <img 
                src="/images/family/miriam-portrait.jpg" 
                alt="מרים יעקובסון" 
                loading="lazy"
              />
            </div>
            <div className="about-text">
              <h2>מרים יעקובסון - סיפור חיים</h2>
              <p>
                מרים אופנהיימר (יעקובסון) נולדה ביום ז׳ מרחשוון ה׳תרפ״ה (24 באוקטובר 1925) בעיר לייפציג שבמרכז גרמניה. 
                חייה, שהחלו בבית יהודי חם ואוהב, הפכו לסיפור מופלא של הישרדות, תקווה ובנייה מחדש לאחר השואה.
              </p>
              <p>
                מסעה של מרים מגרמניה הנאצית דרך בלגיה, צרפת, מחנה אושוויץ ועד לחיים חדשים בארץ ישראל, 
                הוא עדות לכוח הרוח האנושית ולאמונה העמוקה שליוותה אותה.
              </p>
              <p>
                בארץ ישראל, הקימה מרים משפחה לתפארת יחד עם בעלה ישעי יעקובסון. 
                סיפורה האישי משקף את סיפורו של העם היהודי כולו - מהחורבן אל התקומה.
              </p>
            </div>
          </section>

          <section className="about-timeline">
            <h2>אבני דרך בחייה</h2>
            <div className="timeline-simple">
              <div className="timeline-item">
                <div className="timeline-date">1925</div>
                <div className="timeline-content">
                  <h3>לידה בלייפציג</h3>
                  <p>נולדה למשפחה יהודית שומרת מצוות בגרמניה</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">1938</div>
                <div className="timeline-content">
                  <h3>בריחה מגרמניה</h3>
                  <p>לאחר ליל הבדולח, המשפחה נמלטה לבלגיה</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">1940-1944</div>
                <div className="timeline-content">
                  <h3>תקופת המלחמה</h3>
                  <p>חיי מסתור ובריחה בבלגיה וצרפת</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">1944-1945</div>
                <div className="timeline-content">
                  <h3>אושוויץ וההצלה</h3>
                  <p>נשלחה למחנה אושוויץ ושרדה בתנאים הקשים ביותר</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">1948</div>
                <div className="timeline-content">
                  <h3>עלייה לארץ ישראל</h3>
                  <p>עלתה לארץ ישראל לאחר השואה והחלה בחיים חדשים</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-date">1951-2023</div>
                <div className="timeline-content">
                  <h3>חיים בישראל</h3>
                  <p>הקימה משפחה והייתה לסמל לניצחון הרוח האנושית</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-quotes">
            <h2>במילותיה</h2>
            <blockquote className="featured-quote">
              "אם אני סוקרת תקופה של למעלה משישים שנה, עלי להשתאות מה גדולה הישועה ומה גודל התמורה שהתחוללה בחיי. אלוליא חויתי, לא הייתי מאמינה."
              <footer>— מרים יעקובסון, מתוך "מאפילה לאורה"</footer>
            </blockquote>
          </section>

          <section className="about-cta">
            <h2>לגלות את הסיפור המלא</h2>
            <p>
              באתר זה תוכלו לעקוב אחר מסעה המופלא של מרים - מילדותה בגרמניה ועד לחייה בישראל.
              דרך תמונות, מסמכים וסיפורים אישיים, תוכלו להכיר את האישה המופלאה ואת התקופה ההיסטורית בה חיה.
            </p>
            <div className="cta-buttons">
              <Link to="/timeline" className="btn-primary">
                לציר הזמן המלא
              </Link>
              <Link to="/chapters/childhood" className="btn-secondary">
                התחל לקרוא את הסיפור
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
