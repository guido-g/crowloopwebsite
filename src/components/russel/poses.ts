export const RUSSEL_POSES = {
  normal: "/brand/russel/russel_normal.webp",
  pointing: "/brand/russel/russel_pointing.webp",
  excited: "/brand/russel/russel_excited.webp",
  computer: "/brand/russel/russel_computer.webp",
} as const;

export type RusselPose = keyof typeof RUSSEL_POSES;
