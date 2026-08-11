import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RUSSEL_POSES } from "./poses";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./russel.css";

/** The confirmed hero interaction (Section 4.1): drop-in bounce, bubble scale-up open,
 * click swaps the text and shakes the portrait. Reduced motion keeps the same content/order
 * but fades instead of moving. */
export function RusselHero() {
  const { t } = useTranslation("home");
  const reducedMotion = useReducedMotion();
  const [clicked, setClicked] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    setClicked(true);
    if (!reducedMotion) {
      setShaking(true);
      window.setTimeout(() => setShaking(false), 400);
    }
  };

  return (
    <div className="russel-hero">
      <div className="russel-hero__portrait-wrap">
        <button
          type="button"
          className={`russel-hero__portrait${shaking ? " is-shaking" : ""}`}
          onClick={handleClick}
          aria-label={t("hero.russelAlt")}
        >
          <img src={RUSSEL_POSES.pointing} alt="" width={152} height={152} />
        </button>
      </div>
      <p className="russel-hero__bubble" role="status">
        {clicked ? t("hero.russelClicked") : t("hero.russelGreeting")}
      </p>
    </div>
  );
}
