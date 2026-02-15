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
 * דף פרק החיים בצרפת תחת הכיבוש
 */
const FrancePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relevantImages = galleryImages.filter(image =>
    image.period === 'france'
  );

  const relevantDocuments = historicalDocuments.filter(doc =>
    doc.id.includes('france') || doc.id.includes('lyon')
  );

  const relevantQuotes = quotes.filter(quote =>
    quote.context && quote.context.includes('צרפת')
  );

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="france-header-title" defaultValue="צרפת תחת הכיבוש" as="h1" />
          <EditableText contentKey="france-header-subtitle" defaultValue="1940-1944" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="france-intro-title" defaultValue="הבריחה לצרפת" as="h2" />
                <EditableText contentKey="france-intro-text1" defaultValue="לאחר הפלישה הגרמנית לבלגיה במאי 1940, משפחת אופנהיימר נאלצה להימלט דרומה. מרים ואחותה הקטנה הצליחו לעבור את הגבול לצרפת בעזרת מבריחים, במסע מסוכן שכלל הליכה ברגל ונסיעה ברכבת תחת איום מתמיד." as="p" />
                <EditableText contentKey="france-intro-text2" defaultValue='&quot;מרים ואני נשארנו עזובים ומיואשים בתחנת הרכבת בכפר צרפתי. לפתע הופיע מלאך מושיע בדמות יהודייה צעירה שגילתה חמלה נוכח המראה המעורר רחמים ואת הסכנה הנשקפת לנו.&quot; - מספרת אחותה של מרים.' as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="france-intro-image"
                  defaultSrc="/images/historical/lyon-1940s.jpg"
                  alt="ליון בשנות ה-40"
                />
                <EditableText contentKey="france-intro-caption" defaultValue="ליון, צרפת, שנות ה-40" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="france-lyon-title" defaultValue="החיים בליון" as="h2" />
            <EditableText contentKey="france-lyon-text1" defaultValue="המשפחה התאחדה מחדש בליון, עיר שעדיין לא הייתה תחת שליטה ישירה של הנאצים. צרפת הייתה מחולקת אז לאזור הכיבוש הגרמני בצפון ולאזור של ממשלת וישי בדרום, שהיה כביכול &quot;עצמאי&quot; אך למעשה שיתף פעולה עם הנאצים." as="p" />
            <EditableText contentKey="france-lyon-text2" defaultValue='&quot;המשפחה חודשה לתקופה קצרה. כמובן היינו זקוקים לתעודות מזויפות, אבל בצרפת ניתן היה אז להשיג הכל עם שוחד. הכל היה כרוך בהתחכמויות, סכנות, קשרים והרבה סייעתא דשמיא.&quot; - מרים מספרת בעדותה.' as="p" />
            <EditableText contentKey="france-lyon-text3" defaultValue="למרות המצב הקשה, המשיך אביה של מרים להקפיד על שמירת מצוות וחיי יהדות. הוא אף ארגן מטבח כשר זול בתקופה של מחסור במזון, וניהל תפילות וטקסים דתיים בסתר." as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="france-lyon-image"
                defaultSrc="/images/historical/lyon-jewish-quarter.jpg"
                alt="הרובע היהודי בליון"
              />
              <EditableText contentKey="france-lyon-caption" defaultValue="הרובע היהודי בליון, צרפת, תקופת המלחמה" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="france-worsening-title" defaultValue="החמרת המצב" as="h2" />
            <EditableText contentKey="france-worsening-text1" defaultValue="בנובמבר 1942, לאחר נחיתת בעלות הברית בצפון אפריקה, כבשו הנאצים את דרום צרפת שהיה עד אז תחת שלטון וישי. כעת, המצב החמיר עבור יהודי צרפת, ובכללם משפחת אופנהיימר." as="p" />
            <EditableText contentKey="france-worsening-text2" defaultValue='&quot;בעיר נעשו &apos;ראציות&apos; (פשיטות), מעצרים ומשלוחים. אנחנו, כמו הרבה יהודים, נעלמנו מן השטח וניסינו בעזרת מבריחים בליל שלג לעבור את הגבול לשווייץ. נתפסנו, ואבא ישב חודש בבית סוהר בו היה חשש שיימסר לידי הגסטפו.&quot; - מספרת מרים.' as="p" />
            <EditableText contentKey="france-worsening-text3" defaultValue="המשפחה ברחה לדרום צרפת, לערים כמו ניצה וגרנובל, בניסיון להתחמק מהגסטפו ומתפיסה. הם החליפו מקומות מסתור לפי תנועות הגסטפו והצליחו לשרוד במשך שנים ארוכות." as="p" />
          </section>

          <section className="chapter-section">
            <EditableText contentKey="france-arrest-title" defaultValue="המעצר והגירוש" as="h2" />
            <EditableText contentKey="france-arrest-text1" defaultValue='&quot;יום אחד הגיע הצורר ויסלבוך עם שוטרים צרפתיים שקיבלו פקודה לעצור את כל היהודים במחנה שלנו. היה זה לפני פסח תש&quot;ד (מרץ 1944), חודשיים לפני פלישת הבריטים והאמריקאים לצרפת.&quot; - מתארת מרים את רגע התפנית הגורלי.' as="p" />
            <EditableText contentKey="france-arrest-text2" defaultValue="מרים ואביה נתפסו על ידי הגסטפו והועברו למעצר, בעוד שאמה ואחיותיה הצליחו להסתתר. הם הועברו למחנה דרנסי ליד פריז, שהיה מחנה מעבר ממנו יצאו משלוחים למזרח." as="p" />
            <EditableText contentKey="france-arrest-text3" defaultValue='&quot;במחנה דרנסי, למרות כל הקשיים, המשיך אבא לדאוג למצוות הפסח. לא חלמנו על מצות, אבל אבא הכשיר כלים והמיר את מנות הלחם בתפוחי אדמה.&quot; - מספרת מרים על הימים האחרונים לפני הגירוש.' as="p" />
            <EditableText contentKey="france-arrest-text4" defaultValue="במוצאי חג הפסח, הועלו מרים ואביה לקרונות בקר חתומים בדרכם למזרח. הם לא ידעו אז, אבל יעדם היה מחנה ההשמדה אושוויץ-בירקנאו." as="p" />
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="france-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="france-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
              <EditableText contentKey="france-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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

export default FrancePage;
