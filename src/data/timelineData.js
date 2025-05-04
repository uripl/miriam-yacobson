/**
 * קובץ נתונים המכיל את המידע למפת המסע ולציר הזמן של מרים אופנהיימר
 */

// נקודות ציון מרכזיות במסע החיים של מרים
export const journeyLocations = [
  {
    id: 'leipzig',
    name: 'לייפציג, גרמניה',
    latitude: 51.3397,
    longitude: 12.3731,
    dateRange: '1925-1938',
    description: 'מרים נולדה בלייפציג ביום ז׳ מרחשוון ה׳תרפ״ה (24.10.1925) למשפחה יהודית שומרת מצוות. היא גדלה בקהילה היהודית העשירה של העיר, עד לעליית הנאצים לשלטון ועזיבת המשפחה בשנת 1938.'
  },
  {
    id: 'antwerp',
    name: 'אנטוורפן, בלגיה',
    latitude: 51.2194,
    longitude: 4.4025,
    dateRange: '1938-1940',
    description: 'המשפחה נמלטה לבלגיה לאחר ליל הבדולח. בתקופה זו למדה מרים בישיבה קטנה ליטאית בהיידה, והושפעה מהסביבה היהודית החרדית. במאי 1940 פלשו הגרמנים לבלגיה.'
  },
  {
    id: 'lyon',
    name: 'ליון, צרפת',
    latitude: 45.7640,
    longitude: 4.8357,
    dateRange: '1940-1942',
    description: 'מרים ואחותה הקטנה הצליחו להימלט לצרפת, והגיעו לליון שם פגשו את אביהן. המשפחה חיה בתנאי מחתרת בליון, תחת פחד מתמיד מהשלטונות.'
  },
  {
    id: 'nice',
    name: 'ניצה, צרפת',
    latitude: 43.7102,
    longitude: 7.2620,
    dateRange: '1942-1943',
    description: 'עם התפשטות הכיבוש הגרמני לדרום צרפת, נדדה המשפחה דרומה ומצאה מקלט זמני בניצה, שהייתה תחת כיבוש איטלקי.'
  },
  {
    id: 'grenoble',
    name: 'גרנובל, צרפת',
    latitude: 45.1885,
    longitude: 5.7245,
    dateRange: '1943-1944',
    description: 'המשפחה עברה לגרנובל והסתתרה שם. במרץ 1944 נעצרו מרים ואביה על ידי הגסטפו ונשלחו למחנה דרנסי ליד פריז.'
  },
  {
    id: 'drancy',
    name: 'דרנסי, צרפת',
    latitude: 48.9125,
    longitude: 2.4467,
    dateRange: 'מרץ-אפריל 1944',
    description: 'מרים ואביה נכלאו במחנה דרנסי, מחנה מעבר שממנו יצאו משלוחים למחנות ההשמדה במזרח אירופה. במחנה זה חגגו את חג הפסח בתנאים קשים.'
  },
  {
    id: 'auschwitz',
    name: 'אושוויץ, פולין',
    latitude: 50.0343,
    longitude: 19.1793,
    dateRange: 'אפריל 1944 - ינואר 1945',
    description: 'מרים שרדה במחנה ההשמדה אושוויץ-בירקנאו בתנאים אכזריים. היא עבדה במיון בגדים של הנרצחים ושמרה על אמונתה למרות הקשיים. בסלקציה היא נפרדה מאביה, שלא שרד.'
  },
  {
    id: 'ravensbrück',
    name: 'רוונסבריק, גרמניה',
    latitude: 53.1919,
    longitude: 13.1702,
    dateRange: 'ינואר 1945',
    description: 'עם התקרבות הצבא הסובייטי לאושוויץ, הוצאו האסירים ל"צעדת המוות" לתוך גרמניה. מרים עברה דרך מחנה הריכוז רוונסבריק.'
  },
  {
    id: 'neustadt',
    name: 'ניישטדט-גלווה, גרמניה',
    latitude: 53.3645,
    longitude: 10.9613,
    dateRange: 'פברואר-מאי 1945',
    description: 'מרים שהתה במחנה ניישטדט עד לשחרור על ידי הצבא הסובייטי ב-2 במאי 1945.'
  },
  {
    id: 'lyon-return',
    name: 'ליון (חזרה), צרפת',
    latitude: 45.7640,
    longitude: 4.8357,
    dateRange: '1945-1948',
    description: 'מרים חזרה לליון לחפש את משפחתה. היא גילתה שאביה לא שרד, אך אחיותיה ניצלו. בתקופה זו עבדה בליון עם משפחת סמואל בטיפול בילדים יהודים יתומים מהמלחמה.'
  },
  {
    id: 'marseille',
    name: 'מרסיי, צרפת',
    latitude: 43.2965,
    longitude: 5.3698,
    dateRange: 'אפריל 1948',
    description: 'מרים הפליגה לארץ ישראל מנמל מרסיי עם 40 ילדים שהיו מיועדים להיקלט במוסדות פא"י בארץ.'
  },
  {
    id: 'haifa',
    name: 'חיפה, ישראל',
    latitude: 32.7940,
    longitude: 34.9896,
    dateRange: 'אפריל 1948',
    description: 'מרים הגיעה לחיפה באונייה ממרסיי. בנמל חיפה קידמו את פניה יהודים טובים, ביניהם יעקב כ"ץ ושלמה גרינפלד ז"ל.'
  },
  {
    id: 'pardes-hanna',
    name: 'פרדס חנה, ישראל',
    latitude: 32.4760,
    longitude: 34.9777,
    dateRange: 'אפריל-מאי 1948',
    description: 'מרים שהתה במחנה פרדס חנה (מחנה 80) עד שהילדים שהיו בהשגחתה נקלטו במוסדות.'
  },
  {
    id: 'hefetz-haim',
    name: 'קיבוץ חפץ חיים, ישראל',
    latitude: 31.7579,
    longitude: 34.7563,
    dateRange: '1948-1951',
    description: 'מרים הצטרפה לקיבוץ חפץ חיים. היא עבדה במטבח, סייעה לעולי הנוער, והייתה פעילה בחיי הקיבוץ.'
  },
  {
    id: 'beit-chilkiya',
    name: 'בית חלקיה, ישראל',
    latitude: 31.7947,
    longitude: 34.8192,
    dateRange: '1952-2023',
    description: 'מרים וישעי יעקובסון הקימו את ביתם בבית חלקיה. בתנאים צנועים גידלו את ילדיהם, מיכל ורפי, וראו בהקמת המשפחה את הניצחון האמיתי על הנאצים.'
  }
];

