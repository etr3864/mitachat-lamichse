/**
 * One scene, two schedules. The engine half is a palindrome: nothing, a bang
 * that assembles the machine, a teardown, then nothing again — and only then
 * the mark. Callout windows stay shorter than their spacing on narrow.
 */
export type StageTiming = {
  bangStart: number;
  bangLength: number;
  explodeStart: number;
  explodeLength: number;
  flyStart: number;
  flyLength: number;
  dissolveStart: number;
  dissolveLength: number;
  markStart: number;
  markLength: number;
  ringStart: number;
  ringLength: number;
  layerStarts: readonly number[];
  layerIn: number;
  layerHold: number;
  layerOut: number;
};

export const WIDE_TIMING: StageTiming = {
  bangStart: 0.02,
  bangLength: 0.14,
  explodeStart: 0.22,
  explodeLength: 0.14,
  flyStart: 0.36,
  flyLength: 0.08,
  dissolveStart: 0.42,
  dissolveLength: 0.05,
  markStart: 0.5,
  markLength: 0.08,
  ringStart: 0.5,
  ringLength: 0.3,
  layerStarts: [0.54, 0.63, 0.72, 0.81, 0.9],
  layerIn: 0.07,
  layerHold: 0.1,
  layerOut: 0.04,
};

export const NARROW_TIMING: StageTiming = {
  bangStart: 0.02,
  bangLength: 0.15,
  explodeStart: 0.24,
  explodeLength: 0.13,
  flyStart: 0.38,
  flyLength: 0.08,
  dissolveStart: 0.44,
  dissolveLength: 0.05,
  markStart: 0.52,
  markLength: 0.06,
  ringStart: 0.52,
  ringLength: 0.34,
  layerStarts: [0.56, 0.65, 0.74, 0.83, 0.92],
  layerIn: 0.025,
  layerHold: 0.05,
  layerOut: 0.028,
};

export const NARROW_BREAKPOINT = 768;
export const CALLOUT_GAP = 54;
