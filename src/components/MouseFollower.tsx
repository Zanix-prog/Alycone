import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';

const MouseFollower = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(280, 100%, 70%, 0.8) 0%, transparent 70%)',
            boxShadow: '0 0 20px hsl(280, 100%, 60%, 0.5), 0 0 40px hsl(280, 100%, 60%, 0.3)',
          }}
        />
      </motion.div>

      {/* Trailing glow */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          x: useSpring(cursorX, { damping: 35, stiffness: 150 }),
          y: useSpring(cursorY, { damping: 35, stiffness: 150 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-32 h-32 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(280, 100%, 60%, 0.4) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Outer subtle glow */}
      <motion.div
        className="fixed pointer-events-none z-30"
        style={{
          x: useSpring(cursorX, { damping: 50, stiffness: 100 }),
          y: useSpring(cursorY, { damping: 50, stiffness: 100 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-64 h-64 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(260, 100%, 50%, 0.2) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </>
  );
};

export default MouseFollower;
