import { MonoLabel } from "./MonoLabel";

export function SectionHeading({
  code,
  heading,
  label,
}: {
  code: string;
  heading: string;
  label?: string;
}) {
  return (
    <div className="mb-14 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-rule pb-4">
      <MonoLabel tone="amber">{code}</MonoLabel>
      <h2 className="text-[clamp(26px,3vw,34px)] font-bold tracking-[-0.02em]">{heading}</h2>
      {label ? (
        <MonoLabel tone="subtle" size="xs">
          {label}
        </MonoLabel>
      ) : null}
    </div>
  );
}
