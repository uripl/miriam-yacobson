import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';
import PlaceholderImage from '../../common/PlaceholderImage';

/**
 * דף פרק החיים בצרפת תחת הכיבוש
 */
const FrancePage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'france'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id.includes('france') || doc.id.includes('lyon')
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = quotes.filter(quote => 
    quote.context && quote.context.includes('צרפת')
  );

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>צרפת תחת הכיבוש</h1>
          <p className="subtitle">1940-1944</p>
        </div>
      </header>

      <div className="container">
        <div className="chapter-navigation">
          <Link to="/" className="nav-back">חזרה לדף הבית</Link>
          <div className="chapter-pagination">
            <span className="chapter-number">פרק 3 מתוך 7</span>
            <div>
              <span className="pagination-text">פרק קודם: </span>
              <Link to="/chapters/belgium" className="pagination-link">החיים בבלגיה</Link>
            </div>
            <div>
              <span className="pagination-text">פרק הבא: </span>
              <Link to="/chapters/holocaust" className="pagination-link">בעמק הבכא</Link>
            </div>
          </div>
        </div>

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>הבריחה לצרפת</h2>
                <p>
                  לאחר הפלישה הגרמנית לבלגיה במאי 1940, משפחת אופנהיימר נאלצה להימלט דרומה.
                  מרים ואחותה הקטנה הצליחו לעבור את הגבול לצרפת בעזרת מבריחים, במסע מסוכן שכלל הליכה ברגל
                  ונסיעה ברכבת תחת איום מתמיד.
                </p>
                <p>
                  "מרים ואני נשארנו עזובים ומיואשים בתחנת הרכבת בכפר צרפתי. לפתע הופיע מלאך מושיע בדמות
                  יהודייה צעירה שגילתה חמלה נוכח המראה המעורר רחמים ואת הסכנה הנשקפת לנו." - מספרת אחותה של מרים.
                </p>
              </div>
              <div className="chapter-intro-image">
                <img 
                  src="/images/historical/lyon-1940s.jpg" 
                  alt="ליון בשנות ה-40" 
                  loading="lazy"
                />
                <p className="image-caption">ליון, צרפת, שנות ה-40</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>החיים בליון</h2>
            <p>
              המשפחה התאחדה מחדש בליון, עיר שעדיין לא הייתה תחת שליטה ישירה של הנאצים.
              צרפת הייתה מחולקת אז לאזור הכיבוש הגרמני בצפון ולאזור של ממשלת וישי בדרום,
              שהיה כביכול "עצמאי" אך למעשה שיתף פעולה עם הנאצים.
            </p>
            <p>
              "המשפחה חודשה לתקופה קצרה. כמובן היינו זקוקים לתעודות מזויפות,
              אבל בצרפת ניתן היה אז להשיג הכל עם שוחד. הכל היה כרוך בהתחכמויות, סכנות,
              קשרים והרבה סייעתא דשמיא." - מרים מספרת בעדותה.
            </p>
            <p>
              למרות המצב הקשה, המשיך אביה של מרים להקפיד על שמירת מצוות וחיי יהדות.
              הוא אף ארגן מטבח כשר זול בתקופה של מחסור במזון, וניהל תפילות וטקסים דתיים בסתר.
            </p>

            <div className="image-container">
              <img 
                src="/images/historical/lyon-jewish-quarter.jpg" 
                alt="הרובע היהודי בליון" 
                loading="lazy"
              />
              <p className="image-caption">
                הרובע היהודי בליון, צרפת, תקופת המלחמה
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>החמרת המצב</h2>
            <p>
              בנובמבר 1942, לאחר נחיתת בעלות הברית בצפון אפריקה, כבשו הנאצים את דרום צרפת
              שהיה עד אז תחת שלטון וישי. כעת, המצב החמיר עבור יהודי צרפת, ובכללם משפחת אופנהיימר.
            </p>
            <p>
              "בעיר נעשו 'ראציות' (פשיטות), מעצרים ומשלוחים. אנחנו, כמו הרבה יהודים,
              נעלמנו מן השטח וניסינו בעזרת מבריחים בליל שלג לעבור את הגבול לשווייץ. נתפסנו,
              ואבא ישב חודש בבית סוהר בו היה חשש שיימסר לידי הגסטפו." - מספרת מרים.
            </p>
            <p>
              המשפחה ברחה לדרום צרפת, לערים כמו ניצה וגרנובל, בניסיון להתחמק מהגסטפו ומתפיסה.
              הם החליפו מקומות מסתור לפי תנועות הגסטפו והצליחו לשרוד במשך שנים ארוכות.
            </p>
          </section>

          <section className="chapter-section">
            <h2>המעצר והגירוש</h2>
            <p>
              "יום אחד הגיע הצורר ויסלבוך עם שוטרים צרפתיים שקיבלו פקודה לעצור את כל
              היהודים במחנה שלנו. היה זה לפני פסח תש"ד (מרץ 1944), חודשיים לפני פלישת הבריטים
              והאמריקאים לצרפת." - מתארת מרים את רגע התפנית הגורלי.
            </p>
            <p>
              מרים ואביה נתפסו על ידי הגסטפו והועברו למעצר, בעוד שאמה ואחיותיה הצליחו להסתתר.
              הם הועברו למחנה דרנסי ליד פריז, שהיה מחנה מעבר ממנו יצאו משלוחים למזרח.
            </p>
            <p>
              "במחנה דרנסי, למרות כל הקשיים, המשיך אבא לדאוג למצוות הפסח. לא חלמנו על מצות,
              אבל אבא הכשיר כלים והמיר את מנות הלחם בתפוחי אדמה." - מספרת מרים על הימים האחרונים לפני הגירוש.
            </p>
            <p>
              במוצאי חג הפסח, הועלו מרים ואביה לקרונות בקר חתומים בדרכם למזרח. הם לא ידעו אז,
              אבל יעדם היה מחנה ההשמדה אושוויץ-בירקנאו.
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
                {relevantQuotes.length === 0 && (
                  <Quote 
                    text="בכל המקומות הקשים ביותר שהיינו בהם, תמיד היו אנשים טובים שהושיטו יד"
                    source="מרים יעקובסון, מתוך 'מאפילה לאורה'"
                    page={93}
                  />
                )}
              </div>
            </section>
          )}

          <div className="chapter-navigation bottom">
            <Link to="/" className="nav-back">חזרה לדף הבית</Link>
            <div className="chapter-pagination">
              <span className="chapter-number">פרק 3 מתוך 7</span>
              <div>
                <span className="pagination-text">פרק קודם: </span>
                <Link to="/chapters/belgium" className="pagination-link">החיים בבלגיה</Link>
              </div>
              <div>
                <span className="pagination-text">פרק הבא: </span>
                <Link to="/chapters/holocaust" className="pagination-link">בעמק הבכא</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrancePage;