// נתוני תמונות לגלריית התמונות
export const galleryImages = [
  {
    id: 'leipzig-family',
    src: '/images/family/leipzig-family.jpg',
    alt: 'משפחת אופנהיימר בלייפציג',
    caption: 'משפחת אופנהיימר בלייפציג, שנות ה-30. מימין: מטל (האם), מרים, אסתר וקלה',
    period: 'childhood',
    year: '1930',
    location: 'לייפציג, גרמניה'
  },
  {
    id: 'miriam-child',
    src: '/images/family/miriam-child.jpg',
    alt: 'מרים בילדותה',
    caption: 'מרים בילדותה בלייפציג',
    period: 'childhood',
    year: '1930',
    location: 'לייפציג, גרמניה'
  },
  {
    id: 'heida',
    src: '/images/family/heida.jpg',
    alt: 'הישיבה בהיידה',
    caption: 'הישיבה הליטאית הקטנה בהיידה, בלגיה, בה למדה מרים',
    period: 'belgium',
    year: '1939',
    location: 'היידה, בלגיה'
  },
  {
    id: 'lyon-house',
    src: '/images/historical/lyon-house.jpg',
    alt: 'הבית בליון',
    caption: 'הבית בו הסתתרה משפחת אופנהיימר בליון',
    period: 'france',
    year: '1941',
    location: 'ליון, צרפת'
  },
  {
    id: 'liberation',
    src: '/images/historical/liberation.jpg',
    alt: 'רגע השחרור',
    caption: 'אסירים משוחררים ממחנה ניישטדט, מאי 1945',
    period: 'liberation',
    year: '1945',
    location: 'ניישטדט, גרמניה'
  },
  {
    id: 'israel-arrival',
    src: '/images/historical/israel-arrival.jpg',
    alt: 'העלייה לארץ',
    caption: 'עולים חדשים מגיעים לנמל חיפה, 1948',
    period: 'immigration',
    year: '1948',
    location: 'חיפה, ישראל'
  },
  {
    id: 'hefetz-haim-1949',
    src: '/images/family/hefetz-haim-1949.jpg',
    alt: 'מרים בקיבוץ חפץ חיים',
    caption: 'מרים בקיבוץ חפץ חיים, 1949',
    period: 'life-in-israel',
    year: '1949',
    location: 'קיבוץ חפץ חיים, ישראל'
  },
  {
    id: 'wedding',
    src: '/images/family/wedding.jpg',
    alt: 'חתונת מרים וישעי',
    caption: 'חתונתם של מרים וישעי יעקובסון, 1951',
    period: 'life-in-israel',
    year: '1951',
    location: 'ישראל'
  },
  {
    id: 'beit-chilkiya',
    src: '/images/family/beit-chilkiya.jpg',
    alt: 'בית המשפחה בבית חלקיה',
    caption: 'בית משפחת יעקובסון בבית חלקיה, שנות ה-50',
    period: 'life-in-israel',
    year: '1955',
    location: 'בית חלקיה, ישראל'
  },
  {
    id: 'family-portrait',
    src: '/images/family/family-portrait.jpg',
    alt: 'משפחת יעקובסון',
    caption: 'משפחת יעקובסון: מרים, ישעי, מיכל ורפי',
    period: 'life-in-israel',
    year: '1960',
    location: 'בית חלקיה, ישראל'
  },
  {
    id: 'miriam-elderly',
    src: '/images/family/miriam-elderly.jpg',
    alt: 'מרים בשנים מאוחרות',
    caption: 'מרים יעקובסון עם נכדיה, שנות ה-90',
    period: 'life-in-israel',
    year: '1990',
    location: 'ישראל'
  }
];

