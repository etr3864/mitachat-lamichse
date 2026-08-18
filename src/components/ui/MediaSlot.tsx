import Image from "next/image";

export type MediaSlotProps = {
  /** Path under /public. Until it exists the schematic placeholder is shown. */
  src?: string;
  /** Poster-less video takes precedence over `src`. */
  video?: string;
  alt?: string;
  /** Shooting brief, shown in the placeholder so the frame is never empty. */
  brief: string;
  code?: string;
  priority?: boolean;
  /** Drops the caption, for frames that sit behind other artwork. */
  quiet?: boolean;
  className?: string;
};

/**
 * Every photographic frame on the site goes through this component, so an empty
 * slot still reads as a drafted frame rather than a broken layout.
 */
export function MediaSlot({
  src,
  video,
  alt = "",
  brief,
  code = "MEDIA",
  priority = false,
  quiet = false,
  className = "",
}: MediaSlotProps) {
  if (video) {
    return (
      <video
        className={`size-full object-cover ${className}`}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt || undefined}
      />
    );
  }

  if (src) {
    return (
      <div className={`relative size-full ${className}`}>
        <Image src={src} alt={alt} fill sizes="100vw" priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative size-full overflow-hidden bg-cell ${className}`}
      role="img"
      aria-label={brief}
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g stroke="var(--color-line)" strokeWidth={1} vectorEffect="non-scaling-stroke">
          <path d="M-60 300 L280 -40" />
          <path d="M-60 360 L340 -40" />
          <path d="M40 360 L440 -40" />
          <path d="M160 360 L460 60" />
          <path d="M280 360 L480 160" />
        </g>
      </svg>
      {quiet ? null : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
          <span data-ltr className="font-mono text-[10px] tracking-label text-faint">
            {code}
          </span>
          <span className="max-w-[38ch] text-[13px] leading-relaxed text-faint">{brief}</span>
        </div>
      )}
    </div>
  );
}
