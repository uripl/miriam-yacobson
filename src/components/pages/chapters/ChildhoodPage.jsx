import React, { useEffect } from 'react';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import PlaceholderImage from '../../common/PlaceholderImage';
import ChapterNavBar from '../../common/ChapterNavBar';
import { quotes, galleryImages, historicalDocuments } from '../../../data/timelineData';
import '../../../styles/ChapterPage.css';

/**
 * דף פרק הילדות בגרמניה
 */
const ChildhoodPage = () => {
  // גלילה לראש הדף בטעינה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // סינון תמונות רלוונטיות לפרק זה
  const relevantImages = galleryImages.filter(image => 
    image.period === 'childhood'
  );
  
  // סינון מסמכים רלוונטיים לפרק זה
  const relevantDocuments = historicalDocuments.filter(doc => 
    doc.id === 'reference-card-1' || doc.id === 'leipzig-certificate'
  );
  
  // ציטוטים רלוונטיים לפרק זה
  const relevantQuotes = [quotes[0], quotes[5]];

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <h1>ילדות וצעירות בגרמניה</h1>
          <p className="subtitle">לייפציג 1925-1938</p>
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <h2>שנות הילדות בצל השינויים</h2>
                <p>
                  מרים אופנהיימר נולדה ב־ז׳ מרחשוון ה׳תרפ״ה (24 באוקטובר 1925) 
                  בעיר לייפציג, שבמרכז גרמניה. ילדותה החלה בבית יהודי חם ואוהב, 
                  בקהילה יהודית פעילה, אך הפכה מורכבת יותר עם עליית הנאצים לשלטון.
                </p>
              </div>
              <div className="chapter-intro-image">
                <PlaceholderImage 
                  src="/images/historical/leipzig-view.jpg" 
                  alt="מראה העיר לייפציג, שנות ה-20" 
                  category="childhood"
                  loading="lazy"
                />
                <p className="image-caption">מראה העיר לייפציג, שנות ה-20</p>
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <h2>משפחת אופנהיימר בלייפציג</h2>
            <p>
              אביה של מרים, ר׳ אברהם (רפאל) אופנהיימר הי״ד, היה הבכור מבין 15 אחים ואחיות. 
              המשפחה המורחבת של האב הייתה ממוקמת במרקטברייט שבדרום גרמניה, במרחק של כ-300 ק"מ מלייפציג. 
              מרים נהנתה לבקר שם והיו נוצרים קשרי אהבה בינה לבין הסבתא ה"חורגת" והדודים והדודות שהיו צעירים כמוה.
            </p>
            <p>
              אמה של מרים, מטל לבית אטלינגר ע"ה, הייתה השנייה משלוש אחיות, שנולדו בעיירה מיכלפלד שבגרמניה הדרומית. 
              אביה של מרים עבד כסוכן מכירות של יינות, תפקיד שדרש ממנו נסיעות רבות. 
              למרות זאת, הוא הקפיד על שמירת מצוות גם בתנאים הקשים של החזית בזמן מלחמת העולם הראשונה, בה שירת כחייל גרמני.
            </p>
            <p>
              הבית בלייפציג היה בית יהודי חם ופתוח לאורחים. מרים גדלה יחד עם אחיותיה הצעירות, אסתר וקלה. 
              משפחתה הייתה מוכרת בקהילה בשל מעורבותה בחיי הקהילה היהודית והקפדתה על אורח חיים דתי.
            </p>
            
            <div className="image-container">
              <PlaceholderImage 
                src="/images/family/leipzig-family.jpg" 
                alt="משפחת אופנהיימר בלייפציג" 
                category="childhood"
                loading="lazy"
              />
              <p className="image-caption">
                משפחת אופנהיימר בלייפציג, שנות ה-30. מימין: מטל (האם), מרים, אסתר וקלה
              </p>
            </div>
          </section>

          <section className="chapter-section">
            <h2>חיי הקהילה היהודית בלייפציג</h2>
            <p>
              לייפציג הייתה ידועה כמרכז מסחרי חשוב, וסוחרים יהודים רבים מרחבי אירופה הגיעו אליה מדי שנה.
              הקהילה היהודית בלייפציג הייתה קהילה גדולה ומפוארת, עם מוסדות חינוך, בתי כנסת ופעילות תרבותית ענפה.
            </p>
            <p>
              מרים למדה בבית ספר יהודי בעיר, שם רכשה את חינוכה היהודי והכללי. 
              בבית הספר התחנכו ילדים יהודים מבתים שונים, חלקם ממשפחות אדוקות וחלקם ממשפחות פחות דתיות.
              בנוסף לחינוך הפורמלי, אביה של מרים דאג להביא "מלמד" הביתה כדי להעשיר את ידיעות בנותיו בתורה.
            </p>
            <p>
              למרות שהיה קיים בית כנסת מפואר של הקהילה היהודית בלייפציג, אביה של מרים העדיף להתפלל בבית הכנסת 
              של יהודי מזרח אירופה, שם הרגיש נוח יותר עם אווירת התפילה והמנהגים.
            </p>
            
            <div className="quote-wrapper">
              <Quote 
                text={quotes[5].text}
                source={quotes[5].source}
                page={quotes[5].page}
              />
            </div>
          </section>

          <section className="chapter-section">
            <h2>עליית הנאצים והשינוי בחיים</h2>
            <p>
              בשנת 1933, עם עליית הנאצים לשלטון, השתנו חייהם של יהודי גרמניה באופן דרמטי. 
              בתחילה, משפחת אופנהיימר ניסתה להתמודד עם השינויים בגרמניה על ידי מעבר זמני לשווייץ, 
              אך נאלצה לחזור ללייפציג כיוון שאזרחים זרים לא הורשו לעבוד שם וכספם אזל.
            </p>
            <p>
              בחזרתם לגרמניה, מצאו שחיי היהודים הפכו קשים יותר ויותר. מגבלות הלכו והתרבו, 
              והמשפחה נאלצה לעזוב את ביתם ולעבור לבית אחר שהיה בבעלות יהודית.
            </p>
            <p>
              בנובמבר 1938, לאחר "ליל הבדולח" הנורא, בו הוצתו והושחתו בתי כנסת, עסקים ובתים יהודיים 
              ברחבי גרמניה, הבין אביה של מרים שאין עוד תקווה לחיים בטוחים בגרמניה. 
              הוא החליט לברוח לבלגיה, יצא ראשון, ולאחר מכן סודר עבור מרים ואחיותיה מעבר הגבול 
              באמצעות דרכון מזויף, שבו היה צורך לעשות "שינוי שם" מבן לבת.
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

          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default ChildhoodPage;
