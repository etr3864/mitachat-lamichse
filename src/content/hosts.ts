export type Host = {
  id: string;
  code: string;
  title: string;
  /** Portrait path under /public once the photos exist. */
  image?: string;
  imageBrief: string;
};

export const hosts: Host[] = [
  {
    id: "doron",
    code: "HOST 01",
    title: "דורון סויסה",
    imageBrief: "דיוקן — דורון סויסה",
  },
  {
    id: "eit",
    code: "HOST 02",
    title: "אית טורגמן",
    imageBrief: "דיוקן — אית טורגמן",
  },
];

export const about = {
  code: "02",
  heading: "מי אנחנו",
  label: "TWO PEOPLE, ONE TABLE",
  body: "שולחן אחד, שני מנחים. דורון סויסה ואית טורגמן — כל פרק טענה אחת, עד שרואים מה באמת רץ מתחת למכסה.",
} as const;
