import { clamp01 } from "./math";

/**
 * 0..1 as an element crosses the viewport. `span` shortens the travel, so a
 * value below 1 finishes the animation before the element leaves the screen.
 */
export function crossingProgress(element: Element, span = 1) {
  const rect = element.getBoundingClientRect();
  return clamp01((window.innerHeight - rect.top) / (window.innerHeight * span + rect.height));
}

/** 0..1 across the scrollable length of a tall section with a sticky child. */
export function stickyProgress(element: Element) {
  const rect = element.getBoundingClientRect();
  const travel = rect.height - window.innerHeight;
  return clamp01(-rect.top / (travel || 1));
}
