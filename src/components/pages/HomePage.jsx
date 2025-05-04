import React from 'react';
import { Link } from 'react-router-dom';
import ChapterCard from '../common/ChapterCard';
import Timeline from '../common/Timeline';
import Quote from '../common/Quote';
import ImageGallery from '../common/ImageGallery';
import '../../styles/HomePage.css';
import PlaceholderImage from '../common/PlaceholderImage';

const HomePage = () => {
  // נתוני פרקים לתצוגה בדף הבית
  const chapters = [
    {
      id: 'childhood',
      title: 'ילדות בלייפציג',
      years: '1925-1938',
      summary: 'מרים אופנהיימר נולדה ב-ז׳ מרחשוון ה׳תרפ״ה (24.10.1925) בעיר לייפציג שבמרכז גרמניה. ילדותה המאושרת בבית יהודי חם הסתיימה עם עליית הנאצים לשלטון.',
      imageSrc: '/images/historical/leipzig.jpg',
      route: '/chapters/childhood'
    },
    {
      id: 'belgium',
      title: 'החיים בבלגיה',
      years: '1938-1940',
      summary: 'המשפחה נמלטה לבלגיה כשהיא מוכרחה לשנות זהות והתמודדה עם חיים חדשים כפליטים.',
      imageSrc: '/images/historical/belgium.jpg',
      route: '/chapters/belgium'
    },
    {
      id: 'france',
      title: 'צרפת תחת הכיבוש',
      years: '1940-1944',
      summary: 'עם פלישת הנאצים לבלגיה, המשפחה נסה לצרפת. שנים של מנוסה מתמדת, החלפת זהויות ומסתור.',
      imageSrc: '/images/historical/france.jpg',
      route: '/chapters/france'
    },
    {
      id: 'holocaust',
      title: 'בעמק הבכא',
      years: '1944-1945',
      summary: 'מרים ואביה נתפסו ונשלחו לאושוויץ. חוויות הזוועה במחנה והישרדותה בתנאים בלתי אנושיים.',
      imageSrc: '/images/historical/auschwitz.jpg',
      route: '/chapters/holocaust'
    },
    {
      id: 'liberation',
      title: 'השחרור והחזרה לליון',
      years: '1945-1948',
      summary: 'לאחר השחרור ע"י הרוסים וצעדת המוות, מרים חזרה לליון לחפש שרידים ממשפחתה וגילתה כי אביה לא שרד.',
      imageSrc: '/images/historical/liberation.jpg',
      route: '/chapters/liberation'
    },
    {
      id: 'immigration',
      title: 'העלייה לישראל',
      years: '1948-1949',
      summary: 'מרים עלתה לארץ ישראל והתחילה בבניית חיים חדשים במולדתה ההיסטורית.',
      imageSrc: '/images/historical/immigration.jpg',
      route: '/chapters/immigration'
    },
    {
      id: 'life-in-israel',
      title: 'חיים בארץ ישראל',
      years: '1949-2023',
      summary: 'החיים בארץ: בית חלוצות, חפץ חיים, בית חלקיה, והקמת בית ומשפחה לתפארת.',
      imageSrc: '/images/historical/israel.jpg',
      route: '/chapters/israel'
    }
  ];

  // ציטוטים נבחרים מסיפורה של מרים
  const quotes = [
    {
      text: "ירוי במחנות: הם לא ניצחו אותנו, אנחנו ניצחנו אותם",
      source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
      page: 95
    },
    {
      text: "אני מרגישה שבכל המצבים הזכורים לי, זכיתי להרבה חסדים ואהבה וסיעתא דשמיא",
      source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
      page: 111
    }
  ];

  // תמונות לגלריה בדף הבית
  const featuredImages = [
    {
      id: 'family-leipzig',
      src: '/images/family/leipzig-family.jpg',
      alt: 'משפחת אופנהיימר בלייפציג, שנות ה-30',
      caption: 'משפחת אופנהיימר בלייפציג. מימין: מטל (האם), מרים, אסתר וקלה'
    },
    {
      id: 'miriam-youth',
      src: '/images/family/miriam-youth.jpg',
      alt: 'מרים בצעירותה',
      caption: 'מרים בצעירותה, סמוך לעלייתה לארץ'
    },
    {
      id: 'kibbutz',
      src: '/images/family/kibbutz.jpg',
      alt: 'מרים בקיבוץ חפץ חיים',
      caption: 'מרים בקיבוץ חפץ חיים, 1949'
    }
  ];

  return (
    <div className="home-page" dir="rtl">
      <section className="hero">
        <div className="hero-content">
          <h1>מאפילה לאורה</h1>
          <h2>סיפור חייה של מרים אופנהיימר (יעקובסון)</h2>
          <p className="hero-subtitle">
            ממסע של סבל ואובדן בשואה אל חיים של תקווה ובניין בארץ ישראל
          </p>
          <Link to="/about" className="btn-primary">
            אודות מרים
          </Link>
        </div>
      </section>

      <section className="intro">
        <div className="container">
          <h2>מסע של תקווה</h2>
          <div className="intro-content">
            <div className="intro-text">
              <p>
                מרים אופנהיימר נולדה בלייפציג שבגרמניה ב-1925 למשפחה יהודית שומרת מצוות. 
                חייה השתנו מקצה לקצה עם עליית הנאצים לשלטון, והיא נאלצה לעבור מסע 
                הישרדות מופלא דרך בלגיה, צרפת, מחנה אושוויץ וצעדת המוות.
              </p>
              <p>
                לאחר השחרור ואיחוד המשפחה החלקי בליון, עלתה מרים לארץ ישראל, 
                התיישבה בקיבוץ חפץ חיים ולאחר מכן בבית חלקיה, והקימה משפחה לתפארת.
              </p>
              <p>
                סיפורה המרגש של מרים הוא מסע של אמונה, תקווה והתגברות על הקשיים הגדולים ביותר.
              </p>
            </div>
              <div className="intro-image">
                <PlaceholderImage 
                  src="/images/family/miriam-portrait.jpg" 
                  alt="מרים יעקובסון" 
                  category="life-in-israel"
                  loading="lazy" 
                />
                <p className="image-caption">מרים יעקובסון</p>
              </div>
          </div>
        </div>
      </section>

      <section className="timeline-preview">
        <div className="container">
          <h2>מסע חיים</h2>
          <Timeline simplified={true} />
          <div className="timeline-preview-link">
            <Link to="/timeline" className="btn-secondary">
              לציר הזמן המלא
            </Link>
          </div>
        </div>
      </section>

      <section className="chapters-preview">
        <div className="container">
          <h2>פרקי חיים</h2>
          <div className="chapters-grid">
            {chapters.map((chapter) => (
              <ChapterCard 
                key={chapter.id}
                title={chapter.title}
                years={chapter.years}
                summary={chapter.summary}
                imageSrc={chapter.imageSrc}
                route={chapter.route}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="quotes-section">
        <div className="container">
          <h2>מילותיה</h2>
          <div className="quotes-container">
            {quotes.map((quote, index) => (
              <Quote 
                key={index}
                text={quote.text}
                source={quote.source}
                page={quote.page}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-preview">
        <div className="container">
          <h2>מבט אל העבר</h2>
          <ImageGallery images={featuredImages} />
          <div className="gallery-preview-link">
            <Link to="/gallery" className="btn-secondary">
              לגלריה המלאה
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>להכיר את הסיפור</h2>
          <p>
            מסעה של מרים הוא עדות חיה להיסטוריה היהודית במאה ה-20, 
            מהשואה האיומה ועד לתקומה בארץ ישראל.
          </p>
          <div className="cta-buttons">
            <Link to="/chapters/childhood" className="btn-primary">
              התחל לקרוא את הסיפור
            </Link>
            <Link to="/about-project" className="btn-secondary">
              אודות הפרויקט
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
