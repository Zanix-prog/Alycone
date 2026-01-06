import { useRef, useState, useEffect } from "react";

const images = [
  "/assets/reviews/review1.webp",
  "/assets/reviews/review2.webp",
  "/assets/reviews/review3.webp",
];

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  // Touch
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!startX.current) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };

  const onTouchEnd = () => {
    if (deltaX.current > 60) prev();
    else if (deltaX.current < -60) next();
    startX.current = null;
    deltaX.current = 0;
  };

  // Mouse (desktop drag)
  const onMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!startX.current) return;
    deltaX.current = e.clientX - startX.current;
  };

  const onMouseUp = () => {
    if (deltaX.current > 80) prev();
    else if (deltaX.current < -80) next();
    startX.current = null;
    deltaX.current = 0;
  };

  // Auto GPU hint
  useEffect(() => {
    containerRef.current?.style.setProperty("will-change", "transform, opacity");
  }, []);

  return (
    <div
      ref={containerRef}
      className="review-carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          loading="lazy"
          draggable={false}
          className={`review-img ${i === index ? "active" : ""}`}
          alt="User review"
        />
      ))}
    </div>
  );
}
