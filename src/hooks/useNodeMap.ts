"use client";

import { useCallback, useRef } from "react";

/**
 * Keyed ref collection, so an animated scene can grab dozens of elements
 * without declaring a `useRef` for each one.
 *
 *   const { nodes, setNode } = useNodeMap<HTMLDivElement>();
 *   <div ref={setNode("bar")} />
 *   nodes.current.bar?.style.setProperty("width", "40%");
 */
export function useNodeMap<T extends Element = HTMLElement>() {
  const nodes = useRef<Record<string, T | null>>({});

  const setNode = useCallback(
    (key: string) => (element: T | null) => {
      nodes.current[key] = element;
    },
    [],
  );

  return { nodes, setNode };
}