// נתוני מסמכים היסטוריים
export const historicalDocuments = [
  {
    id: 'reference-card-1',
    title: 'כרטיס רישום של מרים אופנהיימר',
    imageSrc: '/images/documents/reference-card-1.jpg',
    thumbnailSrc: '/images/documents/thumbs/reference-card-1-thumb.jpg',
    date: '1945',
    description: 'כרטיס רישום רשמי של מרים אופנהיימר לאחר השחרור',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434671#1',
    translation: 'כרטיס רישום של מרים אופנהיימר, ילידת לייפציג 24.10.1925, ששוחררה ממחנה ניישטדט ב-2 במאי 1945.'
  },
  {
    id: 'reference-card-2',
    title: 'כרטיס הפליטים של מרים',
    imageSrc: '/images/documents/reference-card-2.jpg',
    thumbnailSrc: '/images/documents/thumbs/reference-card-2-thumb.jpg',
    date: '1945-1946',
    description: 'כרטיס פליטים שניתן למרים על ידי רשויות בעלות הברית',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434672#1',
    translation: 'כרטיס פליטים מספר 348248 עבור מרים אופנהיימר, המאשר את מעמדה כפליטה ואת זכאותה לסיוע.'
  },
  {
    id: 'leipzig-certificate',
    title: 'תעודת לידה מלייפציג',
    imageSrc: '/images/documents/leipzig-certificate.jpg',
    thumbnailSrc: '/images/documents/thumbs/leipzig-certificate-thumb.jpg',
    date: '1925',
    description: 'העתק של תעודת הלידה המקורית של מרים אופנהיימר מלייפציג',
    source: 'ארכיון משפחת אופנהיימר',
    archiveNumber: '',
    translation: 'תעודת לידה מקורית המעידה על לידתה של מרים אופנהיימר בתאריך 24 באוקטובר 1925 בעיר לייפציג, גרמניה.'
  },
  {
    id: 'deportation-order',
    title: 'צו גירוש למזרח',
    imageSrc: '/images/documents/deportation-order.jpg',
    thumbnailSrc: '/images/documents/thumbs/deportation-order-thumb.jpg',
    date: '1944',
    description: 'צו הגירוש של מרים ואביה ממחנה דרנסי למזרח (אושוויץ)',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434673#1',
    translation: 'צו העברה ממחנה דרנסי למזרח (אושוויץ) הכולל את שמותיהם של מרים ואביה אברהם אופנהיימר.'
  },
  {
    id: 'auschwitz-registration',
    title: 'רישום הכניסה לאושוויץ',
    imageSrc: '/images/documents/auschwitz-registration.jpg',
    thumbnailSrc: '/images/documents/thumbs/auschwitz-registration-thumb.jpg',
    date: 'אפריל 1944',
    description: 'מסמך רישום הכניסה למחנה אושוויץ-בירקנאו',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434674#1',
    translation: 'רישום כניסה למחנה אושוויץ-בירקנאו של מרים אופנהיימר. המסמך כולל את המספר שקיבלה ואת תאריך הגעתה למחנה.'
  },
  {
    id: 'neustadt-release',
    title: 'אישור שחרור ממחנה ניישטדט',
    imageSrc: '/images/documents/neustadt-release.jpg',
    thumbnailSrc: '/images/documents/thumbs/neustadt-release-thumb.jpg',
    date: '2 במאי 1945',
    description: 'אישור השחרור הרשמי ממחנה ניישטדט על ידי הצבא הסובייטי',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434676#1',
    translation: 'מסמך שחרור רשמי המאשר את שחרורה של מרים אופנהיימר ממחנה ניישטדט-גלווה בתאריך 2 במאי 1945 על ידי הצבא הסובייטי.'
  },
  {
    id: 'refugee-application',
    title: 'בקשת מעמד פליט',
    imageSrc: '/images/documents/refugee-application.jpg',
    thumbnailSrc: '/images/documents/thumbs/refugee-application-thumb.jpg',
    date: 'יוני 1945',
    description: 'טופס בקשה למעמד פליט שהוגש לרשויות בצרפת',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434677#1',
    translation: 'בקשה רשמית למעמד פליט שהוגשה על ידי מרים אופנהיימר לאחר חזרתה לליון, צרפת ביוני 1945.'
  },
  {
    id: 'israel-certificate',
    title: 'אישור העלייה לישראל',
    imageSrc: '/images/documents/israel-certificate.jpg',
    thumbnailSrc: '/images/documents/thumbs/israel-certificate-thumb.jpg',
    date: 'אפריל 1948',
    description: 'אישור העלייה לארץ ישראל שהונפק למרים',
    source: 'ארכיון המשפחה',
    archiveNumber: '',
    translation: 'אישור זה מעיד כי מרים אופנהיימר קיבלה היתר עלייה לארץ ישראל במסגרת עליית הנוער.'
  },
  {
    id: 'hefetz-haim-record',
    title: 'רשומת קיבוץ חפץ חיים',
    imageSrc: '/images/documents/hefetz-haim-record.jpg',
    thumbnailSrc: '/images/documents/thumbs/hefetz-haim-record-thumb.jpg',
    date: '1948-1951',
    description: 'רשומת חברות של מרים בקיבוץ חפץ חיים',
    source: 'ארכיון קיבוץ חפץ חיים',
    archiveNumber: '',
    translation: 'רשומת חברות עבור מרים אופנהיימר, המתעדת את תקופת שהותה בקיבוץ ואת עבודתה במטבח ובחינוך.'
  },
  {
    id: 'search-request',
    title: 'בקשת איתור משפחה',
    imageSrc: '/images/documents/search-request.jpg',
    thumbnailSrc: '/images/documents/thumbs/search-request-thumb.jpg',
    date: '1945-1946',
    description: 'בקשה לאיתור בני משפחה לאחר המלחמה',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434678#1',
    translation: 'טופס בקשה לאיתור בני משפחה שהוגש על ידי מרים אופנהיימר לאחר המלחמה, בניסיון לאתר קרובי משפחה ששרדו.'
  },
  {
    id: 'letter-1955',
    title: 'מכתב ממרים לישעי',
    imageSrc: '/images/documents/letter-1955.jpg',
    thumbnailSrc: '/images/documents/thumbs/letter-1955-thumb.jpg',
    date: '1955',
    description: 'מכתב שכתבה מרים לבעלה ישעי בזמן שירות המילואים שלו',
    source: 'ארכיון המשפחה',
    archiveNumber: '',
    translation: 'ישעי היקר שלי לאי"ט, אחרון אחרון חביב. להורים ולכפר פינס סיימתי עכשיו מכתבים. התאכזבתי מאוד שעד היום, פרט לשני המכתבים הראשונים, לא קבלתי ממך דואר שיאשר לי קבלת מכתבי...'
  },
  {
    id: 'testimony',
    title: 'עדות ממשפט אייכמן',
    imageSrc: '/images/documents/testimony.jpg',
    thumbnailSrc: '/images/documents/thumbs/testimony-thumb.jpg',
    date: '1961',
    description: 'עדות כתובה שהגישה מרים במשפט אייכמן',
    source: 'ארכיון יד ושם',
    archiveNumber: 'TR-3/1112',
    translation: 'עדות על קורותיה של מרים אופנהיימר יעקובסון במחנה אושוויץ ובצעדת המוות, כפי שהוגשה כראיה במשפט אייכמן.'
  },
  {
    id: 'displacement-record',
    title: 'תיעוד עקירה ופליטות',
    imageSrc: '/images/documents/displacement-record.jpg',
    thumbnailSrc: '/images/documents/thumbs/displacement-record-thumb.jpg',
    date: '1946',
    description: 'תיעוד רשמי של מסלול העקירה והפליטות',
    source: 'ארכיון ITS (שירות האיתור הבינלאומי)',
    archiveNumber: '106434684#1',
    translation: 'מסמך המתעד את מסלול העקירה והפליטות של מרים אופנהיימר מגרמניה דרך בלגיה וצרפת ועד למחנות ההשמדה והשחרור.'
  }
];

