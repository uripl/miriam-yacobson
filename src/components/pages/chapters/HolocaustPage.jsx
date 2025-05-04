import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';
import PlaceholderImage from '../../common/PlaceholderImage';

/**
 * דף פרק השואה - בעמק הבכא
 */
const HolocaustPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'holocaust'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id.includes('auschwitz') || doc.id.includes('holocaust')
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("הם לא ניצחו אותנו")),
    quotes.find(quote => quote.text.includes("גם בתופת זו"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>בעמק הבכא</h1>
          <p className="subtitle">1944-1945</p>
        </div>
      </header>

      <div className="container">
        <div className="chapter-navigation">
          <Link to="/" className="nav-back">חזרה לדף הבית</Link>
          <div className="chapter-pagination">
            <span className="chapter-number">פרק 4 מתוך 7</span>
            <div>
              <span className="pagination-text">פרק קודם: </span>
              <Link to="/chapters/france" className="pagination-link">צרפת תחת הכיבוש</Link>
            </div>
            <div>
              <span className="pagination-text">פרק הבא: </span>
              <Link to="/chapters/liberation" className="pagination-link">השחרור והחזרה לליון</Link>
            </div>
          </div>
        </div>

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>הגירוש לאושוויץ</h2>
                <p>
                  לאחר מעצרם על ידי הגסטפו במרץ 1944, הועברו מרים ואביה למחנה המעבר דרנסי ליד פריז.
                  לאחר כשבועיים במחנה, במוצאי חג הפסח, הועלו על רכבת מזרחה - אל המקום ששמו לא נודע להם אז: 
                  מחנה ההשמדה אושוויץ-בירקנאו.
                </p>
                <p>
                  "הוכנסנו לקרונות משא סגורים ללא חלונות ואפשרות לשכב. הרכבת נסעה מזרחה ימים שלמים,
                  והתנאים בקרון היו בלתי אנושיים - אחד דלי שירותים ל-80 איש שהצטופפו בקרון."
                </p>
              </div>
              <div className="chapter-intro-image">
                <img 
                  src="/images/historical/auschwitz-arrival.jpg" 
                  alt="הגעה לאושוויץ" 
                  loading="lazy"
                />
                <p className="image-caption">הגעת משלוח יהודים לאושוויץ, 1944</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>הסלקציה והפרידה</h2>
            <p>
              באפריל 1944, הגיעו מרים ואביה לאושוויץ. על רציף הרכבת התבצעה הסלקציה הראשונה -
              הפרדה בין גברים לנשים, ובין אלו שנשלחו ישירות לתאי הגזים לבין אלו שנבחרו לעבודה.
            </p>
            <p>
              "אחרי הסלקציה לא ראיתי יותר את אבא, אף על אף ששמעתי שמישהו ראה אותו אחר כך.
              ימים רבים ציפינו שעוד יחזור." - מספרת מרים בכאב על הפרידה מאביה, שלא שרד את המחנה.
            </p>
            <p>
              לאחר הסלקציה, עברה מרים תהליך של השפלה שיטתית - גילוח ראשה, הסרת כל פריטי לבוש אישיים,
              וקבלת תלבושת אסירה. היא הוכנסה לבלוק צפוף עם מאות נשים אחרות.
            </p>
            
            <div className="quote-wrapper">
              <Quote 
                text="ירוי במחנות: הם לא ניצחו אותנו, אנחנו ניצחנו אותם"
                source="מרים יעקובסון, מתוך 'מאפילה לאורה'"
                page={95}
              />
            </div>
          </section>

          <section className="chapter-section">
            <h2>החיים במחנה</h2>
            <p>
              מרים עבדה במחנה במיון בגדים של הנרצחים. דרך עבודה זו, ראתה את היקף הזוועה באופן ישיר,
              אך גם מצאה דרכים קטנות להציל את נפשה בתנאים הקשים.
            </p>
            <p>
              "בחורף, כשלא היה אוכל כי אם שלג בשפע, למדתי ממנה שבלי אוכל אין גוף.
              חברה אחרת, גם היא מצ'כיה, לא חדלה גם במצבים קשים ומדכאים מלומר: 'בבקשה, סליחה ותודה'
              ושמרה על סימונים גם כשהיכו אותה עבור זה." - מתארת מרים את הרוח האנושית שנשמרה במחנה.
            </p>
            <p>
              בחנוכה 1944, מתארת מרים כיצד הדליקו נר חנוכה ממרגרינה שחסכו וקיימו מצוות פרסומי ניסא
              ללא הסתרה, בתוך הבלוק. אור הנר האיר בפירצ וסימל את התקווה שלא כבתה.
            </p>

            <div className="image-container">
              <img 
                src="/images/historical/auschwitz-women.jpg" 
                alt="נשים אסירות באושוויץ" 
                loading="lazy"
              />
              <p className="image-caption">
                נשים אסירות במחנה אושוויץ, 1944
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>צעדת המוות</h2>
            <p>
              בינואר 1945, עם התקרבות הצבא הסובייטי לאושוויץ, החלו הנאצים לפנות את המחנה ולהצעיד
              את האסירים מערבה, אל תוך גרמניה.
            </p>
            <p>
              "צעדנו עשרות ומאות קילומטרים בשורות של שישה, ואוי לה למי שנחלשה או פיגרה.
              שומרים ליוו אותנו משני הצדדים עם הוראה לירות. בחלק מהדרך נסענו ברכבת על קרונות
              משא פתוחים בלילות קפואים." - מתארת מרים את המסע המפרך.
            </p>
            <p>
              מרים שרדה את צעדת המוות הנוראה, והגיעה למחנה הריכוז רוונסבריק בגרמניה.
              משם הועברה למחנה ניישטדט-גלווה שבצפון גרמניה.
            </p>
          </section>

          <section className="chapter-section">
            <h2>בציפייה לשחרור</h2>
            <p>
              בפברואר-אפריל 1945, עם התקדמות הכוחות של בעלות הברית לתוך גרמניה מכל החזיתות,
              התקווה לשחרור קרוב הלכה וגברה בקרב האסירים.
            </p>
            <p>
              "בהתקרב החזית הרוסית, החלו להרוס את הקרמטוריום. חילה לחשה לנו: 'אם אני,
              שעבדו אותי בהקמת הכבשן, זוכה לראות בהריסתו, סימן שהגאולה קרבה'."
            </p>
            <p>
              בימים האחרונים לפני השחרור, כשהגרמנים כבר ידעו שהקץ קרב, הייתה תחושת סכנה
              נוספת באוויר - החשש שהנאצים ינסו להשמיד את כל העדים לפשעיהם לפני נסיגתם.
              אולם, ב-18 בינואר, הגרמנים ריכזו את האסירים ליום הקודם ליציאה לצעדת מוות נוספת,
              אך מרים שרדה גם אותה.
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

          <div className="chapter-navigation bottom">
            <Link to="/" className="nav-back">חזרה לדף הבית</Link>
            <div className="chapter-pagination">
              <span className="chapter-number">פרק 4 מתוך 7</span>
              <div>
                <span className="pagination-text">פרק קודם: </span>
                <Link to="/chapters/france" className="pagination-link">צרפת תחת הכיבוש</Link>
              </div>
              <div>
                <span className="pagination-text">פרק הבא: </span>
                <Link to="/chapters/liberation" className="pagination-link">השחרור והחזרה לליון</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolocaustPage;
