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
  socials: HostSocial[];
};

export const hosts: Host[] = [
  {
    id: "doron",
    code: "HOST 01",
    title: "דורון סויסה",
    image: "/hosts/doron.png",
    imageBrief: "דיוקן — דורון סויסה",
    tagline: "הצד הטכני — מה באמת רץ מתחת למכסה",
    bio: "דורון מפרק טענות לחלקים שאפשר לבדוק. כשמשהו נשמע יותר מדי נקי, הוא זה שמוציא את המפתח.",
    mood: "steel",
    socials: [
      { id: "facebook", label: "פייסבוק", href: "" },
      { id: "instagram", label: "אינסטגרם", href: "" },
      { id: "tiktok", label: "טיקטוק", href: "" },
      { id: "linkedin", label: "לינקדאין", href: "" },
    ],
  },
  {
    id: "eitan",
    code: "HOST 02",
    title: "איתן טורגמן",
    image: "/hosts/eitan.png",
    imageBrief: "דיוקן — איתן טורגמן",
    tagline: "הצד הסקרן — שואל את השאלה שלא נוח לשאול",
    bio: "איתן מכניס את השאלה שמחזיקה את הפרק. לא מספיק שזה עובד — צריך להבין למה, ולמי זה משנה.",
    mood: "warm",
    socials: [
      { id: "facebook", label: "פייסבוק", href: "" },
      { id: "instagram", label: "אינסטגרם", href: "" },
      { id: "tiktok", label: "טיקטוק", href: "" },
      { id: "linkedin", label: "לינקדאין", href: "" },
    ],
  },
];

export const about = {
  code: "02",
  heading: "מי אנחנו",
  label: "TWO PEOPLE, ONE TABLE",
  body: "שולחן אחד, שני מנחים. דורון סויסה ואיתן טורגמן — כל פרק טענה אחת, עד שרואים מה באמת רץ מתחת למכסה.",
} as const;
