import type { ElementType, ReactNode } from "react";

/** The one horizontal rhythm on the site: 40px gutters, tightened on phones. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag id={id} className={`px-6 md:px-10 ${className}`}>
      {children}
    </Tag>
  );
}
