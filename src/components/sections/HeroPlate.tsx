"use client";

import { useEffect, useRef } from "react";

import { heroPlate } from "@/content/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A narrow viewport crops straight into the deliberately empty centre channel,
 * which leaves nothing on screen. Shift the crop onto the tool-and-engine band
 * and only centre the frame once there is width to hold all of it.
 */
const PLATE_FIT =
  "size-full object-cover object-[78%_50%] brightness-[0.94] contrast-[1.03] md:object-center md:brightness-[0.91] md:contrast-[1.05]";

/**
 * The plate loop: a glass table shot from underneath, running full-bleed behind
 * the hero copy. It is decoration, so it carries no caption and no controls.
 * A paused video cannot be expressed in CSS, hence the pause on reduced motion.
 */
export function HeroPlate() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    // Autoplay can still be refused on a cold load; nudge it once we are here.
    // iOS sometimes scrolls the playing video into view — pin the page at top.
    void video.play().then(() => window.scrollTo(0, 0)).catch(() => undefined);
  }, [reduced]);

  return (
    <video
      ref={videoRef}
      className={PLATE_FIT}
      poster={heroPlate.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={heroPlate.webm} type="video/webm" />
      <source src={heroPlate.mp4} type="video/mp4" />
    </video>
  );
}
