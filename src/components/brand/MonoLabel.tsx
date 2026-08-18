import type { ReactNode } from "react";

/**
 * Monospace carries only metadata — numbers, episode codes, leader labels.
 * It is the cue that this is measured information, not a slogan.
 */
export function MonoLabel({
  children,
  tone = "subtle",
  size = "sm",
  className = "",
}: {
  children: ReactNode;
  tone?: "amber" | "subtle" | "faint" | "dim" | "light";
  size?: "xs" | "sm" | "md";
  className?: string;
}) {
  const tones = {
    amber: "text-amber",
    subtle: "text-subtle",
    faint: "text-faint",
    dim: "text-dim",
    light: "text-light",
  } as const;

  const sizes = {
    xs: "text-[10px]",
    sm: "text-[11px]",
    md: "text-xs",
  } as const;

  return (
    <span
      data-ltr
      className={`font-mono ${sizes[size]} tracking-label ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
