export const RUSSEL_POSES = {
  normal: "/brand/russel/russel_normal.png",
  pointing: "/brand/russel/russel_pointing.png",
  excited: "/brand/russel/russel_excited.png",
  computer: "/brand/russel/russel_computer.png",
} as const;

export type RusselPose = keyof typeof RUSSEL_POSES;
