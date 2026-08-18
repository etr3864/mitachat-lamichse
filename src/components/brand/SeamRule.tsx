/**
 * קו התפר — a horizontal seam broken by one lifted segment. The channel's
 * signature: it separates title from body, speaker from speaker, myth from answer.
 */
export function SeamRule({
  segment = 56,
  lift = -9,
  className = "",
}: {
  /** Width of the lifted amber segment, in pixels. */
  segment?: number;
  /** Tilt of that segment, in degrees. */
  lift?: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-blueprint" />
      <span
        className="h-px flex-none bg-amber"
        style={{
          width: segment,
          transform: `translateY(-${Math.abs(lift)}px) rotate(${lift}deg)`,
        }}
      />
      <span className="h-px flex-1 bg-blueprint" />
    </div>
  );
}

/** The seam reduced to a leader line: node, rule, label. One per composition. */
export function LeaderRule({
  width = 64,
  accent = true,
  className = "",
}: {
  width?: number;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex flex-none items-center ${className}`} aria-hidden="true">
      <span
        className={`size-[7px] flex-none rounded-full border ${
          accent ? "border-amber" : "border-steel-light"
        }`}
      />
      <span
        className={`h-px ${accent ? "bg-amber" : "bg-blueprint"}`}
        style={{ width }}
      />
    </span>
  );
}
