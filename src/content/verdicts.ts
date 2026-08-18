/** The three verdicts the format allows. Nothing else. */
export type Verdict = "myth" | "not-myth" | "unknown";

export const verdictLabels: Record<Verdict, string> = {
  myth: "מיתוס",
  "not-myth": "לא מיתוס",
  unknown: "תלוי / לא יודעים",
};
