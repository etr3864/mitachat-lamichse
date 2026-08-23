import { site } from "@/content/site";
import { LogoMark } from "./LogoMark";

type LockupSize = "sm" | "md" | "lg";

const sizes: Record<
  LockupSize,
  { mark: number; variant: "stack" | "bar"; strata: 3 | 4 | 5; text: string; gap: string }
> = {
  sm: { mark: 19, variant: "bar", strata: 3, text: "text-[15px]", gap: "gap-3" },
  md: { mark: 21, variant: "bar", strata: 3, text: "text-[15px] sm:text-[17px]", gap: "gap-3 sm:gap-3.5" },
  lg: { mark: 72, variant: "stack", strata: 5, text: "text-[40px]", gap: "gap-6" },
};

export function Lockup({
  size = "md",
  withTagline = false,
  hollowFill,
}: {
  size?: LockupSize;
  withTagline?: boolean;
  hollowFill?: string;
}) {
  const config = sizes[size];

  return (
    <div className={`flex min-w-0 items-center ${config.gap}`}>
      <LogoMark
        height={config.mark}
        variant={config.variant}
        strataCount={config.strata}
        hollowFill={hollowFill}
        className="flex-none"
      />
      <div className="flex min-w-0 flex-col items-center gap-2.5">
        <span
          className={`${config.text} max-w-full leading-none font-bold tracking-[-0.022em] text-balance sm:whitespace-nowrap`}
        >
          {site.name}
        </span>
        {withTagline ? (
          <span className="flex items-center gap-3.5">
            <span className="h-px w-10 flex-none bg-line" />
            <span className="text-[13.5px] leading-tight whitespace-nowrap text-dim">
              {site.tagline}
            </span>
            <span className="h-px w-10 flex-none bg-line" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
