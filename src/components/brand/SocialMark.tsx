import type { ReactNode, SVGProps } from "react";
import type { SocialMarkId } from "@/content/site";

/**
 * Platform marks in the same language as the logo: hairline bars, a 2px chip
 * corner, and a hollow node. Colour is `currentColor` so the footer can park
 * them faint and light them amber on hover.
 */
const frame = "M6 4.5h12a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5z";

const icons: Record<SocialMarkId, ReactNode> = {
  facebook: (
    <>
      <path d={frame} />
      <path d="M10 18.5V10h3.6M10 13.6h3" />
    </>
  ),
  instagram: (
    <>
      <path d={frame} />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.9" />
    </>
  ),
  youtube: (
    <>
      <rect x="3.5" y="7.2" width="17" height="9.6" rx="1.5" />
      <path d="M10.6 10.2v3.6L14.8 12z" />
    </>
  ),
  tiktok: (
    <>
      <circle cx="9.2" cy="16.8" r="2.6" />
      <path d="M11.8 16.8V6.6" />
      <path d="M11.8 6.6c1.8.5 3.6 1.8 4.8 2.4" />
    </>
  ),
  linkedin: (
    <>
      <path d={frame} />
      <circle cx="8.6" cy="8.1" r="0.9" />
      <path d="M8.6 10.6v6.8" />
      <path d="M12.4 17.4v-4.2c0-1.2.8-2 2-2s2 .8 2 2v4.2" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="8.1" />
      <path d="M7.6 10.1c2.8-1.3 6-1.3 8.8 0" />
      <path d="M7.6 12.9c2.2-1 4.6-1 6.8 0" />
      <path d="M7.6 15.5c1.6-.7 3.4-.7 5 0" />
    </>
  ),
};

export function SocialMark({
  id,
  className = "",
  ...props
}: { id: SocialMarkId } & Omit<SVGProps<SVGSVGElement>, "viewBox">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`block ${className}`}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={1.15}
        strokeLinejoin="miter"
        strokeLinecap="square"
      >
        {icons[id]}
      </g>
    </svg>
  );
}
