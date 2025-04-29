import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../../styles/components.css';

// אייקונים
import { FaBaby, FaSchool, FaRunning, FaSadTear, FaDove, FaShip, FaHome, FaHeart, FaBook, FaTree } from 'react-icons/fa';

const Timeline = ({ simplified = false }) => {
  const [selectedEra, setSelectedEra] = useState(null);
  
  // נתוני ציר הזמן המלאים
  const timelineData = [
    {
      id: 'birth',
      date: '24 באוקטובר 1925',
      title: 'לידתה של מרים אופנהיימר',
      location: 'לייפציג, גרמניה',
      description: 'מרים נולדה בז׳ מרחשוון ה׳תרפ״ה למשפחה יהודית שומרת מצוות. אביה היה רפאל (אברהם) אופנהיימר ואמה מטל לבית אטלינגר.',
      icon: <FaBaby />,
      category: 'childhood',
      color: '#8ED1FC'
    },
    {
      id: 'childhood-leipzig',
      date: '1925-1933',
      title: 'ילדות בלייפציג',
      location: 'לייפציג, גרמניה',
      description: 'שנותיה הראשונות בבית יהודי חם בקהילה יהודית גדולה. אביה עבד כסוכן מכירות של יינות.',
      icon: <FaSchool />,
      category: 'childhood',
      color: '#8ED1FC'
    },
    {
      id: 'nazi-rise',
      date: '1933',
      title: 'עליית הנאצים לשלטון',
      location: 'גרמניה',
      description: 'עליית הנאצים לשלטון שינתה את חייהם של יהודי גרמניה. המשפחה עברה לשווייץ לחצי שנה וחזרה ללייפציג.',
      icon: <FaRunning />,
      category: 'childhood',
      color: '#8ED1FC'
    },
    {
      id: 'escape-belgium',
      date: '1938',
      title: 'בריחה לבלגיה',
      location: 'אנטוורפן, בלגיה',
      description: 'לאחר ליל הבדולח, אביה של מרים ברח לבלגיה. מרים והאחיות עברו את הגבול באמצעות דרכון מזויף.',
      icon: <FaRunning />,
      category: 'belgium',
      color: '#7BDCB5'
    },
    {
      id: 'life-belgium',
      date: '1938-1940',
      title: 'חיים בבלגיה',
      location: 'אנטוורפן והיידה, בלגיה',
      description: 'המשפחה התאחדה באנטוורפן. מרים למדה בישיבה קטנה ליטאית והושפעה מהסביבה היהודית החרדית.',
      icon: <FaSchool />,
      category: 'belgium',
      color: '#7BDCB5'
    },
    {
      id: 'german-invasion-belgium',
      date: 'מאי 1940',
      title: 'הפלישה הגרמנית לבלגיה',
      location: 'בלגיה',
      description: 'הגרמנים פלשו לבלגיה. אביה של מרים נאסר כאזרח גרמני. המשפחה ברחה מערבה בניסיון להימלט מהגרמנים.',
      icon: <FaRunning />,
      category: 'france',
      color: '#ABB8C3'
    },
    {
      id: 'escape-france',
      date: 'יוני 1940',
      title: 'בריחה לצרפת',
      location: 'ליון, צרפת',
      description: 'מרים ואחותה הקטנה הצליחו להימלט לצרפת בעזרת מבריחים, והגיעו לליון שם פגשו את אביהן שהשתחרר ממעצרו.',
      icon: <FaRunning />,
      category: 'france',
      color: '#ABB8C3'
    },
    {
      id: 'life-lyon',
      date: '1940-1942',
      title: 'חיים בליון',
      location: 'ליון, צרפת',
      description: 'המשפחה חיה בתנאי מחתרת בליון. אביה המשיך בשמירת מצוות והמשפחה התמודדה עם פחד מתמיד.',
      icon: <FaHome />,
      category: 'france',
      color: '#ABB8C3'
    },
    {
      id: 'southern-france',
      date: '1942-1944',
      title: 'דרום צרפת תחת כיבוש',
      location: 'ניצה וגרנובל, צרפת',
      description: 'עם כניסת הגרמנים לדרום צרפת, המשפחה נאלצה לברוח דרומה ולהסתתר במקומות שונים.',
      icon: <FaRunning />,
      category: 'france',
      color: '#ABB8C3'
    },
    {
      id: 'deportation',
      date: 'מרץ 1944',
      title: 'המעצר והגירוש',
      location: 'ליון וגרנובל, צרפת',
      description: 'מרים ואביה נעצרו ע"י הגסטפו ונשלחו למחנה דרנסי ליד פריז, משם נשלחו לאושוויץ.',
      icon: <FaSadTear />,
      category: 'holocaust',
      color: '#F78DA7'
    },
    {
      id: 'auschwitz',
      date: 'אפריל 1944 - ינואר 1945',
      title: 'אושוויץ',
      location: 'אושוויץ, פולין',
      description: 'מרים שרדה במחנה ההשמדה אושוויץ בתנאים אכזריים, עבדה במיון בגדים של הנרצחים, ושמרה על אמונתה.',
      icon: <FaSadTear />,
      category: 'holocaust',
      color: '#F78DA7'
    },
    {
      id: 'death-march',
      date: 'ינואר 1945',
      title: 'צעדת המוות',
      location: 'מאושוויץ לרבנסבריק, גרמניה',
      description: 'מרים השתתפה בצעדת המוות מאושוויץ לתוך גרמניה, עם התקרבות הצבא הסובייטי.',
      icon: <FaSadTear />,
      category: 'holocaust',
      color: '#F78DA7'
    },
    {
      id: 'liberation',
      date: '2 במאי 1945',
      title: 'השחרור',
      location: 'קליבה ניישטדט, גרמניה',
      description: 'מרים שוחררה ע"י הצבא הסובייטי במחנה ניישטדט שבגרמניה.',
      icon: <FaDove />,
      category: 'liberation',
      color: '#0693E3'
    },
    {
      id: 'return-lyon',
      date: 'יוני 1945',
      title: 'חזרה לליון',
      location: 'ליון, צרפת',
      description: 'מרים חזרה לליון לחפש את משפחתה. גילתה שאביה לא שרד, אך אחיותיה ניצלו.',
      icon: <FaHome />,
      category: 'liberation',
      color: '#0693E3'
    },
    {
      id: 'reconstruction',
      date: '1945-1948',
      title: 'שיקום בליון',
      location: 'ליון, צרפת',
      description: 'מרים השתקמה בליון בתקופה שלאחר המלחמה, וסייעה לקליטת ילדים יהודים יתומים מהמלחמה.',
      icon: <FaHeart />,
      category: 'liberation',
      color: '#0693E3'
    },
    {
      id: 'immigration',
      date: '1948',
      title: 'העלייה לישראל',
      location: 'חיפה, ישראל',
      description: 'מרים עלתה לארץ ישראל באונייה ממרסיי עם 40 ילדים שהיו מיועדים להיקלט במוסדות פא"י בארץ.',
      icon: <FaShip />,
      category: 'immigration',
      color: '#FCB900'
    },
    {
      id: 'aliyat-hanoar',
      date: '1948-1949',
      title: 'חודשים ראשונים בארץ',
      location: 'בית חלוצות והעלייה לחפץ חיים',
      description: 'מרים התיישבה תחילה בבית חלוצות של פא"י ולאחר מכן הצטרפה לקיבוץ חפץ חיים.',
      icon: <FaHome />,
      category: 'immigration',
      color: '#FCB900'
    },
    {
      id: 'hefetz-haim',
      date: '1949-1951',
      title: 'בקיבוץ חפץ חיים',
      location: 'קיבוץ חפץ חיים, ישראל',
      description: 'מרים עבדה במטבח, סייעה לעולי הנוער, וביקרה את משפחתה בכפר פינס, רמת גן וירושלים.',
      icon: <FaTree />,
      category: 'life-in-israel',
      color: '#9900EF'
    },
    {
      id: 'meeting-husband',
      date: '1951',
      title: 'הכרות עם ישעי יעקובסון',
      location: 'קיבוץ חפץ חיים, ישראל',
      description: 'מרים פגשה את ישעי יעקובסון, וזמן קצר לאחר מכן הם התחתנו. יחד הקימו בית בחפץ חיים.',
      icon: <FaHeart />,
      category: 'life-in-israel',
      color: '#9900EF'
    },
    {
      id: 'beit-chilkiya',
      date: '1952-1960',
      title: 'מעבר לבית חלקיה',
      location: 'בית חלקיה, ישראל',
      description: 'המשפחה עברה לבית חלקיה, ובנתה בה את חייה. נולדו להם שני ילדים: מיכל ורפי.',
      icon: <FaHome />,
      category: 'life-in-israel',
      color: '#9900EF'
    },
    {
      id: 'later-life',
      date: '1960-2023',
      title: 'המשך החיים בישראל',
      location: 'ישראל',
      description: 'מרים ומשפחתה המשיכו לחיות בישראל, ראו בהקמת המשפחה, הילדים והנכדים את הניצחון האמיתי על הנאצים.',
      icon: <FaBook />,
      category: 'life-in-israel',
      color: '#9900EF'
    }
  ];

  // קטגוריות תקופות חיים לסינון
  const categories = [
    { id: 'childhood', name: 'ילדות בגרמניה', color: '#8ED1FC' },
    { id: 'belgium', name: 'בלגיה', color: '#7BDCB5' },
    { id: 'france', name: 'צרפת תחת כיבוש', color: '#ABB8C3' },
    { id: 'holocaust', name: 'השואה', color: '#F78DA7' },
    { id: 'liberation', name: 'השחרור', color: '#0693E3' },
    { id: 'immigration', name: 'העלייה לארץ', color: '#FCB900' },
    { id: 'life-in-israel', name: 'חיים בישראל', color: '#9900EF' }
  ];

  // סינון אירועים לפי קטגוריה נבחרת או תצוגת כל האירועים
  const filteredEvents = selectedEra ? timelineData.filter(event => event.category === selectedEra) : timelineData;
  
  // בתצוגה מקוצרת, נציג רק את האירועים המרכזיים
  const simplifiedEvents = simplified ? filteredEvents.filter((_, index) => index % 3 === 0 || index === filteredEvents.length - 1) : filteredEvents;
  
  return (
    <div className="timeline-container" dir="rtl">
      {!simplified && (
        <div className="timeline-categories">
          <button 
            className={`category-button ${selectedEra === null ? 'active' : ''}`}
            onClick={() => setSelectedEra(null)}
          >
            כל האירועים
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${selectedEra === category.id ? 'active' : ''}`}
              style={{ 
                borderColor: category.color,
                backgroundColor: selectedEra === category.id ? category.color : 'transparent'
              }}
              onClick={() => setSelectedEra(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
      
      <VerticalTimeline>
        {simplifiedEvents.map(event => (
          <VerticalTimelineElement
            key={event.id}
            date={event.date}
            dateClassName="timeline-date"
            iconStyle={{ background: event.color, color: '#fff' }}
            icon={event.icon}
            contentStyle={{
              borderTop: `4px solid ${event.color}`,
              direction: 'rtl',
              textAlign: 'right'
            }}
          >
            <h3 className="timeline-title">{event.title}</h3>
            <h4 className="timeline-location">{event.location}</h4>
            <p className="timeline-description">{event.description}</p>
            
            {!simplified && (
              <Link to={`/chapters/${event.category}#${event.id}`} className="timeline-link">
                קרא עוד
              </Link>
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      
      {simplified && (
        <div className="timeline-footer">
          <Link to="/timeline" className="timeline-full-link">
            לציר הזמן המלא
          </Link>
        </div>
      )}
    </div>
  );
};

export default Timeline;
