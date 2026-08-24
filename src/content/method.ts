/**
 * The five strata of the logo mark, and the five steps of the format.
 * Order matters: index 0 is the lifted hood, index 4 is the open question.
 * `markY` is the y-coordinate of the matching stratum inside the 60×66 mark
 * viewBox — it anchors each callout to its own layer during the scroll scene.
 */
export type MethodLayer = {
  code: string;
  title: string;
  body: string;
  markY: number;
};

export const methodLayers: MethodLayer[] = [
  {
    code: "01",
    title: "הרעש",
    body: "כל מה שמדברים על AI וכולם יודעים.",
    markY: 9.5,
  },
  {
    code: "02",
    title: "ההסבר",
    body: "ההסבר הכללי על איך הדברים עובדים.",
    markY: 25.5,
  },
  {
    code: "03",
    title: "הטכנולוגיה",
    body: "צלילה עמוקה יותר למכניזם הטכנולוגי.",
    markY: 39.5,
  },
  {
    code: "04",
    title: "המנגנונים האמיתיים",
    body: "מה שהמפתחי תוכנה מכירים.",
    markY: 53.5,
  },
  {
    code: "05",
    title: "מתחת למכסה המנוע",
    body: "מה שאף אחד לא מדבר עליו. כי זה \"מסובך מדי\".",
    markY: 63.7,
  },
];

export const methodIntro = {
  code: "01",
  heading: "השיטה",
} as const;
