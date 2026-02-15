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
 * דף פרק החיים בבלגיה
 */
const BelgiumPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relevantImages = galleryImages.filter(image =>
    image.period === 'belgium'
  );

  const relevantDocuments = historicalDocuments.filter(doc =>
    doc.id.includes('belgium') || doc.id.includes('antwerp')
  );

  const relevantQuotes = quotes.filter(quote =>
    quote.context && quote.context.includes('בלגיה')
  );

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="belgium-header-title" defaultValue="החיים בבלגיה" as="h1" />
          <EditableText contentKey="belgium-header-subtitle" defaultValue="1938-1940" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="belgium-intro-title" defaultValue="התקופה באנטוורפן" as="h2" />
                <EditableText contentKey="belgium-intro-text1" defaultValue="בעקבות האירועים של ליל הבדולח בנובמבר 1938, אביה של מרים, רפאל (אברהם) אופנהיימר, הבין שאין עוד עתיד ליהודים בגרמניה ומיהר לברוח לבלגיה." as="p" />
                <EditableText contentKey="belgium-intro-text2" defaultValue='בהמשך, סודר לבנות המשפחה - מרים ואחיותיה, מעבר הגבול באמצעות דרכון מזויף, שבו היה צורך לעשות "שינוי שם" מבן לבת כדי שיוכלו להשתמש בו.' as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="belgium-intro-image"
                  defaultSrc="/images/historical/antwerp-1930s.jpg"
                  alt="אנטוורפן בשנות ה-30"
                />
                <EditableText contentKey="belgium-intro-caption" defaultValue="אנטוורפן, בלגיה, שנות ה-30" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="belgium-community-title" defaultValue="חיי הקהילה באנטוורפן והיידה" as="h2" />
            <EditableText contentKey="belgium-community-text1" defaultValue="המשפחה התאחדה באנטוורפן, עיר שכבר אז הייתה מלאה בחיי יהדות. בעוד שאנטוורפן הייתה מוכרת בקהילה היהודית הפעילה שלה, בהיידה הסמוכה הייתה ישיבה ליטאית קטנה." as="p" />
            <EditableText contentKey="belgium-community-text2" defaultValue="מרים למדה בישיבה הליטאית בהיידה והושפעה מהסביבה היהודית החרדית שם. התקופה הזו היתה עבור המשפחה זמן של התאקלמות במקום חדש, אך גם שמירה על חיי היהדות ואורח החיים הדתי." as="p" />
            <EditableText contentKey="belgium-community-text3" defaultValue='&quot;היידה הייתה ידועה כמקום עם ישיבה ליטאית קטנה בראשותו של ר&apos; שרגא אריפש הי&quot;ד. הווי הישיבה היה עבור אבא סיבה לאהוב את המקום, וגם אנו, הבנות, הושפענו מן הסביבה והתפללנו שם בשבתות וחגים.&quot; - מספרת מרים בעדותה.' as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="belgium-community-image"
                defaultSrc="/images/historical/heida-synagogue.jpg"
                alt="בית הכנסת בהיידה"
              />
              <EditableText contentKey="belgium-community-caption" defaultValue="בית הכנסת בהיידה, בלגיה, שנות ה-30" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="belgium-invasion-title" defaultValue="הפלישה הגרמנית לבלגיה" as="h2" />
            <EditableText contentKey="belgium-invasion-text1" defaultValue="התקופה השקטה יחסית נמשכה עד מאי 1940, כאשר גרמניה הנאצית פלשה לבלגיה, הולנד ולוקסמבורג במסגרת תוכניתה לעקוף את קו מאז'ינו ולתקוף את צרפת מכיוון צפון." as="p" />
            <EditableText contentKey="belgium-invasion-text2" defaultValue="עם הפלישה, נאסר אביה של מרים כאזרח גרמני, למרות שהיה פליט יהודי שברח מגרמניה. המשפחה נאלצה לברוח מערבה בניסיון להימלט מהגרמנים המתקדמים, יחד עם מיליוני פליטים נוספים." as="p" />
            <EditableText contentKey="belgium-invasion-text3" defaultValue='&quot;בבלגיה הכבושה ניסינו ליצור קשר באמצעות סבתא אופנהיימר שנשארה בגרמניה, כי לא היו קשרי דואר בין בלגיה לצרפת. כתבתי מכתב לגרמניה שנתפס על ידי הצנזורה ודו&quot;ח חקירת הסבתא הגיע לידינו לפני כמה שנים.&quot; - מתארת מרים את המצב הקשה באותם ימים.' as="p" />
          </section>

          <section className="chapter-section">
            <EditableText contentKey="belgium-escape-title" defaultValue="הבריחה לצרפת" as="h2" />
            <EditableText contentKey="belgium-escape-text1" defaultValue="בעקבות מהירות ההתקדמות הגרמנית, הפכה המנוסה לכאוטית. יחד עם זאת, דרך חבר מלייפציג, הצליח אביה של מרים להשתחרר ממעצרו." as="p" />
            <EditableText contentKey="belgium-escape-text2" defaultValue='&quot;יום אחד הופיע גרמני ונבהלנו, עד שסיפר שהיה עצור במחנה עם אבא והעביר לנו ד&quot;ש ממנו. הוא אמר שהתרשם מאוד מאישיותו של אבא, הדתיות, הסדר, הניקיון והחריצות שלו.&quot; - מספרת מרים.' as="p" />
            <EditableText contentKey="belgium-escape-text3" defaultValue="עם שחרורו, אביה של מרים הורה למשפחה לנסות לעבור לצרפת. מרים ואחותה הקטנה עברו את הגבול באמצעות מבריחים, במסע מסוכן שהסתיים בהגעתן לליון שבצרפת, שם פגשו את אביהן. כך החל פרק חדש בחייהם." as="p" />
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="belgium-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="belgium-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
              <EditableText contentKey="belgium-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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

          <ChapterNavBar position="bottom" />
        </div>
      </div>
    </div>
  );
};

export default BelgiumPage;
