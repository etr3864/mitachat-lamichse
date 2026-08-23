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
    tagline: "Solutions Engineer ופולסטאק. ארכיטקטורה, אוטומציה ומחקר AI.",
    bio: "דורון הוא Solutions Engineer עם רקע בפיתוח full-stack: React, TypeScript, Flask ומערכות real-time. הוא מתמחה בתכנון ובנייה של ארכיטקטורות scalable, אוטומציה ומערכות שמחברות בין צורך עסקי ליישום טכני. היה מרצה במכללת SCE, עם מחקר בתחום הבינה המלאכותית. כיום CTO ב-Kliento. הגישה שלו automation-first: מערכות מותאמות למטרה, ותרגום דרישות מוצר לקוד שעומד בעומס.",
    mood: "steel",
    portrait: { wide: true },
    socials: [
      { id: "facebook", label: "פייסבוק", href: "" },
      { id: "instagram", label: "אינסטגרם", href: "" },
      { id: "tiktok", label: "טיקטוק", href: "" },
      { id: "linkedin", label: "לינקדאין", href: "https://www.linkedin.com/in/doron-swisa/" },
    ],
  },
  {
    id: "eitan",
    code: "HOST 02",
    title: "איתן טורגמן",
    image: "/hosts/eitan.png",
    imageBrief: "דיוקן, איתן טורגמן",
    tagline: "מפתח פתרונות AI עם רקע בשיווק. מסוכנים ועד אוטומציה, מחובר לתוצאות עסקיות.",
    bio: "איתן הוא AI Solutions Developer עם רקע באסטרטגיה שיווקית. הוא בונה ומיישם מערכות AI לעסקים, מסוכנים ועד צינורות אוטומציה מלאים, ויודע לחבר אותן לתוצאות: מכירות, לידים ושימור לקוחות. הניסיון שלו כולל ניהול קמפיינים בתשלום, ייעוץ שיווקי והקמת פלטפורמת AI מאפס כ-CTO ושותף ב-Optive. כיום Head of Operations ב-Kliento. עובד ב-Python וב-JavaScript, עם הסמכה בשיווק ופיתוח AI.",
    mood: "warm",
    portrait: { wide: true },
    socials: [
      { id: "facebook", label: "פייסבוק", href: "" },
      { id: "instagram", label: "אינסטגרם", href: "" },
      { id: "tiktok", label: "טיקטוק", href: "" },
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
