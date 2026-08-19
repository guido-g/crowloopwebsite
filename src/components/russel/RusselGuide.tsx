import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { RUSSEL_POSES, type RusselPose } from "./poses";
import "./russel.css";

interface RusselGuideProps {
  pose: RusselPose;
  message: ReactNode;
  /** Which side the portrait sits on; the bubble tail points toward it. Ignored when
   * position="below". */
  side?: "left" | "right";
  /** "below" stacks the bubble above a centered portrait (tail pointing down) instead of the
   * side-by-side layout — used inside SectionHeading's "crow" variant. */
  position?: "side" | "below";
  size?: "md" | "lg";
  className?: string;
}

/** Static, per-section Russel placement — portrait + speech bubble (Section 5: "static-positioned
 * per section (simplest, most reliable) recommended for v1"). */
export function RusselGuide({
  pose,
  message,
  side = "left",
  position = "side",
  size = "md",
  className,
}: RusselGuideProps) {
  const { t } = useTranslation("common");
  const portrait = (
    <img
      className="russel-guide__portrait"
      src={RUSSEL_POSES[pose]}
      alt={t("russelAlt")}
      width={112}
      height={112}
      loading="lazy"
    />
  );
  const bubble = <p className="russel-guide__bubble">{message}</p>;

  if (position === "below") {
    return (
      <div className={`russel-guide russel-guide--below russel-guide--${size} ${className ?? ""}`}>
        {bubble}
        {portrait}
      </div>
    );
  }

  return (
    <div className={`russel-guide russel-guide--${side} russel-guide--${size} ${className ?? ""}`}>
      {portrait}
      {bubble}
    </div>
  );
}