// ציטוטים נבחרים מהסיפור
export const quotes = [
  {
    text: "הם לא ניצחו אותנו, אנחנו ניצחנו אותם",
    source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
    page: 95,
    context: "על חייה במחנה אושוויץ"
  },
  {
    text: "אני מרגישה שבכל המצבים הזכורים לי, זכיתי להרבה חסדים ואהבה וסיעתא דשמיא",
    source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
    page: 111,
    context: "מבט אחורה על חייה"
  },
  {
    text: "בכל המצבים הקשים ביותר שהיינו בהם, תמיד היו אנשים טובים שהושיטו יד",
    source: "מרים יעקובסון, עדות בעל פה",
    page: null,
    context: "על החסד שזכתה לו לאורך חייה"
  },
  {
    text: "זוהי נקמתנו בנאצים הארורים, ימ\"ש: ילדים קטנים נוהרים לגן, ל'חיידר' ולבית הספר",
    source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
    page: 112,
    context: "על החיים בישראל וניצחון הרוח היהודית"
  },
  {
    text: "גם בתופת זו, איבדנו את כל הכבוד האנושי. יום אחד אני רוצה לספר לכם ולבני המשפחה את סיפור ה'חיים' באושוויץ, אך עדיין המילים לא מסוגלות לתאר",
    source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
    page: 94,
    context: "על התקופה באושוויץ"
  },
  {
    text: "אם אני סוקרת תקופה של למעלה משישים שנה, עלי להשתאות מה גדולה הישועה ומה גודל התמורה שהתחוללה בחיי. אלוליא חויתי, לא הייתי מאמינה",
    source: "מרים יעקובסון, מתוך 'מאפילה לאורה'",
    page: 111,
    context: "במבט לאחור על חייה"
  }
];

