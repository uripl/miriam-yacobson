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
 * דף פרק השחרור והחזרה לליון
 */
const LiberationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relevantImages = galleryImages.filter(image =>
    image.period === 'liberation'
  );

  const relevantDocuments = historicalDocuments.filter(doc =>
    doc.id.includes('liberation') || doc.id.includes('reference-card')
  );

  const relevantQuotes = [
    quotes.find(quote => quote.text.includes("תמיד היו אנשים טובים"))
  ].filter(quote => quote !== undefined);

  return (
    <div className="chapter-page">
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="liberation-header-title" defaultValue="השחרור והחזרה לליון" as="h1" />
          <EditableText contentKey="liberation-header-subtitle" defaultValue="1945-1948" as="p" />
        </div>
      </header>

      <div className="container">
        <ChapterNavBar position="top" />

        <div className="chapter-content">
          <section className="chapter-introduction">
            <div className="chapter-intro-grid">
              <div className="chapter-intro-text">
                <EditableText contentKey="liberation-intro-title" defaultValue="רגע השחרור" as="h2" />
                <EditableText contentKey="liberation-intro-text1" defaultValue="בתחילת מאי 1945, בימים האחרונים של המלחמה באירופה, שהתה מרים במחנה ניישטדט-גלווה בצפון גרמניה. במפתיע, ב-2 במאי 1945, נעלמו כל השומרים הנאצים, כאילו בלעה אותם האדמה." as="p" />
                <EditableText contentKey="liberation-intro-text2" defaultValue='&quot;בוקר אחד בתחילת מאי נעלמו כל השומרים ואנשי הס.ס. הסובייטים הגיעו ומצאו מהגרמנים רק מדים שהוחלפו בחופזה.&quot;' as="p" />
              </div>
              <div className="chapter-intro-image">
                <EditableImage
                  contentKey="liberation-intro-image"
                  defaultSrc="/images/historical/liberation-day.jpg"
                  alt="רגע השחרור, מאי 1945"
                />
                <EditableText contentKey="liberation-intro-caption" defaultValue="אסירים משוחררים מקבלים את פני החיילים הסובייטים, מאי 1945" as="p" />
              </div>
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="liberation-freedom-title" defaultValue="החופש הראשון" as="h2" />
            <EditableText contentKey="liberation-freedom-text1" defaultValue="החיילים הסובייטים שחררו את מרים ואת שאר האסירים ב-2 במאי 1945. למרות השחרור, עדיין היה פחד גם מהחיילים הרוסים. מרים וחברותיה החליטו לא להישאר במקום ופנו מערבה בחיפוש אחר הכוחות האמריקאים." as="p" />
            <EditableText contentKey="liberation-freedom-text2" defaultValue='&quot;הרחובות היו שוממים. האוכלוסייה פחדה מנקם האסירים המשוחררים ובעיקר מהחיילים הרוסים. הגענו לווילה של גרמנים שהתחבאו בקרבת מקום מפחד. התפלחנו לבית וראינו סימני עזיבה חפוזה.&quot;' as="p" />
            <EditableText contentKey="liberation-freedom-text3" defaultValue="בבית הגרמני מצאו מרים וחברותיה בגדים נקיים ואוכל. כשעזבו את הבית, נשמעו אחריהן קללות והושלכה עליהן חבילה. סבל המיליונים לא נגע ולא הפריע לאוכלוסייה הגרמנית, שהמשיכה בחייה גם בימים האחרונים למלחמה." as="p" />

            <div className="image-container">
              <EditableImage
                contentKey="liberation-freedom-image"
                defaultSrc="/images/historical/displaced-persons.jpg"
                alt="פליטים ומשוחררים אחרי המלחמה"
              />
              <EditableText contentKey="liberation-freedom-caption" defaultValue="פליטים ועקורים לאחר השחרור, 1945" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="liberation-return-title" defaultValue="בדרך חזרה לליון" as="h2" />
            <EditableText contentKey="liberation-return-text1" defaultValue="חברה מצרפת הציעה למרים לחזור איתה לצרפת. לאחר מנוחה והצטיידות במחנה, הם יצאו מערבה אל האמריקאים. עם כניעת גרמניה ב-9 במאי 1945, הקימו האמריקאים מנגנון סיוע לפליטים, ומרים וחברתה קיבלו אישור לחזור לצרפת." as="p" />
            <EditableText contentKey="liberation-return-text2" defaultValue='&quot;אדית שטרן, שהכרתי עוד מפריז, עזרה לי עם חוש התמצאות בריא לעבור את המכשולים בדרך. היתה לנו הקלה כשהגענו אל קווי הבריטים והאמריקאים לקבל אישורי מעבר וכרטיסי נסיעה.&quot;' as="p" />
            <EditableText contentKey="liberation-return-text3" defaultValue="מרים הציגה עצמה כצרפתייה שמגיע לה לחזור למולדתה. עם עזרת חיילים אמריקאים, השיגו מסמכים והגיעו לפריז ומשם לליון, לחפש את שרידי משפחתה." as="p" />
          </section>

          <section className="chapter-section">
            <EditableText contentKey="liberation-reunion-title" defaultValue="המפגש המחודש עם המשפחה" as="h2" />
            <EditableText contentKey="liberation-reunion-text1" defaultValue="מרים הגיעה לליון ב-24 במאי 1945, בשעות הבוקר המוקדמות. היא חיפשה את קרוביה ומצאה את אחותה קלה, שהתחתנה זמן קצר קודם לכן עם יעקב סמואל." as="p" />
            <EditableText contentKey="liberation-reunion-text2" defaultValue='&quot;הגעתי לביתה של קלה וז&apos;ק בשעות הבוקר המוקדמות. הפתעתי את אחותי שלא שמעה ממני יותר משנה. אחרי שזיהתה אותי, רזה, בבגדים &apos;אופנתיים&apos;, נפלנו זו על צוואר זו ובכינו.&quot;' as="p" />
            <EditableText contentKey="liberation-reunion-text3" defaultValue='התברר שאביה של מרים לא חזר "עדיין", אך היא קיבלה את הבשורה הקשה שאמה נפטרה שלושה שבועות לפני חג הפסח. מרים קיבלה את האבל על אמה והתאחדה עם אחיותיה ששרדו, אסתר וקלה.' as="p" />

            <div className="quote-wrapper">
              <EditableText contentKey="liberation-reunion-quote" defaultValue="בכל המצבים הקשים ביותר שהיינו בהם, תמיד היו אנשים טובים שהושיטו יד" as="p" />
            </div>
          </section>

          <section className="chapter-section">
            <EditableText contentKey="liberation-children-title" defaultValue="עבודה עם ילדים ניצולים" as="h2" />
            <EditableText contentKey="liberation-children-text1" defaultValue="מרים השתקמה בחום ובאהבה במשפחת סמואל. היא החלה לעבוד יחד עם משפחת סמואל בקליטת ילדים יהודים יתומים והצלתם מהמנזרים. בהמשך, עבדה גם בחינוך וסיוע לילדים שהתייתמו במלחמה." as="p" />
            <EditableText contentKey="liberation-children-text2" defaultValue='&quot;נקלטתי בחום ואהבה במשפחת סמואל, אליהם הצטרפו גם בני משפחה אחרים ששרדו. לאט-לאט התאוששתי ונגמלתי גם מהרגלים ודיבורים של חיי המחנה שנדבקו בי בעל כורחי.&quot;' as="p" />
            <EditableText contentKey="liberation-children-text3" defaultValue="החיים בליון בשנים 1945 עד 1948 היו תקופת שיקום והתאוששות. מרים חזרה לחיים נורמליים ובמקביל סייעה בטיפול בילדים יתומים ששרדו את השואה, תוך חיפוש שרידי משפחות והכנה לעלייה ארצה." as="p" />
          </section>

          <section className="chapter-gallery">
            <EditableText contentKey="liberation-gallery-title" defaultValue="תמונות מהתקופה" as="h2" />
            <ImageGallery images={relevantImages} />
          </section>

          <section className="chapter-documents">
            <EditableText contentKey="liberation-documents-title" defaultValue="מסמכים היסטוריים" as="h2" />
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
            <EditableText contentKey="liberation-quotes-title" defaultValue="ציטוטים נבחרים" as="h2" />
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

export default LiberationPage;
