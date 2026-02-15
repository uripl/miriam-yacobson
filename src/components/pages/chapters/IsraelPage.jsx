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
 * דף פרק החיים בארץ ישראל
 */
const IsraelPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relevantImages = galleryImages.filter(image =>
    image.period === 'life-in-israel'
  );

  const relevantDocuments = historicalDocuments.filter(doc =>
    doc.id === 'hefetz-haim-record' || doc.id === 'letter-1955'
  );

  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("זוהי נקמתנו")),
    quotes.find(quote => quote.text.includes("אם אני סוקרת"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="israel-header-title" defaultValue="חיים בארץ ישראל" as="h1" />
          <EditableText contentKey="israel-header-subtitle" defaultValue="1949-2023" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="israel-intro-title" defaultValue="ראשית הדרך בקיבוץ חפץ חיים" as="h2" />
                <EditableText contentKey="israel-intro-text1" defaultValue="לאחר הגעתה לארץ והתרשמותה מהמקומות השונים, בחרה מרים להצטרף לקיבוץ חפץ חיים. בקיבוץ החלה לבנות את חייה החדשים ולהשתלב בחברה הישראלית המתהווה." as="p" />
                <EditableText contentKey="israel-intro-text2" defaultValue='&quot;הצטרפתי לקיבוץ, נקלטתי די מהר, כי בשלה הייתי לנסות שוב ברצון ובחשק. עבדתי מתוך חברות במקום העבודה ובקשר עם אנשים. חייתי חיים מלאים ופעילים בחברה&quot; - מספרת מרים על ראשית דרכה בקיבוץ.' as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="israel-intro-image"
                  defaultSrc="/images/historical/hefetz-haim-1950.jpg"
                  alt="קיבוץ חפץ חיים, 1950"
                />
                <EditableText contentKey="israel-intro-caption" defaultValue="קיבוץ חפץ חיים, 1950" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="israel-kibbutz-title" defaultValue="החיים והעבודה בקיבוץ" as="h2" />
            <EditableText contentKey="israel-kibbutz-text1" defaultValue="בקיבוץ חפץ חיים עבדה מרים בעיקר במטבח. החיים בקיבוץ היו מלאי משמעות, למרות העבודה הקשה והתנאים הצנועים. היא נקשרה בידידות עם בני נוער עולים וניסתה להשפיע על מוסדות הקיבוץ לתת להם יחס שווה לזה של ילדי המשק בני גילם." as="p" />
            <EditableText contentKey="israel-kibbutz-text2" defaultValue='&quot;ניסינו להשפיע על מוסדות הקיבוץ לתת להם יחס כמו לילדי המשק בני גילם. ילדי המשק לא היו צריכים לעבוד וקיבלו אוכל, שיכון ולימודים ברמה גבוהה בהרבה. לא יכולנו להשלים עם הפליה זו, אבל לא שינינו דבר.&quot; - מתארת מרים את מאבקה למען השוויון.' as="p" />
            <EditableText contentKey="israel-kibbutz-text3" defaultValue='למרות ביקורתה על חלק מנהלי הקיבוץ, מרים הייתה מרוצה מחייה החברתיים: "הייתי מאושרת ומצאתי סיפוק וענין בעבודה. רכשתי לי חברות טובות, וגרתי בחדר של רחל שפיצר, שהייתה אלמנה מבעלה, ישעיה הי"ד, שנפל במלחמת השחרור."' as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="israel-kibbutz-image"
                defaultSrc="/images/family/hefetz-haim-1949.jpg"
                alt="מרים בקיבוץ חפץ חיים"
              />
              <EditableText contentKey="israel-kibbutz-caption" defaultValue="מרים בקיבוץ חפץ חיים, 1949" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="israel-marriage-title" defaultValue="המפגש עם ישעי והנישואים" as="h2" />
            <EditableText contentKey="israel-marriage-text1" defaultValue="בקיבוץ חפץ חיים פגשה מרים את ישעי יעקובסון, האיש שעמו הקימה את ביתה ומשפחתה. הם הכירו בקיבוץ, התחתנו, ויחד בחרו להקים את ביתם במושב בית חלקיה הסמוך." as="p" />
            <EditableText contentKey="israel-marriage-text2" defaultValue='&quot;לאחר שנה קיבלתי חברות בקיבוץ, למרות הביקורת שהשמעתי לעתים. בכל זה הייתי מאושרת והרגשתי טוב בחיי החברה ומצאתי סיפוק ועניין בעבודה. כעבור זמן הכרתי את ישעי יעקובסון, ויחד החלטנו להקים משפחה.&quot; - מספרת מרים.' as="p" />
            <EditableText contentKey="israel-marriage-text3" defaultValue="החתונה התקיימה ב-1951, ובהמשך נולדו להם שני ילדים: מיכל ורפי. הזוג הצעיר החליט לעזוב את הקיבוץ ולעבור למושב בית חלקיה, שם בנו את ביתם וגידלו את משפחתם." as="p" />

            <div className="quote-wrapper">
              <EditableText contentKey="israel-marriage-quote" defaultValue='זוהי נקמתנו בנאצים הארורים, ימ"ש: ילדים קטנים נוהרים לגן, ל&apos;חיידר&apos; ולבית הספר' as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="israel-home-title" defaultValue="בית חלקיה - בניית הבית והמשפחה" as="h2" />
            <EditableText contentKey="israel-home-text1" defaultValue="בשנת 1952 עברו מרים וישעי למושב בית חלקיה. כזוג צעיר בישוב מתפתח, חוו שנים קשות של עבודה מאומצת כדי להגיע לרמת חיים סבירה ולתת לילדיהם חיים טובים." as="p" />
            <EditableText contentKey="israel-home-text2" defaultValue='&quot;עבדנו קשה, בלי חשמל, טלפון, או שירותים בבית. כיבסתי ביד, בישלתי ואפיתי על פתיליות נפט, אבל הייתי מאושרת לבנות את חיינו בעצמאות. ברוך ה&apos; שעזר לי להגיע עד הלום בלי להזדקק למתנת בשר ודם, ואפשר לי להכיר וללמוד מאנשים טובים בקיבוץ, בכפר ובעיר.&quot; - מרים מספרת על חיי היומיום בבית חלקיה.' as="p" />
            <EditableText contentKey="israel-home-text3" defaultValue="המכתבים ששלחה מרים לישעי בזמן שירות המילואים שלו ב-1955 שופכים אור על החיים שניהלו בתנאים קשים, אך מלאי תקווה ובטחון. היא מתארת את הטיפול בילדים, בחיות המשק, ובעבודות היומיומיות, תוך שמירה על רוח טובה ואופטימיות." as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="israel-home-image"
                defaultSrc="/images/family/beit-chilkiya.jpg"
                alt="בית המשפחה בבית חלקיה"
              />
              <EditableText contentKey="israel-home-caption" defaultValue="בית משפחת יעקובסון בבית חלקיה, שנות ה-50" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="israel-family-title" defaultValue="גידול הילדים וחיי המשפחה" as="h2" />
            <EditableText contentKey="israel-family-text1" defaultValue="מרים וישעי גידלו את ילדיהם, מיכל ורפי, בבית חלקיה. הם השקיעו רבות בחינוכם, תוך שילוב ערכי התורה והעבודה. החיים במושב אפשרו להם לחנך את ילדיהם בדרך שהאמינו בה, ולהעניק להם ילדות מאושרת ומוגנת, שונה בתכלית מילדותה שלה." as="p" />
            <EditableText contentKey="israel-family-text2" defaultValue="לאורך השנים, ראתה מרים בהקמת המשפחה ובגידול הילדים את הניצחון האמיתי על הנאצים. המשפחה גדלה והתרחבה עם השנים, וכיום היא סבתא לנכדים ולנינים רבים." as="p" />
            <EditableText contentKey="israel-family-text3" defaultValue='&quot;כשאני רואה את המשפחה שהקמנו, את הילדים, הנכדים והנינים - זהו הניצחון האמיתי שלנו, של העם היהודי, על אלו שרצו להשמיד אותנו. זוהי נקמתנו - חיים יהודיים פורחים בארץ ישראל.&quot; - אומרת מרים בגאווה.' as="p" />
          </section>

          <section className="chapter-section">
            <EditableText contentKey="israel-retrospect-title" defaultValue="מבט לאחור" as="h2" />
            <EditableText contentKey="israel-retrospect-text1" defaultValue="בזקנתה, מרים מתבוננת אחורה בחייה הארוכים ורואה את הנס הגדול של הישרדותה ובניית חיים חדשים ומלאים בארץ ישראל. היא רואה את המשפחה שהקימה ואת העולם היהודי המשגשג בישראל כניצחון על מי שרצו להכחיד את העם היהודי." as="p" />
            <EditableText contentKey="israel-retrospect-text2" defaultValue='&quot;אם אני סוקרת תקופה של למעלה משישים שנה, עלי להשתאות מה גדולה הישועה ומה גודל התמורה שהתחוללה בחיי. אלוליא חויתי, לא הייתי מאמינה.&quot; - מסכמת מרים את מסעה המופלא.' as="p" />
            <EditableText contentKey="israel-retrospect-text3" defaultValue="היום, היא זוכה לראות את פירות עמלה וסבלה - משפחה לתפארת, חיים יהודיים עשירים בארץ ישראל, והנצחת זכר השואה והגבורה למען הדורות הבאים." as="p" />

            <div className="quote-wrapper">
              <EditableText contentKey="israel-retrospect-quote" defaultValue="אם אני סוקרת תקופה של למעלה משישים שנה, עלי להשתאות מה גדולה הישועה ומה גודל התמורה שהתחוללה בחיי. אלוליא חויתי, לא הייתי מאמינה" as="p" />
            </div>
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="israel-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="israel-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
            <EditableText contentKey="israel-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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
                  text='זוהי נקמתנו בנאצים הארורים, ימח שמם: ילדים קטנים נוהרים לגן, לחיידר ולבית הספר'
                  source="מרים יעקובסון, מתוך 'מאפילה לאורה'"
                  page={112}
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

export default IsraelPage;
