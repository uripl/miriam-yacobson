import React, { useEffect } from 'react';
import Timeline from '../common/Timeline';
import EditableText from '../editable/EditableText';
import EditableImage from '../editable/EditableImage';
import '../../styles/NewHomePage.css';

const NewHomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="timeline-page">
      {/* Hero מדף הבית המקורי */}
      <section className="hero">
        <div className="hero-content">
          <EditableImage
            contentKey="home-hero-image"
            defaultSrc="/images/family/miriam-portrait.jpg"
            alt="מרים יעקובסון"
          />
          <EditableText contentKey="home-hero-title" defaultValue="מאפילה לאורה" as="h1" />
          <EditableText contentKey="home-hero-subtitle" defaultValue="סיפור חייה של סבתא מרים יעקובסון (אופנהיימר)" as="h2" />
          <EditableText contentKey="home-hero-text" defaultValue="ממסע של גבורה ואובדן בשואה אל חיים של תקווה ובניין בארץ ישראל" as="p" />
        </div>
      </section>

      {/* כותרת ציר הזמן כעת כותרת משנית */}
      <header className="page-header">
        <div className="container">
          <EditableText contentKey="home-timeline-title" defaultValue="ציר זמן - נקודות ציון מרכזיות" as="h2" />
          <EditableText contentKey="home-timeline-text" defaultValue="ציר הזמן מציג את נקודות הציון המרכזיות בחייה של סבתא מרים, מלידתה בגרמניה בשנת 1925, דרך התקופה הקשה של השואה, ועד לעלייתה לארץ ישראל והקמת משפחה. ניתן לסנן את האירועים לפי תקופות חיים על ידי לחיצה על הקטגוריות למטה." as="p" />
        </div>
      </header>

      <div className="container">
        <div className="timeline-page-content">
         
          <section className="timeline-full">
            <Timeline simplified={false} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default NewHomePage;
