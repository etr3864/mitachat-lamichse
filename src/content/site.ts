export const site = {
  name: "מתחת למכסה המנוע",
  tagline: "על בינה מלאכותית, טכנולוגיה ומה שביניהם",
  mission:
    "אנחנו עוזרים לאנשים סקרנים וחוקרים להבין את הרעיונות העמוקים שמסתתרים מתחת למכסה המנוע של הבינה המלאכותית וקצה הטכנולוגיה - בלי הייפ. ובלי בולשיט.",
  cadence: "NEW EPISODE EVERY OTHER WEEK",
  url: "https://mitachat-lamichse.com",
} as const;

export const cta = {
  label: "דברו איתנו",
  href: "/#contact",
} as const;

/** Listen chips in the hero. Empty href renders as disabled until the URLs land. */
export const platforms = [
  { id: "spotify", label: "ספוטיפיי", short: "ספוטיפיי", href: "" },
  { id: "youtube", label: "יוטיוב", short: "יוטיוב", href: "https://www.youtube.com/@UTH-Official" },
] as const;

/** Fill in the real URLs once the accounts are live; an empty href renders as disabled. */
export const socials = [
  { id: "spotify", label: "ספוטיפיי", href: "", kind: "listen" },
  { id: "youtube", label: "יוטיוב", href: "https://www.youtube.com/@UTH-Official", kind: "listen" },
  { id: "instagram", label: "אינסטגרם", href: "", kind: "follow" },
  { id: "tiktok", label: "טיקטוק", href: "", kind: "follow" },
  { id: "facebook", label: "פייסבוק", href: "", kind: "follow" },
  { id: "linkedin", label: "לינקדאין", href: "", kind: "follow" },
] as const;

export type SocialId = (typeof socials)[number]["id"];
export type PlatformId = (typeof platforms)[number]["id"];
export type SocialMarkId = SocialId | PlatformId;

export const contact = {
  heading: "יש משהו שאתם רוצים שנדבר עליו לעומק?",
  body: "תרשמו לנו ונצלול אל מתחת למכסה המנוע של הנושא שלכם בפודקאסט הבא:",
  email: "etantur@gmail.com",
  /** FormSubmit endpoint — delivers contact ideas to the inbox above. */
  formAction: "https://formsubmit.co/etantur@gmail.com",
} as const;
