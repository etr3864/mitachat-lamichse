import { verdictLabels, type Verdict } from "@/content/verdicts";

const tones: Record<Verdict, string> = {
  myth: "border-amber text-amber",
  "not-myth": "border-truth text-truth",
  unknown: "border-steel text-dim",
};

/** ״לא יודעים״ gets its own chip, with no apology attached. */
export function VerdictChip({ verdict }: { verdict: Verdict }) {
  return (
    <span
      className={`rounded-chip border px-3 py-1.5 text-[13px] font-bold tracking-[0.08em] ${tones[verdict]}`}
    >
      {verdictLabels[verdict]}
    </span>
  );
}
