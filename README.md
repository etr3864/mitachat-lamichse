# מתחת למכסה המנוע

אתר הפודקאסט — Next.js (App Router), TypeScript, Tailwind v4.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
npm run typecheck
```

## איפה לערוך מה

**טקסטים ותוכן** — הכול ב־`src/content/`, בלי לגעת בקומפוננטות:

| קובץ | מה יש בו |
| --- | --- |
| `site.ts` | שם, שורת הקשר, המסר, ניווט, פלטפורמות, מייל |
| `method.ts` | חמש שכבות השיטה (גם הטקסט וגם לאיזו שכבה בלוגו כל אחת מתחברת) |
| `verdicts.ts` | שלוש הפסיקות של הפורמט (`myth` / `not-myth` / `unknown`) |
| `hosts.ts` | שני המנחים והפסקאות של ״מי אנחנו״ |
| `graph.ts` | צמתים וקשתות של גרף הידע |

**צבעים** — `src/lib/tokens.ts` הוא המקום היחיד שבו כתוב קוד צבע. משם הוא נכנס
כמשתני CSS ב־`layout.tsx`, ו־`globals.css` ממפה אותם ל־`--color-*` של Tailwind.
כלומר `bg-ink`, `text-amber`, `border-rule` וכו׳ מגיעים כולם מאותו מקור.

**תמונות ווידאו** — כל מסגרת עוברת דרך `MediaSlot`. עד שיש חומר אמיתי היא
מציירת מסגרת שרטוט עם הבריף. כשיש קובץ, שמים אותו ב־`public/` ומעבירים
`src="/..."` או `video="/..."`.

## מבנה

```
src/
├── app/                  layout, page, globals.css
├── content/              כל הטקסט והדאטה
├── lib/                  tokens, math, viewport
├── hooks/                useScrollDriver, useNodeMap, useReducedMotion
└── components/
    ├── brand/            LogoMark, Lockup, SeamRule, VerdictChip, MonoLabel, SectionHeading
    ├── layout/           SiteHeader, SiteFooter, Container
    ├── ui/               MediaSlot
    └── sections/
        ├── Hero, HoodSeam, About, Contact
        ├── method/       MethodStage + EngineSchematic + LayerCallout + useMethodStage
        └── graph/        KnowledgeGraph + graph-paths + useKnowledgeGraph
```

## שני הדברים שכדאי להכיר לפני שממשיכים לעצב

**הלוגו נוצר מטבלה, לא מ־SVG ידני.** `components/brand/mark-geometry.ts` מחזיק
שתי גרסאות: `stack` (הסימן, עד חמש שכבות) ו־`bar` (הלוקאפ, שלוש שכבות בקווים
עבים יותר). שינוי שם משנה את הלוגו בכל מקום — כולל האנימציה שמרכיבה אותו.

**סכמת המנוע נוצרת מפרמטרים.** `sections/method/engine-schematic.ts` בונה את
השרטוט מרשימת מרכזי צילינדרים, גובה בוכנות ורדיוס גל ארכובה. כל חלק נושא וקטור
`dx`/`dy` — הכיוון שבו הוא נוסע כשההרכבה מתפרקת. הוספת צילינדר חמישי היא שורה
אחת במערך `BORES`.

## אנימציה

כל האנימציות רצות דרך `useScrollDriver` — rAF אחד לפריים, כתיבה ישירה ל־DOM בלי
רינדור מחדש. מרכוז נשאר ב־CSS (על תכונת `translate`), וה־JS כותב רק ל־`transform`,
כדי ששני המקורות לא יכפילו את אותה הזזה.

`prefers-reduced-motion` מטופל ב־CSS: סקשן השיטה מחליף את סצנת הגלילה ברשימה
סטטית, וגרף הידע מוצג מצויר מלכתחילה.
