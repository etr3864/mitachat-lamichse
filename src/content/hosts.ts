export type HostSocialId = "facebook" | "instagram" | "tiktok" | "linkedin";

export type HostSocial = {
  id: HostSocialId;
  label: string;
  href: string;
};

export type Host = {
  id: string;
  code: string;
  title: string;
  image: string;
  imageBrief: string;
  /** One line on the card — sets the visual mood. */
  tagline: string;
  /** Shown when the card opens. */
  bio: string;
  /** Cool steel for Doron, warm amber for Eitan. */
  mood: "steel" | "warm";
  /** Wide crops get side + bottom fade — no scale, heads stay in frame. */
  portrait?: { wide?: boolean };
  socials: HostSocial[];
};

export const hosts: Host[] = [
  {
    id: "doron",
    code: "HOST 01",
    title: "דורון סויסה",
    image: "/hosts/doron.png",
    imageBrief: "דיוקן, דורון סויסה",
    tagline: "מהנדס תוכנה ו-Solutions Engineer. פולסטאק, ארכיטקטורה, אוטומציה ומחקר AI.",
    bio: "דורון הוא מהנדס תוכנה ו-Solutions Engineer עם רקע בפיתוח full-stack: React, TypeScript, Flask ומערכות real-time. הוא מתמחה בתכנון ובנייה של ארכיטקטורות scalable, אוטומציה ומערכות שמחברות בין צורך עסקי ליישום טכני. בוגר הנדסת תוכנה ב-SCE, היה מרצה במכללה, עם מחקר בתחום הבינה המלאכותית. כיום CTO ב-Kliento. הגישה שלו automation-first: מערכות מותאמות למטרה, ותרגום דרישות מוצר לקוד שעומד בעומס.",
    mood: "steel",
    portrait: { wide: true },
    socials: [
      { id: "facebook", label: "פייסבוק", href: "https://www.facebook.com/doronss" },
      { id: "instagram", label: "אינסטגרם", href: "https://www.instagram.com/doronswisa/" },
      { id: "tiktok", label: "טיקטוק", href: "https://www.tiktok.com/@doronswisa1" },
      { id: "linkedin", label: "לינקדאין", href: "https://www.linkedin.com/in/doron-swisa/" },
    ],
  },
  {
    id: "eitan",
    code: "HOST 02",
    title: "איתן טורגמן",
    image: "/hosts/eitan.png",
    imageBrief: "דיוקן, איתן טורגמן",
    tagline: "מפתח תוכנה ופתרונות AI. ארכיטקטורת מערכות, אוטומציה, וניסיון מוכח בשיווק וביצוע.",
    bio: "איתן הוא מפתח תוכנה ו-AI Solutions Developer עם רקע מוכח באסטרטגיה שיווקית וביצוע. הוא מתכנן, בונה ומיישם מערכות AI לעסקים: סוכנים, צינורות אוטומציה וארכיטקטורות שמקשרות טכנולוגיה לתוצאות עסקיות מדידות, ממכירות ולידים ועד שימור לקוחות. בתחילת הדרך ניהל קמפיינים בתשלום בגוגל, מטא ופלטפורמות נוספות, עם תקציבים חודשיים שעברו מיליון שקלים בניהולו. לאחר מכן ייעץ לעשרות עסקים על אסטרטגיה, משפכים ובחירת פלטפורמות, והקים מאפס פלטפורמת AI כ-CTO ושותף ב-Optive. כיום Head of Operations ב-Kliento, שם הוא אחראי על בנייה ותפעול של מערכות AI, CRM ומרכזיות. עובד ב-Python וב-JavaScript, עם הסמכה בשיווק ופיתוח AI.",
    mood: "warm",
    portrait: { wide: true },
    socials: [
      { id: "facebook", label: "פייסבוק", href: "https://www.facebook.com/etantur" },
      { id: "instagram", label: "אינסטגרם", href: "https://www.instagram.com/eytan.turgeman/" },
      { id: "linkedin", label: "לינקדאין", href: "https://www.linkedin.com/in/eytan-turgeman-269b5220b/" },
    ],
  },
];

export const about = {
  code: "02",
  heading: "מי אנחנו",
  label: "OUR MISSION",
  body: "המטרה שלנו לחבר בין מה שמספרים לבין מה שאפשר לבדוק בפועל. דורון ואיתן מגיעים משני עולמות: פיתוח, ארכיטקטורה ומחקר AI מצד אחד, שיווק ויישום מערכות AI מצד שני. ביחד אנחנו רוצים לתת לטענות מקום לעמוד מול העובדות.",
} as const;
