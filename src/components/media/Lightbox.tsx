import { useEffect } from "react";
import "./Lightbox.css";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/** Fullscreen image viewer for gallery thumbs. Closing: click the dimmed backdrop, the close
 * button, or Escape — clicking the image itself does nothing (stopPropagation). */
export function Lightbox({ src, alt, onClose }: LightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}>
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <img className="lightbox__image" src={src} alt={alt} onClick={(event) => event.stopPropagation()} />
    </div>
  );
}