// תוכן הפרקים
export const chaptersContent = {
  childhood: {
    title: "ילדות בלייפציג (1925-1938)",
    subtitle: "שנות הילדות והנעורים בגרמניה",
    paragraphs: [
      "מרים אופנהיימר נולדה ב-ז׳ מרחשוון ה׳תרפ״ה (24 באוקטובר 1925) בעיר לייפציג שבמרכז גרמניה. היא הייתה בת למשפחה יהודית שומרת מצוות. אביה, ר׳ אברהם (רפאל) אופנהיימר הי״ד, היה הבכור מבין 15 אחים ואחיות. אמה, מטל לבית אטלינגר, הייתה השנייה משלוש אחיות.",
      "אביה של מרים עבד כסוכן מכירות של יינות, תפקיד שדרש ממנו נסיעות רבות. למרות זאת, הוא הקפיד על שמירת מצוות גם בתנאים הקשים של החזית בזמן מלחמת העולם הראשונה, בה שירת כחייל גרמני.",
      "הבית בלייפציג היה בית יהודי חם ופתוח לאורחים. מרים גדלה יחד עם אחיותיה אסתר וקלה. היא למדה בבית ספר יהודי בעיר, שהיה חלק מקהילה יהודית מפוארת ותוססת. לייפציג הייתה ידועה כמרכז מסחרי חשוב, וסוחרים יהודים רבים מרחבי אירופה הגיעו אליה מדי שנה.",
      "בשנת 1933, עם עליית הנאצים לשלטון, השתנו חייהם של יהודי גרמניה. המשפחה עברה לתקופה קצרה לשווייץ, אך נאלצה לחזור ללייפציג כיוון שאזרחים זרים לא הורשו לעבוד שם. בחזרתם, חיי היהודים בגרמניה הפכו קשים יותר ויותר.",
      "בלייפציג של שנות ה-30, למרות המצב הקשה, אביה של מרים המשיך להתפלל בבית הכנסת של יהודי מזרח אירופה, שם הרגיש בנוח יותר מאשר בבית הכנסת המפואר של הקהילה. הוא גם דאג לחינוך היהודי של בנותיו, והביא מלמד שיעשיר את ידיעותיהן בתורה.",
      "לאחר 'ליל הבדולח' בנובמבר 1938, כשהמצב הפך מסוכן עוד יותר, החליט אביה של מרים לברוח לבלגיה. הוא עזב ראשון, ולאחר מכן סודר עבור מרים ואחיותיה מעבר הגבול באמצעות דרכון מזויף."
    ],
    images: [
      {
        id: 'leipzig-synagogue',
        src: '/images/historical/leipzig-synagogue.jpg',
        alt: 'בית הכנסת בלייפציג',
        caption: 'בית הכנסת הגדול בלייפציג שנחרב בליל הבדולח, 1938'
      },
      {
        id: 'family-leipzig',
        src: '/images/family/leipzig-family.jpg',
        alt: 'משפחת אופנהיימר בלייפציג',
        caption: 'משפחת אופנהיימר בלייפציג, שנות ה-30. מימין: מטל (האם), מרים, אסתר וקלה'
      }
    ],
    quotes: [0, 5] // אינדקסים למערך הציטוטים הכללי
  },
  
  // המשך מבנה נתונים עבור שאר הפרקים...
};

