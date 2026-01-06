import { PropsWithChildren, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';

export default function UXProvider({ children }: PropsWithChildren) {
  const [isTouch, setIsTouch] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // Detect touch devices
    setIsTouch(window.matchMedia('(hover: none)').matches);

    // Detect reduced motion preference
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  return (
    <MotionConfig
      reducedMotion={reduceMotion ? 'always' : 'never'}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
      }}
    >
      <div
        className={`
          w-full
          overflow-x-hidden
          ${isTouch ? 'touch-device' : ''}
        `}
      >
        {children}
      </div>
    </MotionConfig>
  );
}
