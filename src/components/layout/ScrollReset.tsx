"use client";

import { useEffect } from "react";

/** Browsers restore scroll on reload. This site should always open at the top. */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const toTop = () => window.scrollTo(0, 0);
    toTop();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) toTop();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
