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
 * דף פרק העלייה לישראל
 */
const ImmigrationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relevantImages = galleryImages.filter(image =>
    image.period === 'immigration'
  );

  const relevantDocuments = historicalDocuments.filter(doc =>
    doc.id === 'israel-certificate' || doc.id.includes('immigration')
  );

  const relevantQuotes = quotes.filter(quote =>
    quote.context && quote.context.includes('העלייה לארץ')
  );

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="immigration-header-title" defaultValue="העלייה לישראל" as="h1" />
          <EditableText contentKey="immigration-header-subtitle" defaultValue="1948-1949" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="immigration-intro-title" defaultValue="ההחלטה לעלות לארץ ישראל" as="h2" />
                <EditableText contentKey="immigration-intro-text1" defaultValue='לאחר תקופת השיקום בליון, פעלה מרים יחד עם שליחים מארץ ישראל במוסד "חלוצי יהודה" שטיפל בילדים שניצלו מהשואה. במסגרת עבודתה זו התחזק הקשר שלה עם ארץ ישראל, והתעורר בה הרצון לעלות ארצה ולבנות בה את חייה מחדש.' as="p" />
                <EditableText contentKey="immigration-intro-text2" defaultValue='&quot;שליחים מארץ ישראל פעלו במוסד כיועצים, מורים ומדריכים. החירות והתושייה שלהם עודדו אותי לעלות לארץ ישראל&quot; - מספרת מרים על התקופה שקדמה לעלייתה.' as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="immigration-intro-image"
                  defaultSrc="/images/historical/immigration-ship.jpg"
                  alt="אוניית עולים בדרכה לארץ ישראל, 1948"
                />
                <EditableText contentKey="immigration-intro-caption" defaultValue="אוניית עולים בדרכה לארץ ישראל, 1948" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="immigration-journey-title" defaultValue="המסע לארץ ישראל" as="h2" />
            <EditableText contentKey="immigration-journey-text1" defaultValue='באפריל 1948, ערב הקמת המדינה, הפליגה מרים מנמל מרסיי בצרפת יחד עם קבוצה של כ-40 ילדים שהיו מיועדים להיקלט במוסדות פועלי אגודת ישראל (פא"י) בארץ. לנוכח מאבק השחרור היה אז הסגר חלקי על הארץ.' as="p" />
            <EditableText contentKey="immigration-journey-text2" defaultValue='&quot;הפלגנו ממרסיי ונדחקנו באוניה רעועה, 10 ימים עם מחלת ים, עד שהגענו לחיפה... האוניה הייתה ישראלית והופעתם הבטוחה והנמרצת של המלחים, המפקדים והמורים הישראלים הרשימו אותי ואת חברותי, גבלינה ופאני, שהיו איתי בתפקיד מלוות הילדים&quot; - מתארת מרים את המסע הימי.' as="p" />
            <EditableText contentKey="immigration-journey-text3" defaultValue="ההפלגה הייתה מאתגרת, אך מלאת תקווה. זו הייתה הפעם הראשונה שמרים נשמה את אוויר החופש האמיתי לאחר שנים ארוכות של פחד, רדיפות וסבל." as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="immigration-journey-image"
                defaultSrc="/images/historical/haifa-port-1948.jpg"
                alt="נמל חיפה, 1948"
              />
              <EditableText contentKey="immigration-journey-caption" defaultValue="נמל חיפה, מקום הגעתם של אלפי עולים ב-1948" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="immigration-haifa-title" defaultValue="ההגעה לחיפה" as="h2" />
            <EditableText contentKey="immigration-haifa-text1" defaultValue='בנמל חיפה קידמו את פניה של מרים ואת פני הילדים שהיו בהשגחתה יהודים טובים, ביניהם יעקב כ"ץ ושלמה גרינפלד ז"ל. הם עמדו לימינם בקשיי הקליטה ובהתאקלמות במדינה החדשה הנאבקת על קיומה.' as="p" />
            <EditableText contentKey="immigration-haifa-text2" defaultValue='&quot;בנמל חיפה קידמו את פנינו יהודים טובים, ביניהם יעקב כ&quot;ץ ושלמה גרינפלד ז&quot;ל, כדי לעמוד לימיננו בקשיי הקליטה ובהתאקלמות. במדינה החדשה הנאבקת על קיומה שררה רוח התנדבות, מסירות ואהבת הזולת.&quot; - מתארת מרים את רגעי ההגעה.' as="p" />
            <EditableText contentKey="immigration-haifa-text3" defaultValue='עם זאת, מרים מציינת שרבים מניצולי השואה שהגיעו בתקופה ההיא נתקלו ביחס של אדישות וזלזול מצד הוותיקים. "לא העלו על הדעת ולא האמינו מה עבר עלינו. רובנו בחרנו להדחיק ולשכוח, אם כי היו כאלו שציפו ליחס של הבנה ואהבה" - היא מספרת.' as="p" />

            <div className="quote-wrapper">
              <EditableText contentKey="immigration-haifa-quote" defaultValue="בכל המצבים הקשים ביותר שהיינו בהם, תמיד היו אנשים טובים שהושיטו יד" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="immigration-camp-title" defaultValue="מחנה 80 בפרדס חנה" as="h2" />
            <EditableText contentKey="immigration-camp-text1" defaultValue='עם הגעתם, הועברו מרים והילדים למחנה עולים בפרדס חנה, הידוע כ"מחנה 80". במחנה זה שהתה מרים עם הילדים עד שכולם נקלטו במוסדות השונים ברחבי הארץ.' as="p" />
            <EditableText contentKey="immigration-camp-text2" defaultValue='&quot;הגענו בערב שבת והועברנו למחנה 80 בפרדס חנה. היינו במחנה עד שהילדים נקלטו במוסדות. חלק מהילדים שחונכו אצל דודתי קלה ודודי יעקב שמואל היו לקרובי משפחה במהלך השנים.&quot; - מספרת מרים.' as="p" />
            <EditableText contentKey="immigration-camp-text3" defaultValue="בזמן שהותה במחנה, החלה מרים ליצור קשרים עם קרובי משפחתה בארץ. בשבת הראשונה שהייתה בארץ, שוחחה עם המדריכים במקום ואמרה להם שבדעתה להגיע למחרת לקרבת קרוביה בכפר פינס. להפתעתה, התברר לה שהיישוב נמצא ממש בסמוך, מעבר לגבעה." as="p" />
            <EditableText contentKey="immigration-camp-text4" defaultValue="במוצאי שבת אכן הגיע דודה מרדכי והדודות גרטל וצילי מכפר פינס לקחת אותה, וכך פגשה לראשונה את משפחתה בארץ. הם אירחו אותה בבתיהם ולימים ביקרה גם אצל קרוביה בשדה יעקב ובחפץ חיים." as="p" />
          </section>

          <section className="chapter-section">
            <EditableText contentKey="immigration-start-title" defaultValue="תחילת החיים בארץ" as="h2" />
            <EditableText contentKey="immigration-start-text1" defaultValue="בסיום תפקידה כמלווה לילדים, עמדה מרים בפני ההחלטה היכן להתחיל את חייה בארץ ישראל. לאחר ביקורים אצל קרוביה בכפר פינס, שדה יעקב וחפץ חיים, החליטה להצטרף לקיבוץ חפץ חיים." as="p" />
            <EditableText contentKey="immigration-start-text2" defaultValue='&quot;אפילו באורח החיים הפשוט והדל, הרגשתי חביבות והכנסת אורחים. גם ביקרתי את אחותי יודית, שהייתה במסגרת עליית הנוער בקיבוץ נתיבה, והתלוויתי אליה ואל חברותיה בעלייה הראשונה לירושלים בחול המועד סוכות.&quot;' as="p" />
            <EditableText contentKey="immigration-start-text3" defaultValue="מרים החלה להשתלב בחיי הארץ ולהתרשם מהאווירה המיוחדת ששררה בה. למרות הקשיים והמחסור, הצטיינו החיים בארץ ישראל בתחושת חופש ובטחון, שהיו חסרים לה כל כך בשנים האחרונות באירופה." as="p" />
            <EditableText contentKey="immigration-start-text4" defaultValue="לבסוף, החליטה מרים להצטרף לקיבוץ חפץ חיים, שם החלה את דרכה כעולה חדשה ואת פרק חייה החדש בארץ ישראל." as="p" />
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="immigration-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="immigration-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
            <EditableText contentKey="immigration-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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
