import React, { useEffect } from 'react';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import PlaceholderImage from '../../common/PlaceholderImage';
import ChapterNavBar from '../../common/ChapterNavBar';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';

/**
 * דף פרק העלייה לישראל
 */
const ImmigrationPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'immigration'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id === 'israel-certificate' || doc.id.includes('immigration')
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = quotes.filter(quote => 
    quote.context && quote.context.includes('העלייה לארץ')
  );

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>העלייה לישראל</h1>
          <p className="subtitle">1948-1949</p>
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>ההחלטה לעלות לארץ ישראל</h2>
                <p>
                  לאחר תקופת השיקום בליון, פעלה מרים יחד עם שליחים מארץ ישראל במוסד "חלוצי יהודה" שטיפל בילדים שניצלו מהשואה.
                  במסגרת עבודתה זו התחזק הקשר שלה עם ארץ ישראל, והתעורר בה הרצון לעלות ארצה ולבנות בה את חייה מחדש.
                </p>
                <p>
                  "שליחים מארץ ישראל פעלו במוסד כיועצים, מורים ומדריכים. החירות והתושייה שלהם עודדו אותי לעלות לארץ ישראל" - מספרת מרים על התקופה שקדמה לעלייתה.
                </p>
              </div>
              <div className="chapter-intro-image">
                <img 
                  src="/images/historical/immigration-ship.jpg" 
                  alt="אוניית עולים בדרכה לארץ ישראל, 1948" 
                  loading="lazy"
                />
                <p className="image-caption">אוניית עולים בדרכה לארץ ישראל, 1948</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>המסע לארץ ישראל</h2>
            <p>
              באפריל 1948, ערב הקמת המדינה, הפליגה מרים מנמל מרסיי בצרפת יחד עם קבוצה של כ-40 ילדים שהיו מיועדים להיקלט במוסדות פועלי אגודת ישראל (פא"י) בארץ. לנוכח מאבק השחרור היה אז הסגר חלקי על הארץ.
            </p>
            <p>
              "הפלגנו ממרסיי ונדחקנו באוניה רעועה, 10 ימים עם מחלת ים, עד שהגענו לחיפה... האוניה הייתה ישראלית והופעתם הבטוחה והנמרצת של המלחים, המפקדים והמורים הישראלים הרשימו אותי ואת חברותי, גבלינה ופאני, שהיו איתי בתפקיד מלוות הילדים" - מתארת מרים את המסע הימי.
            </p>
            <p>
              ההפלגה הייתה מאתגרת, אך מלאת תקווה. זו הייתה הפעם הראשונה שמרים נשמה את אוויר החופש האמיתי לאחר שנים ארוכות של פחד, רדיפות וסבל.
            </p>
            
            <div className="image-container">
              <img 
                src="/images/historical/haifa-port-1948.jpg" 
                alt="נמל חיפה, 1948" 
                loading="lazy"
              />
              <p className="image-caption">
                נמל חיפה, מקום הגעתם של אלפי עולים ב-1948
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>ההגעה לחיפה</h2>
            <p>
              בנמל חיפה קידמו את פניה של מרים ואת פני הילדים שהיו בהשגחתה יהודים טובים, ביניהם יעקב כ"ץ ושלמה גרינפלד ז"ל.
              הם עמדו לימינם בקשיי הקליטה ובהתאקלמות במדינה החדשה הנאבקת על קיומה.
            </p>
            <p>
              "בנמל חיפה קידמו את פנינו יהודים טובים, ביניהם יעקב כ"ץ ושלמה גרינפלד ז"ל, כדי לעמוד לימיננו בקשיי הקליטה ובהתאקלמות.
              במדינה החדשה הנאבקת על קיומה שררה רוח התנדבות, מסירות ואהבת הזולת." - מתארת מרים את רגעי ההגעה.
            </p>
            <p>
              עם זאת, מרים מציינת שרבים מניצולי השואה שהגיעו בתקופה ההיא נתקלו ביחס של אדישות וזלזול מצד הוותיקים. 
              "לא העלו על הדעת ולא האמינו מה עבר עלינו. רובנו בחרנו להדחיק ולשכוח, אם כי היו כאלו שציפו ליחס של הבנה ואהבה" - היא מספרת.
            </p>
            
            <div className="quote-wrapper">
              {relevantQuotes.length > 0 ? (
                <Quote 
                  text={relevantQuotes[0].text}
                  source={relevantQuotes[0].source}
                  page={relevantQuotes[0].page}
                />
              ) : (
                <Quote 
                  text="בכל המצבים הקשים ביותר שהיינו בהם, תמיד היו אנשים טובים שהושיטו יד"
                  source="מרים יעקובסון, עדות בעל פה"
                  page={null}
                />
              )}
            </div>
          </section>

          <section className="chapter-section">
            <h2>מחנה 80 בפרדס חנה</h2>
            <p>
              עם הגעתם, הועברו מרים והילדים למחנה עולים בפרדס חנה, הידוע כ"מחנה 80". 
              במחנה זה שהתה מרים עם הילדים עד שכולם נקלטו במוסדות השונים ברחבי הארץ.
            </p>
            <p>
              "הגענו בערב שבת והועברנו למחנה 80 בפרדס חנה. היינו במחנה עד שהילדים נקלטו במוסדות.
              חלק מהילדים שחונכו אצל דודתי קלה ודודי יעקב שמואל היו לקרובי משפחה במהלך השנים." - מספרת מרים.
            </p>
            <p>
              בזמן שהותה במחנה, החלה מרים ליצור קשרים עם קרובי משפחתה בארץ. בשבת הראשונה שהייתה בארץ, שוחחה עם המדריכים במקום ואמרה להם שבדעתה להגיע למחרת לקרבת קרוביה בכפר פינס. 
              להפתעתה, התברר לה שהיישוב נמצא ממש בסמוך, מעבר לגבעה.
            </p>
            <p>
              במוצאי שבת אכן הגיע דודה מרדכי והדודות גרטל וצילי מכפר פינס לקחת אותה, וכך פגשה לראשונה את משפחתה בארץ.
              הם אירחו אותה בבתיהם ולימים ביקרה גם אצל קרוביה בשדה יעקב ובחפץ חיים.
            </p>
          </section>

          <section className="chapter-section">
            <h2>תחילת החיים בארץ</h2>
            <p>
              בסיום תפקידה כמלווה לילדים, עמדה מרים בפני ההחלטה היכן להתחיל את חייה בארץ ישראל.
              לאחר ביקורים אצל קרוביה בכפר פינס, שדה יעקב וחפץ חיים, החליטה להצטרף לקיבוץ חפץ חיים.
            </p>
            <p>
               "אפילו באורח החיים הפשוט והדל, הרגשתי חביבות והכנסת אורחים. גם ביקרתי את אחותי יודית, שהייתה במסגרת עליית הנוער בקיבוץ נתיבה, והתלוויתי אליה ואל חברותיה בעלייה הראשונה לירושלים בחול המועד סוכות."
            </p>
            <p>
              מרים החלה להשתלב בחיי הארץ ולהתרשם מהאווירה המיוחדת ששררה בה. למרות הקשיים והמחסור, הצטיינו החיים בארץ ישראל בתחושת חופש ובטחון, שהיו חסרים לה כל כך בשנים האחרונות באירופה.
            </p>
            <p>
              לבסוף, החליטה מרים להצטרף לקיבוץ חפץ חיים, שם החלה את דרכה כעולה חדשה ואת פרק חייה החדש בארץ ישראל.
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
                  text="אני מרגישה שבכל המצבים הזכורים לי, זכיתי להרבה חסדים ואהבה וסיעתא דשמיא"
                  source="מרים יעקובסון, מתוך 'מאפילה לאורה'"
                  page={111}
                />
              )}
            </div>
          </section>

          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default ImmigrationPage;
