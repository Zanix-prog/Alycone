import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  duration?: number;
  once?: boolean;
}

const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 0, y: 60, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  down: {
    hidden: { opacity: 0, y: -60, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  left: {
    hidden: { opacity: 0, x: 60, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  right: {
    hidden: { opacity: 0, x: -60, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
