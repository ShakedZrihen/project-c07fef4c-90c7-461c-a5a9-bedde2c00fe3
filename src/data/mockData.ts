import { NewsItem, Desk, Tag, DeskType, MediaItem } from '../types/news';

export const desks: Desk[] = [
  { id: 'iran', name: 'איראן', icon: '🇮🇷', color: '#00BFA5' },
  { id: 'syria', name: 'סוריה', icon: '🇸🇾', color: '#FF6B35' },
  { id: 'lebanon', name: 'לבנון', icon: '🇱🇧', color: '#8B5CF6' },
  { id: 'egypt', name: 'מצרים', icon: '🇪🇬', color: '#F59E0B' },
  { id: 'gaza', name: 'עזה', icon: '🇵🇸', color: '#EF4444' },
];

export const initialTags: Tag[] = [
  { id: '1', name: 'דחוף', color: '#EF4444' },
  { id: '2', name: 'פוליטי', color: '#3B82F6' },
  { id: '3', name: 'צבאי', color: '#10B981' },
  { id: '4', name: 'כלכלי', color: '#F59E0B' },
  { id: '5', name: 'חברתי', color: '#8B5CF6' },
  { id: '6', name: 'הומניטרי', color: '#EC4899' },
];

const generateId = () => Math.random().toString(36).substr(2, 9);

