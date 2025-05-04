import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';
import PlaceholderImage from '../../common/PlaceholderImage';

/**
 * דף פרק החיים בבלגיה
 */
const BelgiumPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'belgium'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id.includes('belgium') || doc.id.includes('antwerp')
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = quotes.filter(quote => 
    quote.context && quote.context.includes('בלגיה')
  );

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>החיים בבלגיה</h1>
          <p className="subtitle">1938-1940</p>
        </div>
      </header>

      <div className="container">
        <div className="chapter-navigation">
          <Link to="/" className="nav-back">חזרה לדף הבית</Link>
          <div className="chapter-pagination">
            <span className="chapter-number">פרק 2 מתוך 7</span>
            <div>
              <span className="pagination-text">פרק קודם: </span>
              <Link to="/chapters/childhood" className="pagination-link">ילדות בגרמניה</Link>
            </div>
            <div>
              <span className="pagination-text">פרק הבא: </span>
              <Link to="/chapters/france" className="pagination-link">צרפת תחת הכיבוש</Link>
            </div>
          </div>
        </div>

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>התקופה באנטוורפן</h2>
                <p>
                  בעקבות האירועים של ליל הבדולח בנובמבר 1938, אביה של מרים, רפאל (אברהם) אופנהיימר, 
                  הבין שאין עוד עתיד ליהודים בגרמניה ומיהר לברוח לבלגיה.
                </p>
                <p>
                  בהמשך, סודר לבנות המשפחה - מרים ואחיותיה, מעבר הגבול
                  באמצעות דרכון מזויף, שבו היה צורך לעשות "שינוי שם" מבן לבת כדי שיוכלו להשתמש בו.
                </p>
              </div>
              <div className="chapter-intro-image">
                <img 
                  src="/images/historical/antwerp-1930s.jpg" 
                  alt="אנטוורפן בשנות ה-30" 
                  loading="lazy"
                />
                <p className="image-caption">אנטוורפן, בלגיה, שנות ה-30</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>חיי הקהילה באנטוורפן והיידה</h2>
            <p>
              המשפחה התאחדה באנטוורפן, עיר שכבר אז הייתה מלאה בחיי יהדות. בעוד שאנטוורפן הייתה
              מוכרת בקהילה היהודית הפעילה שלה, בהיידה הסמוכה הייתה ישיבה ליטאית קטנה.
            </p>
            <p>
              מרים למדה בישיבה הליטאית בהיידה והושפעה מהסביבה היהודית החרדית שם. התקופה הזו היתה 
              עבור המשפחה זמן של התאקלמות במקום חדש, אך גם שמירה על חיי היהדות ואורח החיים הדתי.
            </p>
            <p>
              "היידה הייתה ידועה כמקום עם ישיבה ליטאית קטנה בראשותו של ר' שרגא אריפש הי"ד. 
              הווי הישיבה היה עבור אבא סיבה לאהוב את המקום, וגם אנו, הבנות, הושפענו מן 
              הסביבה והתפללנו שם בשבתות וחגים." - מספרת מרים בעדותה.
            </p>

            <div className="image-container">
              <img 
                src="/images/historical/heida-synagogue.jpg" 
                alt="בית הכנסת בהיידה" 
                loading="lazy"
              />
              <p className="image-caption">
                בית הכנסת בהיידה, בלגיה, שנות ה-30
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>הפלישה הגרמנית לבלגיה</h2>
            <p>
              התקופה השקטה יחסית נמשכה עד מאי 1940, כאשר גרמניה הנאצית פלשה לבלגיה, הולנד ולוקסמבורג
              במסגרת תוכניתה לעקוף את קו מאז'ינו ולתקוף את צרפת מכיוון צפון.
            </p>
            <p>
              עם הפלישה, נאסר אביה של מרים כאזרח גרמני, למרות שהיה פליט יהודי שברח מגרמניה. המשפחה
              נאלצה לברוח מערבה בניסיון להימלט מהגרמנים המתקדמים, יחד עם מיליוני פליטים נוספים.
            </p>
            <p>
              "בבלגיה הכבושה ניסינו ליצור קשר באמצעות סבתא אופנהיימר שנשארה בגרמניה, כי לא היו קשרי
              דואר בין בלגיה לצרפת. כתבתי מכתב לגרמניה שנתפס על ידי הצנזורה ודו"ח חקירת הסבתא הגיע לידינו
              לפני כמה שנים." - מתארת מרים את המצב הקשה באותם ימים.
            </p>
          </section>

          <section className="chapter-section">
            <h2>הבריחה לצרפת</h2>
            <p>
              בעקבות מהירות ההתקדמות הגרמנית, הפכה המנוסה לכאוטית. יחד עם זאת, 
              דרך חבר מלייפציג, הצליח אביה של מרים להשתחרר ממעצרו.
            </p>
            <p>
              "יום אחד הופיע גרמני ונבהלנו, עד שסיפר שהיה עצור במחנה עם אבא והעביר לנו 
              ד"ש ממנו. הוא אמר שהתרשם מאוד מאישיותו של אבא, הדתיות, הסדר, הניקיון והחריצות שלו." - מספרת מרים.
            </p>
            <p>
              עם שחרורו, אביה של מרים הורה למשפחה לנסות לעבור לצרפת. מרים ואחותה הקטנה עברו את הגבול באמצעות מבריחים, 
              במסע מסוכן שהסתיים בהגעתן לליון שבצרפת, שם פגשו את אביהן. כך החל פרק חדש בחייהם.
            </p>
          </section>

          <section className="chapter-gallery">
            <h2>תמונות מהתקופה</h2>
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <h2>מסמכים היסטוריים</h2>
            <div className="documents-grid">
              {relevantDocuments.map(document => (
                <DocumentPreview 
                  key={document.id}
                  document={document}
                />
              ))}
            </div>
          </section>

          {relevantQuotes.length > 0 && (
            <section className="chapter-quotes">
              <h2>ציטוטים נבחרים</h2>
              <div className="quotes-container">
                {relevantQuotes.map((quote, index) => (
                  <Quote 
                    key={index}
                    text={quote.text}
                    source={quote.source}
                    page={quote.page}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="chapter-navigation bottom">
            <Link to="/" className="nav-back">חזרה לדף הבית</Link>
            <div className="chapter-pagination">
              <span className="chapter-number">פרק 2 מתוך 7</span>
              <div>
                <span className="pagination-text">פרק קודם: </span>
                <Link to="/chapters/childhood" className="pagination-link">ילדות בגרמניה</Link>
              </div>
              <div>
                <span className="pagination-text">פרק הבא: </span>
                <Link to="/chapters/france" className="pagination-link">צרפת תחת הכיבוש</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BelgiumPage;
