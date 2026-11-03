import { useCallback, useRef, useState } from "react";
import "./BeforeAfterSlider.css";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
}

/** Draggable before/after comparison. The "after" image is the full-size base layer; the
 * "before" image sits on top, clipped to a percentage width that the handle controls — so
 * dragging left reveals more of "after", dragging right reveals more of "before". */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setFromClientX(event.clientX);
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 3;
    if (event.key === "ArrowLeft") setPosition((p) => Math.max(0, p - step));
    else if (event.key === "ArrowRight") setPosition((p) => Math.min(100, p + step));
    else if (event.key === "Home") setPosition(0);
    else if (event.key === "End") setPosition(100);
    else return;
    event.preventDefault();
  };

  return (
    <div
      className="ba-slider"
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
    >
      <img className="ba-slider__image" src={afterSrc} alt={afterAlt} loading="lazy" />

      <img
        className="ba-slider__image"
        src={beforeSrc}
        alt={beforeAlt}
        loading="lazy"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />

      <span className="ba-slider__tag ba-slider__tag--before">{beforeLabel}</span>
      <span className="ba-slider__tag ba-slider__tag--after">{afterLabel}</span>

      <div
        className="ba-slider__handle"
        style={{ left: `${position}%` }}
        role="slider"
        tabIndex={0}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
      >
        <span className="ba-slider__grip" aria-hidden="true">
          ‹›
        </span>
      </div>
    </div>
  );
}