export default {
  journeyLocations,
  galleryImages,
  historicalDocuments,
  quotes,
  chaptersContent
};ניצה, צרפת',
    latitude: 43.7102,
    longitude: 7.2620,
    dateRange: '1942-1943',
    description: 'עם התפשטות הכיבוש הגרמני לדרום צרפת, נדדה המשפחה דרומה ומצאה מקלט זמני בניצה, שהייתה תחת כיבוש איטלקי.'
  },
  {
    id: 'grenoble',
    name: 'גרנובל, צרפת',
    latitude: 45.1885,
    longitude: 5.7245,
    dateRange: '1943-1944',
    description: 'המשפחה עברה לגרנובל והסתתרה שם. במרץ 1944 נעצרו מרים ואביה על ידי הגסטפו ונשלחו למחנה דרנסי ליד פריז.'
  },
  {
    id: 'drancy',
    name: 'דרנסי, צרפת',
    latitude: 48.9125,
    longitude: 2.4467,
    dateRange: 'מרץ-אפריל 1944',
    description: 'מרים ואביה נכלאו במחנה דרנסי, מחנה מעבר שממנו יצאו משלוחים למחנות ההשמדה במזרח אירופה. במחנה זה חגגו את חג הפסח בתנאים קשים.'
  },
  {
    id: 'auschwitz',
    name: 'אושוויץ, פולין',
    latitude: 50.0343,
    longitude: 19.1793,
    dateRange: 'אפריל 1944 - ינואר 1945',
    description: 'מרים שרדה במחנה ההשמדה אושוויץ-בירקנאו בתנאים אכזריים. היא עבדה במיון בגדים של הנרצחים ושמרה על אמונתה למרות הקשיים. בסלקציה היא נפרדה מאביה, שלא שרד.'
  },
  {
    id: 'ravensbrück',
    name: 'רוונסבריק, גרמניה',
    latitude: 53.1919,
    longitude: 13.1702,
    dateRange: 'ינואר 1945',
    description: 'עם התקרבות הצבא הסובייטי לאושוויץ, הוצאו האסירים ל"צעדת המוות" לתוך גרמניה. מרים עברה דרך מחנה הריכוז רוונסבריק.'
  },
  {
    id: 'neustadt',
    name: 'ניישטדט-גלווה, גרמניה',
    latitude: 53.3645,
    longitude: 10.9613,
    dateRange: 'פברואר-מאי 1945',
    description: 'מרים שהתה במחנה ניישטדט עד לשחרור על ידי הצבא הסובייטי ב-2 במאי 1945.'
  },
  {
    id: 'lyon-return',
    name: 'ליון (חזרה), צרפת',
    latitude: 45.7640,
    longitude: 4.8357,
    dateRange: '1945-1948',
    description: 'מרים חזרה לליון לחפש את משפחתה. היא גילתה שאביה לא שרד, אך אחיותיה ניצלו. בתקופה זו עבדה בליון עם משפחת סמואל בטיפול בילדים יהודים יתומים מהמלחמה.'
  },
  {
    id: 'marseille',
    name: 'מרסיי, צרפת',
    latitude: 43.2965,
    longitude: 5.3698,
    dateRange: 'אפריל 1948',
    description: 'מרים הפליגה לארץ ישראל מנמל מרסיי עם 40 ילדים שהיו מיועדים להיקלט במוסדות פא"י בארץ.'
  },
  {
    id: 'haifa',
    name: 'חיפה, ישראל',
    latitude: 32.7940,
    longitude: 34.9896,
    dateRange: 'אפריל 1948',
    description: 'מרים הגיעה לחיפה באונייה ממרסיי. בנמל חיפה קידמו את פניה יהודים טובים, ביניהם יעקב כ"ץ ושלמה גרינפלד ז"ל.'
  },
  {
    id: 'pardes-hanna',
    name: 'פרדס חנה, ישראל',
    latitude: 32.4760,
    longitude: 34.9777,
    dateRange: 'אפריל-מאי 1948',
    description: 'מרים שהתה במחנה פרדס חנה (מחנה 80) עד שהילדים שהיו בהשגחתה נקלטו במוסדות.'
  },
  {
    id: 'hefetz-haim',
    name: 'קיבוץ חפץ חיים, ישראל',
    latitude: 31.7579,
    longitude: 34.7563,
    dateRange: '1948-1951',
    description: 'מרים הצטרפה לקיבוץ חפץ חיים. היא עבדה במטבח, סייעה לעולי הנוער, והייתה פעילה בחיי הקיבוץ.'
  },
  {
    id: 'beit-chilkiya',
    name: 'בית חלקיה, ישראל',
    latitude: 31.7947,
    longitude: 34.8192,
    dateRange: '1952-2023',
    description: 'מרים וישעי יעקובסון הקימו את ביתם בבית חלקיה. בתנאים צנועים גידלו את ילדיהם, מיכל ורפי, וראו בהקמת המשפחה את הניצחון האמיתי על הנאצים.'
  }
];

export default {
  journeyLocations,
  galleryImages,
  historicalDocuments,
  quotes,
  chaptersContent
};

