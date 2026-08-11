import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Section 6 accessibility floor: every hand-built animation (Russel's drop/bounce/shake,
 * speech-bubble scale-up) must have a reduced-motion fallback. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
