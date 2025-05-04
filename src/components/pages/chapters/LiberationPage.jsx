import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';

/**
 * דף פרק השחרור והחזרה לליון
 */
const LiberationPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'liberation'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id.includes('liberation') || doc.id.includes('reference-card')
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("תמיד היו אנשים טובים"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>השחרור והחזרה לליון</h1>
          <p className="subtitle">1945-1948</p>
        </div>
      </header>

      <div className="container">
        <div className="chapter-navigation">
          <Link to="/" className="nav-back">חזרה לדף הבית</Link>
          <div className="chapter-pagination">
            <span className="chapter-number">פרק 5 מתוך 7</span>
            <div>
              <span className="pagination-text">פרק קודם: </span>
              <Link to="/chapters/holocaust" className="pagination-link">בעמק הבכא</Link>
            </div>
            <div>
              <span className="pagination-text">פרק הבא: </span>
              <Link to="/chapters/immigration" className="pagination-link">העלייה לישראל</Link>
            </div>
          </div>
        </div>

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>רגע השחרור</h2>
                <p>
                  בתחילת מאי 1945, בימים האחרונים של המלחמה באירופה, שהתה מרים במחנה ניישטדט-גלווה בצפון גרמניה.
                  במפתיע, ב-2 במאי 1945, נעלמו כל השומרים הנאצים, כאילו בלעה אותם האדמה.
                </p>
                <p>
                  "בוקר אחד בתחילת מאי נעלמו כל השומרים ואנשי הס.ס. הסובייטים הגיעו ומצאו מהגרמנים רק מדים שהוחלפו בחופזה."
                </p>
              </div>
              <div className="chapter-intro-image">
                <img 
                  src="/images/historical/liberation-day.jpg" 
                  alt="רגע השחרור, מאי 1945" 
                  loading="lazy"
                />
                <p className="image-caption">אסירים משוחררים מקבלים את פני החיילים הסובייטים, מאי 1945</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>החופש הראשון</h2>
            <p>
              החיילים הסובייטים שחררו את מרים ואת שאר האסירים ב-2 במאי 1945. למרות השחרור, עדיין היה פחד גם מהחיילים הרוסים.
              מרים וחברותיה החליטו לא להישאר במקום ופנו מערבה בחיפוש אחר הכוחות האמריקאים.
            </p>
            <p>
              "הרחובות היו שוממים. האוכלוסייה פחדה מנקם האסירים המשוחררים ובעיקר מהחיילים הרוסים.
              הגענו לווילה של גרמנים שהתחבאו בקרבת מקום מפחד. התפלחנו לבית וראינו סימני עזיבה חפוזה."
            </p>
            <p>
              בבית הגרמני מצאו מרים וחברותיה בגדים נקיים ואוכל. כשעזבו את הבית, נשמעו אחריהן קללות והושלכה עליהן חבילה.
              סבל המיליונים לא נגע ולא הפריע לאוכלוסייה הגרמנית, שהמשיכה בחייה גם בימים האחרונים למלחמה.
            </p>
            
            <div className="image-container">
              <img 
                src="/images/historical/displaced-persons.jpg" 
                alt="פליטים ומשוחררים אחרי המלחמה" 
                loading="lazy"
              />
              <p className="image-caption">
                פליטים ועקורים לאחר השחרור, 1945
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>בדרך חזרה לליון</h2>
            <p>
              חברה מצרפת הציעה למרים לחזור איתה לצרפת. לאחר מנוחה והצטיידות במחנה, הם יצאו מערבה אל האמריקאים.
              עם כניעת גרמניה ב-9 במאי 1945, הקימו האמריקאים מנגנון סיוע לפליטים, ומרים וחברתה קיבלו אישור לחזור לצרפת.
            </p>
            <p>
              "אדית שטרן, שהכרתי עוד מפריז, עזרה לי עם חוש התמצאות בריא לעבור את המכשולים בדרך.
              היתה לנו הקלה כשהגענו אל קווי הבריטים והאמריקאים לקבל אישורי מעבר וכרטיסי נסיעה."
            </p>
            <p>
              מרים הציגה עצמה כצרפתייה שמגיע לה לחזור למולדתה. עם עזרת חיילים אמריקאים, השיגו מסמכים והגיעו לפריז ומשם לליון, 
              לחפש את שרידי משפחתה.
            </p>
          </section>

          <section className="chapter-section">
            <h2>המפגש המחודש עם המשפחה</h2>
            <p>
              מרים הגיעה לליון ב-24 במאי 1945, בשעות הבוקר המוקדמות. היא חיפשה את קרוביה ומצאה את אחותה קלה, 
              שהתחתנה זמן קצר קודם לכן עם יעקב סמואל.
            </p>
            <p>
              "הגעתי לביתה של קלה וז'ק בשעות הבוקר המוקדמות. הפתעתי את אחותי שלא שמעה ממני יותר משנה. 
              אחרי שזיהתה אותי, רזה, בבגדים 'אופנתיים', נפלנו זו על צוואר זו ובכינו."
            </p>
            <p>
              התברר שאביה של מרים לא חזר "עדיין", אך היא קיבלה את הבשורה הקשה שאמה נפטרה שלושה שבועות לפני חג הפסח.
              מרים קיבלה את האבל על אמה והתאחדה עם אחיותיה ששרדו, אסתר וקלה.
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
            <h2>עבודה עם ילדים ניצולים</h2>
            <p>
              מרים השתקמה בחום ובאהבה במשפחת סמואל. היא החלה לעבוד יחד עם משפחת סמואל בקליטת ילדים יהודים
              יתומים והצלתם מהמנזרים. בהמשך, עבדה גם בחינוך וסיוע לילדים שהתייתמו במלחמה.
            </p>
            <p>
              "נקלטתי בחום ואהבה במשפחת סמואל, אליהם הצטרפו גם בני משפחה אחרים ששרדו. לאט-לאט התאוששתי ונגמלתי גם מהרגלים 
              ודיבורים של חיי המחנה שנדבקו בי בעל כורחי."
            </p>
            <p>
              החיים בליון בשנים 1945 עד 1948 היו תקופת שיקום והתאוששות. מרים חזרה לחיים נורמליים ובמקביל סייעה 
              בטיפול בילדים יתומים ששרדו את השואה, תוך חיפוש שרידי משפחות והכנה לעלייה ארצה.
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

          <div className="chapter-navigation bottom">
            <Link to="/" className="nav-back">חזרה לדף הבית</Link>
            <div className="chapter-pagination">
              <span className="chapter-number">פרק 5 מתוך 7</span>
              <div>
                <span className="pagination-text">פרק קודם: </span>
                <Link to="/chapters/holocaust" className="pagination-link">בעמק הבכא</Link>
              </div>
              <div>
                <span className="pagination-text">פרק הבא: </span>
                <Link to="/chapters/immigration" className="pagination-link">העלייה לישראל</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiberationPage;
