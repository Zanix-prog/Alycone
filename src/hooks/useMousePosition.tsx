import { useState, useEffect, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: e.clientX / window.innerWidth,
        normalizedY: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

export const useMouseParallax = (strength: number = 20) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetRef.current = {
        x: ((e.clientX - centerX) / centerX) * strength,
        y: ((e.clientY - centerY) / centerY) * strength,
      };
    };

    const animate = () => {
      setOffset((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.08,
        y: prev.y + (targetRef.current.y - prev.y) * 0.08,
      }));
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [strength]);

  return offset;
};
