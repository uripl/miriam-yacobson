import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../../styles/components.css';

// אייקונים
import { FaBaby, FaSchool, FaRunning, FaSadTear, FaDove, FaShip, FaHome, FaHeart, FaBook, FaTree } from 'react-icons/fa';

const Timeline = ({ simplified = false }) => {
  const [selectedEra, setSelectedEra] = useState(null);
  
  // נתוני ציר הזמן המלאים עם תאריכים עבריים
  const timelineData = [
    {
      id: 'birth',
      date: '24 באוקטובר 1925',
      hebrewDate: 'ז׳ מרחשוון ה׳תרפ״ה',
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
      hebrewDate: 'תרפ״ה-תרצ״ג',
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
      hebrewDate: 'תרצ״ג',
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
      hebrewDate: 'תרצ״ח',
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
      hebrewDate: 'תרצ״ח-ת״ש',
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
      hebrewDate: 'אייר ת״ש',
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
      hebrewDate: 'סיון ת״ש',
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
      hebrewDate: 'ת״ש-תש״ב',
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
      hebrewDate: 'תש״ב-תש״ד',
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
      hebrewDate: 'אדר תש״ד',
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
      hebrewDate: 'ניסן תש״ד - שבט תש״ה',
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
      hebrewDate: 'טבת-שבט תש״ה',
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
      hebrewDate: 'י״ט באייר תש״ה',
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
      hebrewDate: 'סיון תש״ה',
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
      hebrewDate: 'תש״ה-תש״ח',
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
      hebrewDate: 'תש״ח',
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
      hebrewDate: 'תש״ח-תש״ט',
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
      hebrewDate: 'תש״ט-תשי״א',
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
      hebrewDate: 'תשי״א',
      title: 'הכרות עם ישעי יעקובסון',
      location: 'קיבוץ חפץ חיים, ישראל',
      description: 'מרים פגשה את ישעי יעקובסון, וזמן קצר לאחר מכן הם התחתנו. יחד הקימו בית בחפץ חיים.',
      icon: <FaHeart />,
      category: 'life-in-israel',
      color: '#9900EF'
    },
    {
      id: 'beit-chilkiya',
      date: '1952-1960
