import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';

/**
 * דף פרק החיים בארץ ישראל
 */
const IsraelPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'life-in-israel'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id === 'hefetz-haim-record' || doc.id === 'letter-1955'
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("זוהי נקמתנו")),
    quotes.find(quote => quote.text.includes("אם אני סוקרת"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>חיים בארץ ישראל</h1>
          <p className="subtitle">1949-2023</p>
        </div>
      </header>

      <div className="container">
        <div className="chapter-navigation">
          <Link to="/" className="nav-back">חזרה לדף הבית</Link>
          <div className="chapter-pagination">
            <span className="chapter-number">פרק 7 מתוך 7</span>
            <div>
              <span className="pagination-text">פרק קודם: </span>
              <Link to="/chapters/immigration" className="pagination-link">העלייה לישראל</Link>
            </div>
          </div>
        </div>

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>ראשית הדרך בקיבוץ חפץ חיים</h2>
                <p>
                  לאחר הגעתה לארץ והתרשמותה מהמקומות השונים, בחרה מרים להצטרף לקיבוץ חפץ חיים.
                  בקיבוץ החלה לבנות את חייה החדשים ולהשתלב בחברה הישראלית המתהווה.
                </p>
                <p>
                  "הצטרפתי לקיבוץ, נקלטתי די מהר, כי בשלה הייתי לנסות שוב ברצון ובחשק.
                  עבדתי מתוך חברות במקום העבודה ובקשר עם אנשים. חייתי חיים מלאים ופעילים בחברה" - מספרת מרים על ראשית דרכה בקיבוץ.
                </p>
              </div>
              <div className="chapter-intro-image">
                <img 
                  src="/images/historical/hefetz-haim-1950.jpg" 
                  alt="קיבוץ חפץ חיים, 1950" 
                  loading="lazy"
                />
                <p className="image-caption">קיבוץ חפץ חיים, 1950</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>החיים והעבודה בקיבוץ</h2>
            <p>
              בקיבוץ חפץ חיים עבדה מרים בעיקר במטבח. החיים בקיבוץ היו מלאי משמעות, למרות העבודה הקשה והתנאים הצנועים.
              היא נקשרה בידידות עם בני נוער עולים וניסתה להשפיע על מוסדות הקיבוץ לתת להם יחס שווה לזה של ילדי המשק בני גילם.
            </p>
            <p>
              "ניסינו להשפיע על מוסדות הקיבוץ לתת להם יחס כמו לילדי המשק בני גילם. ילדי המשק לא היו צריכים לעבוד וקיבלו אוכל, שיכון ולימודים ברמה גבוהה בהרבה.
              לא יכולנו להשלים עם הפליה זו, אבל לא שינינו דבר." - מתארת מרים את מאבקה למען השוויון.
            </p>
            <p>
              למרות ביקורתה על חלק מנהלי הקיבוץ, מרים הייתה מרוצה מחייה החברתיים: "הייתי מאושרת ומצאתי סיפוק וענין בעבודה.
              רכשתי לי חברות טובות, וגרתי בחדר של רחל שפיצר, שהייתה אלמנה מבעלה, ישעיה הי"ד, שנפל במלחמת השחרור."
            </p>
            
            <div className="image-container">
              <img 
                src="/images/family/hefetz-haim-1949.jpg" 
                alt="מרים בקיבוץ חפץ חיים" 
                loading="lazy"
              />
              <p className="image-caption">
                מרים בקיבוץ חפץ חיים, 1949
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>המפגש עם ישעי והנישואים</h2>
            <p>
              בקיבוץ חפץ חיים פגשה מרים את ישעי יעקובסון, האיש שעמו הקימה את ביתה ומשפחתה. הם הכירו בקיבוץ, התחתנו, ויחד בחרו להקים את ביתם במושב בית חלקיה הסמוך.
            </p>
            <p>
              "לאחר שנה קיבלתי חברות בקיבוץ, למרות הביקורת שהשמעתי לעתים. בכל זה הייתי מאושרת והרגשתי טוב בחיי החברה ומצאתי סיפוק ועניין בעבודה.
              כעבור זמן הכרתי את ישעי יעקובסון, ויחד החלטנו להקים משפחה." - מספרת מרים.
            </p>
            <p>
              החתונה התקיימה ב-1951, ובהמשך נולדו להם שני ילדים: מיכל ורפי. הזוג הצעיר החליט לעזוב את הקיבוץ ולעבור למושב בית חלקיה, שם בנו את ביתם וגידלו את משפחתם.
            </p>
            
            <div className="quote-wrapper">
              <Quote 
                text={relevantQuotes[0]?.text || "זוהי נקמתנו בנאצים הארורים, ימ\"ש: ילדים קטנים נוהרים לגן, ל'חיידר' ולבית הספר"}
                source={relevantQuotes[0]?.source || "מרים יעקובסון, מתוך 'מאפילה לאורה'"}
                page={relevantQuotes[0]?.page || 112}
              />
            </div>
          </section>

          <section className="chapter-section">
            <h2>בית חלקיה - בניית הבית והמשפחה</h2>
            <p>
              בשנת 1952 עברו מרים וישעי למושב בית חלקיה. כזוג צעיר בישוב מתפתח, חוו שנים קשות של עבודה מאומצת כדי להגיע לרמת חיים סבירה ולתת לילדיהם חיים טובים.
            </p>
            <p>
              "עבדנו קשה, בלי חשמל, טלפון, או שירותים בבית. כיבסתי ביד, בישלתי ואפיתי על פתיליות נפט, אבל הייתי מאושרת לבנות את חיינו בעצמאות.
              ברוך ה' שעזר לי להגיע עד הלום בלי להזדקק למתנת בשר ודם, ואפשר לי להכיר וללמוד מאנשים טובים בקיבוץ, בכפר ובעיר." - מרים מספרת על חיי היומיום בבית חלקיה.
            </p>
            <p>
              המכתבים ששלחה מרים לישעי בזמן שירות המילואים שלו ב-1955 שופכים אור על החיים שניהלו בתנאים קשים, אך מלאי תקווה ובטחון.
              היא מתארת את הטיפול בילדים, בחיות המשק, ובעבודות היומיומיות, תוך שמירה על רוח טובה ואופטימיות.
            </p>
            
            <div className="image-container">
              <img 
                src="/images/family/beit-chilkiya.jpg" 
                alt="בית המשפחה בבית חלקיה" 
                loading="lazy"
              />
              <p className="image-caption">
                בית משפחת יעקובסון בבית חלקיה, שנות ה-50
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>גידול הילדים וחיי המשפחה</h2>
            <p>
              מרים וישעי גידלו את ילדיהם, מיכל ורפי, בבית חלקיה. הם השקיעו רבות בחינוכם, תוך שילוב ערכי התורה והעבודה.
              החיים במושב אפשרו להם לחנך את ילדיהם בדרך שהאמינו בה, ולהעניק להם ילדות מאושרת ומוגנת, שונה בתכלית מילדותה שלה.
            </p>
            <p>
              לאורך השנים, ראתה מרים בהקמת המשפחה ובגידול הילדים את הניצחון האמיתי על הנאצים. המשפחה גדלה והתרחבה עם השנים, וכיום היא סבתא לנכדים ולנינים רבים.
            </p>
            <p>
              "כשאני רואה את המשפחה שהקמנו, את הילדים, הנכדים והנינים - זהו הניצחון האמיתי שלנו,
              של העם היהודי, על אלו שרצו להשמיד אותנו. זוהי נקמתנו - חיים יהודיים פורחים בארץ ישראל." - אומרת מרים בגאווה.
            </p>
          </section>

          <section className="chapter-section">
            <h2>מבט לאחור</h2>
            <p>
              בזקנתה, מרים מתבוננת אחורה בחייה הארוכים ורואה את הנס הגדול של הישרדותה ובניית חיים חדשים ומלאים בארץ ישראל.
              היא רואה את המשפחה שהקימה ואת העולם היהודי המשגשג בישראל כניצחון על מי שרצו להכחיד את העם היהודי.
            </p>
            <p>
              "אם אני סוקרת תקופה של למעלה משישים שנה, עלי להשתאות מה גדולה הישועה ומה גודל התמורה שהתחוללה בחיי.
              אלוליא חויתי, לא הייתי מאמינה." - מסכמת מרים את מסעה המופלא.
            </p>
            <p>
              היום, היא זוכה לראות את פירות עמלה וסבלה - משפחה לתפארת, חיים יהודיים עשירים בארץ ישראל, והנצחת זכר השואה והגבורה למען הדורות הבאים.
            </p>
            
            <div className="quote-wrapper">
              <Quote 
                text={relevantQuotes[1]?.text || "אם אני סוקרת תקופה של למעלה משישים שנה, עלי להשתאות מה גדולה הישועה ומה גודל התמורה שהתחוללה בחיי. אלוליא חויתי, לא הייתי מאמינה"}
                source={relevantQuotes[1]?.source || "מרים יעקובסון, מתוך 'מאפילה לאורה'"}
                page={relevantQuotes[1]?.page || 111}
              />
            </div>
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
              {relevantDocuments.length === 0 && (
                <div className="no-documents-message">
                  <p>אין מסמכים זמינים לתקופה זו</p>
                </div>
              )}
            </div>
          </section>

          <section className="chapter-quotes">
            <h2>ציטוטים נבחרים</h2>
            <div className="quotes-container">
              {relevantQuotes.length > 0 ? (
                relevantQuotes.map((quote, index) => (
                  <Quote 
                    key={index}
                    text={quote.text}
                    source={quote.source}
                    page={quote.page}
                  />
                ))
              ) : (
                <Quote 
                  text="זוהי נקמתנו בנאצים הארורים, ימ\"ש: ילדים קטנים נוהרים לגן, ל'חיידר' ולבית הספר"
                  source="מרים יעקובסון, מתוך 'מאפילה לאורה'"
                  page={112}
                />
              )}
            </div>
          </section>

          <div className="chapter-navigation bottom">
            <Link to="/" className="nav-back">חזרה לדף הבית</Link>
            <div className="chapter-pagination">
              <span className="chapter-number">פרק 7 מתוך 7</span>
              <div>
                <span className="pagination-text">פרק קודם: </span>
                <Link to="/chapters/immigration" className="pagination-link">העלייה לישראל</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsraelPage;
