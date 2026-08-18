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
    title: "המכסה שהורם",
    body: "הכותרת, הדמו והפוסט. הטענה כמו שהיא מגיעה אליך.",
    markY: 9.5,
  },
  {
    code: "02",
    title: "מה שמספרים לך",
    body: "ההסבר הרשמי — הגרסה שנשמעת הגיונית עד שבודקים אותה.",
    markY: 25.5,
  },
  {
    code: "03",
    title: "איך זה עובד בפועל",
    body: "מה המודל באמת עושה, על אילו נתונים, ומתי זה מפסיק לעבוד.",
    markY: 39.5,
  },
  {
    code: "04",
    title: "הפירוק לגורמים",
    body: "הטענה נחתכת לחלקים שאפשר לבדוק — כל חלק ותשובה משלו.",
    markY: 53.5,
  },
  {
    code: "05",
    title: "מה שעדיין לא ידוע",
    body: "הצמתים שנשארים פתוחים. גם עליהם אומרים בפירוש.",
    markY: 63.7,
  },
];

export const methodIntro = {
  code: "01",
  heading: "השיטה",
  label: "SCROLL — DISASSEMBLE / FIVE LAYERS DOWN",
} as const;