export const generateMockNews = (): NewsItem[] => {
  const mockItems: Omit<NewsItem, 'id' | 'isSelected' | 'notes' | 'keywords'>[] = [
    // Iran
    {
      title: 'מחאות נמשכות בטהראן על רקע המשבר הכלכלי',
      content: 'אלפי מפגינים יצאו לרחובות טהראן במחאה על יוקר המחיה והמשבר הכלכלי המתמשך. כוחות הביטחון נפרסו ברחבי העיר. המשטרה עשתה שימוש בגז מדמיע לפיזור ההפגנות. עדים מדווחים על מעצרים המוניים באזורים שונים של הבירה.',
      source: 'רשתות חברתיות - איראן',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      desk: 'iran',
      tags: ['דחוף', 'חברתי'],
      author: 'כתב מיוחד',
      originalUrl: 'https://example.com/iran-protests',
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=640', title: 'הפגנה בטהראן' },
        { type: 'video', url: 'https://example.com/video1.mp4', title: 'וידאו מהמחאה' },
      ],
    },
    {
      title: 'דיווחים על פיצוצים באזור איספהאן',
      content: 'עדים מדווחים על פיצוצים עזים באזור מתקן הגרעין באיספהאן. הרשויות האיראניות טרם הגיבו לדיווחים. גורמים מודיעיניים מעריכים כי מדובר בתקיפה ממוקדת.',
      source: 'סוכנות פארס',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      desk: 'iran',
      tags: ['דחוף', 'צבאי'],
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=640', title: 'אזור איספהאן' },
      ],
    },
    {
      title: 'ח\'מינאי נואם על "עמידות המשטר" מול הלחצים',
      content: 'המנהיג העליון של איראן נשא נאום בו הדגיש את יציבות המשטר ואת ההתנגדות ללחצים מבחוץ.',
      source: 'תקשורת רשמית',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      desk: 'iran',
      tags: ['פוליטי'],
    },
    // Syria
    {
      title: 'עימותים בין כוחות טורקיים לכורדים בצפון סוריה',
      content: 'חילופי אש כבדים דווחו בין כוחות צבא טורקיה לבין לוחמי SDF באזור תל אביאד. נרשמו נפגעים משני הצדדים.',
      source: 'מצפה לזכויות אדם בסוריה',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      desk: 'syria',
      tags: ['צבאי', 'דחוף'],
    },
    {
      title: 'רעידת אדמה נוספת הורגשה באזור חלב',
      content: 'רעידת אדמה בעוצמה 4.2 הורגשה בבוקר באזור חלב. לא דווח על נזקים או נפגעים.',
      source: 'רשת הסייסמית',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      desk: 'syria',
      tags: ['הומניטרי'],
    },
    {
      title: 'רוסיה מגבירה תמיכה באסד - מטוסי קרב נוספים',
      content: 'דיווחים על הגעת מטוסי קרב רוסיים נוספים לבסיס חמימים. מומחים מעריכים הכנה למבצע רחב היקף.',
      source: 'מקורות מודיעיניים',
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      desk: 'syria',
      tags: ['צבאי', 'פוליטי'],
    },
    // Lebanon
    {
      title: 'חיזבאללה מכריז על כוננות מוגברת בגבול',
      content: 'נסראללה הורה על כוננות מלאה של כוחות חיזבאללה לאורך הגבול עם ישראל בעקבות מתיחות גוברת. הארגון פרסם הודעה רשמית בערוץ הטלגרם שלו.',
      source: 'אל-מנאר',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      desk: 'lebanon',
      tags: ['צבאי', 'דחוף'],
      media: [
        { type: 'video', url: 'https://example.com/hezbollah.mp4', title: 'הודעת חיזבאללה' },
        { type: 'document', url: 'https://example.com/statement.pdf', title: 'הצהרה רשמית' },
      ],
    },
    {
      title: 'משבר הדלק בלבנון מחריף - תורים ארוכים בתחנות',
      content: 'אזרחים לבנונים ממתינים שעות ארוכות בתחנות הדלק על רקע המחסור הקשה. הממשלה קוראת לסיוע בינלאומי.',
      source: 'הארץ',
      timestamp: new Date(Date.now() - 1000 * 60 * 150),
      desk: 'lebanon',
      tags: ['כלכלי', 'הומניטרי'],
    },
    {
      title: 'בחירות לנשיאות לבנון: עדיין ללא מועמד מוסכם',
      content: 'הפרלמנט הלבנוני נכשל פעם נוספת בבחירת נשיא חדש. המשבר הפוליטי ממשיך להעמיק.',
      source: 'רויטרס',
      timestamp: new Date(Date.now() - 1000 * 60 * 300),
      desk: 'lebanon',
      tags: ['פוליטי'],
    },
    // Egypt
    {
      title: 'מצרים מתווכת בין ישראל לחמאס - סבב שיחות חדש',
      content: 'משלחת מצרית בכירה נפגשה עם נציגי חמאס בקהיר במסגרת מאמצי התיווך להשגת הסכם.',
      source: 'אל-אהראם',
      timestamp: new Date(Date.now() - 1000 * 60 * 75),
      desk: 'egypt',
      tags: ['פוליטי', 'דחוף'],
    },
    {
      title: 'מחאות סטודנטים באוניברסיטת קהיר',
      content: 'מאות סטודנטים הפגינו היום באוניברסיטת קהיר במחאה על מדיניות הממשלה. המשטרה פיזרה את ההפגנה.',
      source: 'רשתות חברתיות',
      timestamp: new Date(Date.now() - 1000 * 60 * 200),
      desk: 'egypt',
      tags: ['חברתי'],
    },
    {
      title: 'הסכם כלכלי חדש בין מצרים לסעודיה',
      content: 'שתי המדינות חתמו על הסכם השקעות בהיקף של 10 מיליארד דולר לפיתוח תשתיות בסיני.',
      source: 'סוכנות הידיעות המצרית',
      timestamp: new Date(Date.now() - 1000 * 60 * 350),
      desk: 'egypt',
      tags: ['כלכלי'],
    },
    // Gaza
    {
      title: 'הפצצות כבדות דווחו מרצועת עזה',
      content: 'תושבי הרצועה מדווחים על הפצצות כבדות במרכז עזה. משרד הבריאות מדווח על עשרות נפגעים. צוותי חילוץ פועלים בשטח להוצאת לכודים.',
      source: 'רשתות חברתיות - עזה',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      desk: 'gaza',
      tags: ['דחוף', 'צבאי', 'הומניטרי'],
      media: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1542744173-8659f582f2b2?w=640', title: 'תיעוד מהשטח' },
        { type: 'image', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=640', title: 'צילום נוסף' },
        { type: 'video', url: 'https://example.com/gaza.mp4', title: 'וידאו מעזה' },
      ],
    },
    {
      title: 'שיירת סיוע הומניטרי נכנסה דרך מעבר רפיח',
      content: '50 משאיות סיוע הומניטרי הוכנסו לרצועת עזה דרך מעבר רפיח. הסיוע כולל מזון, מים ותרופות.',
      source: 'או"ם',
      timestamp: new Date(Date.now() - 1000 * 60 * 100),
      desk: 'gaza',
      tags: ['הומניטרי'],
    },
    {
      title: 'חמאס: "לא נסכים לעסקה ללא נסיגה מלאה"',
      content: 'דובר חמאס הבהיר בהודעה כי הארגון לא יסכים לשום עסקה שאינה כוללת נסיגה ישראלית מלאה מהרצועה.',
      source: 'הודעת חמאס',
      timestamp: new Date(Date.now() - 1000 * 60 * 160),
      desk: 'gaza',
      tags: ['פוליטי', 'דחוף'],
    },
    {
      title: 'דיווח: פגיעה בבית חולים בדרום הרצועה',
      content: 'מקורות בעזה מדווחים על פגיעה באזור בית חולים נאסר בחאן יונס. היקף הנזק אינו ברור.',
      source: 'ערוץ אל-ג\'זירה',
      timestamp: new Date(Date.now() - 1000 * 60 * 220),
      desk: 'gaza',
      tags: ['צבאי', 'הומניטרי', 'דחוף'],
    },
  ];

  return mockItems.map(item => ({
    ...item,
    id: generateId(),
    isSelected: false,
    notes: '',
    keywords: [],
  }));
};

export const deskColors: Record<DeskType, string> = {
  iran: '#00BFA5',
  syria: '#FF6B35',
  lebanon: '#8B5CF6',
  egypt: '#F59E0B',
  gaza: '#EF4444',
};
