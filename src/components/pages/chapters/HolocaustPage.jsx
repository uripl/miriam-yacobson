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
 * דף פרק השואה - בעמק הבכא
 */
const HolocaustPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relevantImages = galleryImages.filter(image =>
    image.period === 'holocaust'
  );

  const relevantDocuments = historicalDocuments.filter(doc =>
    doc.id.includes('auschwitz') || doc.id.includes('holocaust')
  );

  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("הם לא ניצחו אותנו")),
    quotes.find(quote => quote.text.includes("גם בתופת זו"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="holocaust-header-title" defaultValue="בעמק הבכא" as="h1" />
          <EditableText contentKey="holocaust-header-subtitle" defaultValue="1944-1945" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="holocaust-intro-title" defaultValue="הגירוש לאושוויץ" as="h2" />
                <EditableText contentKey="holocaust-intro-text1" defaultValue="לאחר מעצרם על ידי הגסטפו במרץ 1944, הועברו מרים ואביה למחנה המעבר דרנסי ליד פריז. לאחר כשבועיים במחנה, במוצאי חג הפסח, הועלו על רכבת מזרחה - אל המקום ששמו לא נודע להם אז: מחנה ההשמדה אושוויץ-בירקנאו." as="p" />
                <EditableText contentKey="holocaust-intro-text2" defaultValue='&quot;הוכנסנו לקרונות משא סגורים ללא חלונות ואפשרות לשכב. הרכבת נסעה מזרחה ימים שלמים, והתנאים בקרון היו בלתי אנושיים - אחד דלי שירותים ל-80 איש שהצטופפו בקרון.&quot;' as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="holocaust-intro-image"
                  defaultSrc="/images/historical/auschwitz-arrival.jpg"
                  alt="הגעה לאושוויץ"
                />
                <EditableText contentKey="holocaust-intro-caption" defaultValue="הגעת משלוח יהודים לאושוויץ, 1944" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="holocaust-selection-title" defaultValue="הסלקציה והפרידה" as="h2" />
            <EditableText contentKey="holocaust-selection-text1" defaultValue="באפריל 1944, הגיעו מרים ואביה לאושוויץ. על רציף הרכבת התבצעה הסלקציה הראשונה - הפרדה בין גברים לנשים, ובין אלו שנשלחו ישירות לתאי הגזים לבין אלו שנבחרו לעבודה." as="p" />
            <EditableText contentKey="holocaust-selection-text2" defaultValue='&quot;אחרי הסלקציה לא ראיתי יותר את אבא, אף על אף ששמעתי שמישהו ראה אותו אחר כך. ימים רבים ציפינו שעוד יחזור.&quot; - מספרת מרים בכאב על הפרידה מאביה, שלא שרד את המחנה.' as="p" />
            <EditableText contentKey="holocaust-selection-text3" defaultValue="לאחר הסלקציה, עברה מרים תהליך של השפלה שיטתית - גילוח ראשה, הסרת כל פריטי לבוש אישיים, וקבלת תלבושת אסירה. היא הוכנסה לבלוק צפוף עם מאות נשים אחרות." as="p" />

            <div className="quote-wrapper">
              <EditableText contentKey="holocaust-selection-quote" defaultValue="ירוי במחנות: הם לא ניצחו אותנו, אנחנו ניצחנו אותם" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="holocaust-camp-title" defaultValue="החיים במחנה" as="h2" />
            <EditableText contentKey="holocaust-camp-text1" defaultValue="מרים עבדה במחנה במיון בגדים של הנרצחים. דרך עבודה זו, ראתה את היקף הזוועה באופן ישיר, אך גם מצאה דרכים קטנות להציל את נפשה בתנאים הקשים." as="p" />
            <EditableText contentKey="holocaust-camp-text2" defaultValue='&quot;בחורף, כשלא היה אוכל כי אם שלג בשפע, למדתי ממנה שבלי אוכל אין גוף. חברה אחרת, גם היא מצ&apos;כיה, לא חדלה גם במצבים קשים ומדכאים מלומר: &apos;בבקשה, סליחה ותודה&apos; ושמרה על סימונים גם כשהיכו אותה עבור זה.&quot; - מתארת מרים את הרוח האנושית שנשמרה במחנה.' as="p" />
            <EditableText contentKey="holocaust-camp-text3" defaultValue="בחנוכה 1944, מתארת מרים כיצד הדליקו נר חנוכה ממרגרינה שחסכו וקיימו מצוות פרסומי ניסא ללא הסתרה, בתוך הבלוק. אור הנר האיר בפירצ וסימל את התקווה שלא כבתה." as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="holocaust-camp-image"
                defaultSrc="/images/historical/auschwitz-women.jpg"
                alt="נשים אסירות באושוויץ"
              />
              <EditableText contentKey="holocaust-camp-caption" defaultValue="נשים אסירות במחנה אושוויץ, 1944" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="holocaust-march-title" defaultValue="צעדת המוות" as="h2" />
            <EditableText contentKey="holocaust-march-text1" defaultValue="בינואר 1945, עם התקרבות הצבא הסובייטי לאושוויץ, החלו הנאצים לפנות את המחנה ולהצעיד את האסירים מערבה, אל תוך גרמניה." as="p" />
            <EditableText contentKey="holocaust-march-text2" defaultValue='&quot;צעדנו עשרות ומאות קילומטרים בשורות של שישה, ואוי לה למי שנחלשה או פיגרה. שומרים ליוו אותנו משני הצדדים עם הוראה לירות. בחלק מהדרך נסענו ברכבת על קרונות משא פתוחים בלילות קפואים.&quot; - מתארת מרים את המסע המפרך.' as="p" />
            <EditableText contentKey="holocaust-march-text3" defaultValue="מרים שרדה את צעדת המוות הנוראה, והגיעה למחנה הריכוז רוונסבריק בגרמניה. משם הועברה למחנה ניישטדט-גלווה שבצפון גרמניה." as="p" />
          </section>

          <section className="chapter-section">
            <EditableText contentKey="holocaust-waiting-title" defaultValue="בציפייה לשחרור" as="h2" />
            <EditableText contentKey="holocaust-waiting-text1" defaultValue="בפברואר-אפריל 1945, עם התקדמות הכוחות של בעלות הברית לתוך גרמניה מכל החזיתות, התקווה לשחרור קרוב הלכה וגברה בקרב האסירים." as="p" />
            <EditableText contentKey="holocaust-waiting-text2" defaultValue='&quot;בהתקרב החזית הרוסית, החלו להרוס את הקרמטוריום. חילה לחשה לנו: &apos;אם אני, שעבדו אותי בהקמת הכבשן, זוכה לראות בהריסתו, סימן שהגאולה קרבה&apos;.&quot;' as="p" />
            <EditableText contentKey="holocaust-waiting-text3" defaultValue="בימים האחרונים לפני השחרור, כשהגרמנים כבר ידעו שהקץ קרב, הייתה תחושת סכנה נוספת באוויר - החשש שהנאצים ינסו להשמיד את כל העדים לפשעיהם לפני נסיגתם. אולם, ב-18 בינואר, הגרמנים ריכזו את האסירים ליום הקודם ליציאה לצעדת מוות נוספת, אך מרים שרדה גם אותה." as="p" />
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="holocaust-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="holocaust-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
            <EditableText contentKey="holocaust-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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

export default HolocaustPage;
