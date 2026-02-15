import React, { useEffect } from 'react';
import Quote from '../../common/Quote';
import ImageGallery from '../../common/ImageGallery';
import DocumentPreview from '../../common/DocumentPreview';
import ChapterNavBar from '../../common/ChapterNavBar';
import EditableText from '../../editable/EditableText';
import EditableImage from '../../editable/EditableImage';
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
          <EditableText contentKey="childhood-header-title" defaultValue="ילדות וצעירות בגרמניה" as="h1" />
          <EditableText contentKey="childhood-header-subtitle" defaultValue="לייפציג 1925-1938" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="childhood-intro-title" defaultValue="שנות הילדות בצל השינויים" as="h2" />
                <EditableText contentKey="childhood-intro-text" defaultValue="מרים אופנהיימר נולדה ב־ז׳ מרחשוון ה׳תרפ״ה (24 באוקטובר 1925) בעיר לייפציג, שבמרכז גרמניה. ילדותה החלה בבית יהודי חם ואוהב, בקהילה יהודית פעילה, אך הפכה מורכבת יותר עם עליית הנאצים לשלטון." as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="childhood-intro-image"
                  defaultSrc="/images/historical/leipzig-view.jpg"
                  alt="מראה העיר לייפציג, שנות ה-20"
                />
                <EditableText contentKey="childhood-intro-caption" defaultValue="מראה העיר לייפציג, שנות ה-20" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="childhood-family-title" defaultValue="משפחת אופנהיימר בלייפציג" as="h2" />
            <EditableText contentKey="childhood-family-text1" defaultValue="אביה של מרים, ר׳ אברהם (רפאל) אופנהיימר הי״ד, היה הבכור מבין 15 אחים ואחיות. המשפחה המורחבת של האב הייתה ממוקמת במרקטברייט שבדרום גרמניה, במרחק של כ-300 ק&quot;מ מלייפציג. מרים נהנתה לבקר שם והיו נוצרים קשרי אהבה בינה לבין הסבתא ה&quot;חורגת&quot; והדודים והדודות שהיו צעירים כמוה." as="p" />
            <EditableText contentKey="childhood-family-text2" defaultValue='אמה של מרים, מטל לבית אטלינגר ע"ה, הייתה השנייה משלוש אחיות, שנולדו בעיירה מיכלפלד שבגרמניה הדרומית. אביה של מרים עבד כסוכן מכירות של יינות, תפקיד שדרש ממנו נסיעות רבות. למרות זאת, הוא הקפיד על שמירת מצוות גם בתנאים הקשים של החזית בזמן מלחמת העולם הראשונה, בה שירת כחייל גרמני.' as="p" />
            <EditableText contentKey="childhood-family-text3" defaultValue="הבית בלייפציג היה בית יהודי חם ופתוח לאורחים. מרים גדלה יחד עם אחיותיה הצעירות, אסתר וקלה. משפחתה הייתה מוכרת בקהילה בשל מעורבותה בחיי הקהילה היהודית והקפדתה על אורח חיים דתי." as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="childhood-family-image"
                defaultSrc="/images/family/leipzig-family.jpg"
                alt="משפחת אופנהיימר בלייפציג"
              />
              <EditableText contentKey="childhood-family-caption" defaultValue="משפחת אופנהיימר בלייפציג, שנות ה-30. מימין: מטל (האם), מרים, אסתר וקלה" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="childhood-community-title" defaultValue="חיי הקהילה היהודית בלייפציג" as="h2" />
            <EditableText contentKey="childhood-community-text1" defaultValue="לייפציג הייתה ידועה כמרכז מסחרי חשוב, וסוחרים יהודים רבים מרחבי אירופה הגיעו אליה מדי שנה. הקהילה היהודית בלייפציג הייתה קהילה גדולה ומפוארת, עם מוסדות חינוך, בתי כנסת ופעילות תרבותית ענפה." as="p" />
            <EditableText contentKey="childhood-community-text2" defaultValue='מרים למדה בבית ספר יהודי בעיר, שם רכשה את חינוכה היהודי והכללי. בבית הספר התחנכו ילדים יהודים מבתים שונים, חלקם ממשפחות אדוקות וחלקם ממשפחות פחות דתיות. בנוסף לחינוך הפורמלי, אביה של מרים דאג להביא "מלמד" הביתה כדי להעשיר את ידיעות בנותיו בתורה.' as="p" />
            <EditableText contentKey="childhood-community-text3" defaultValue="למרות שהיה קיים בית כנסת מפואר של הקהילה היהודית בלייפציג, אביה של מרים העדיף להתפלל בבית הכנסת של יהודי מזרח אירופה, שם הרגיש נוח יותר עם אווירת התפילה והמנהגים." as="p" />

            <div className="quote-wrapper">
              <EditableText contentKey="childhood-community-quote" defaultValue={quotes[5].text} as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="childhood-nazis-title" defaultValue="עליית הנאצים והשינוי בחיים" as="h2" />
            <EditableText contentKey="childhood-nazis-text1" defaultValue="בשנת 1933, עם עליית הנאצים לשלטון, השתנו חייהם של יהודי גרמניה באופן דרמטי. בתחילה, משפחת אופנהיימר ניסתה להתמודד עם השינויים בגרמניה על ידי מעבר זמני לשווייץ, אך נאלצה לחזור ללייפציג כיוון שאזרחים זרים לא הורשו לעבוד שם וכספם אזל." as="p" />
            <EditableText contentKey="childhood-nazis-text2" defaultValue="בחזרתם לגרמניה, מצאו שחיי היהודים הפכו קשים יותר ויותר. מגבלות הלכו והתרבו, והמשפחה נאלצה לעזוב את ביתם ולעבור לבית אחר שהיה בבעלות יהודית." as="p" />
            <EditableText contentKey="childhood-nazis-text3" defaultValue='בנובמבר 1938, לאחר "ליל הבדולח" הנורא, בו הוצתו והושחתו בתי כנסת, עסקים ובתים יהודיים ברחבי גרמניה, הבין אביה של מרים שאין עוד תקווה לחיים בטוחים בגרמניה. הוא החליט לברוח לבלגיה, יצא ראשון, ולאחר מכן סודר עבור מרים ואחיותיה מעבר הגבול באמצעות דרכון מזויף, שבו היה צורך לעשות "שינוי שם" מבן לבת.' as="p" />
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="childhood-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="childhood-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
            <EditableText contentKey="childhood-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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
