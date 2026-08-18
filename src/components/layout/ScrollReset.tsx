"use client";

import { useEffect } from "react";

/**
 * Mobile Chrome/Safari restore the last scroll after paint — and a tall
 * method section makes that land halfway down the page. Kill restoration
 * as early as the client can, and again after load/video.
 */
export function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const toTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    toTop();
    const frame = requestAnimationFrame(toTop);
    window.addEventListener("load", toTop);
    window.addEventListener("pageshow", toTop);
    window.addEventListener("beforeunload", toTop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", toTop);
      window.removeEventListener("pageshow", toTop);
      window.removeEventListener("beforeunload", toTop);
    };
  }, []);

  return null;
}
