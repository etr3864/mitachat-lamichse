/**
 * Heavy media lives on Cloudflare R2, not in the repo, so binaries never enter
 * git history. Override the base with HERO_PLATE_BASE to swap the loop without
 * touching a component.
 */
const plateBase =
  process.env.HERO_PLATE_BASE ??
  "https://pub-61b8d4b6eee34ac5bc32d0e41f600090.r2.dev/hero";

export const heroPlate = {
  webm: `${plateBase}/plate.webm`,
  mp4: `${plateBase}/plate.mp4`,
  poster: `${plateBase}/plate-poster.jpg`,
};
