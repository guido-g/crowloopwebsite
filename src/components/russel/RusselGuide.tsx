import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { RUSSEL_POSES, type RusselPose } from "./poses";
import "./russel.css";

interface RusselGuideProps {
  pose: RusselPose;
  message: ReactNode;
  /** Which side the portrait sits on; the bubble tail points toward it. */
  side?: "left" | "right";
  size?: "md" | "lg";
  className?: string;
}

/** Static, per-section Russel placement — portrait + speech bubble (Section 5: "static-positioned
 * per section (simplest, most reliable) recommended for v1"). */
export function RusselGuide({ pose, message, side = "left", size = "md", className }: RusselGuideProps) {
  const { t } = useTranslation("common");
  return (
    <div className={`russel-guide russel-guide--${side} russel-guide--${size} ${className ?? ""}`}>
      <img
        className="russel-guide__portrait"
        src={RUSSEL_POSES[pose]}
        alt={t("russelAlt")}
        width={112}
        height={112}
        loading="lazy"
      />
      <p className="russel-guide__bubble">{message}</p>
    </div>
  );
}
