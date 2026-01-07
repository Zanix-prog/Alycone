import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'zooming' | 'done'>('loading');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  // ✅ Prevent rerun
  useEffect(() => {
    const hasRun = sessionStorage.getItem('alycone_preloader_run');
    if (hasRun) onComplete();
  }, [onComplete]);

  // ✅ Canvas resize fix (REMOVES BLACK BOX)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem('alycone_preloader_run', 'true');
    setPhase('zooming');
    setTimeout(onComplete, 1200);
  }, [onComplete]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const hasRun = sessionStorage.getItem('alycone_preloader_run');
    if (hasRun) return;

    const duration = 3500;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const eased = Math.pow(Math.min(elapsed / duration, 1), 0.7);
      const value = eased * 100;
      setProgress(value);

      if (value >= 100) {
        setTimeout(() => {
          setPhase('zooming');
          sessionStorage.setItem('alycone_preloader_run', 'true');
          setTimeout(onComplete, 1200);
        }, 300);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  if (typeof window !== 'undefined' && sessionStorage.getItem('alycone_preloader_run')) {
    return null;
  }

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={phase === 'zooming' ? { scale: 15, opacity: 0 } : { scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: phase === 'zooming' ? 1.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* ✅ FIXED CANVAS */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
          />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={phase === 'zooming' ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* LOGO */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
              className="relative mb-8"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-purple-500/30"
                  style={{
                    width: 160 + i * 40,
                    height: 160 + i * 40,
                    left: -(20 + i * 20),
                    top: -(20 + i * 20),
                  }}
                  animate={{ rotate: i % 2 ? 180 : -180 }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              <motion.div
                className="relative w-32 h-32 flex items-center justify-center rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(180,0,255,0.4)',
                    '0 0 100px rgba(200,50,255,0.6)',
                    '0 0 60px rgba(180,0,255,0.4)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img
                  src="/alycone.webp"
                  className="w-16 h-16 drop-shadow-[0_0_25px_rgba(200,80,255,0.8)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black tracking-[0.25em]"
            >
              ALYCONE
            </motion.h1>

            <p className="text-xs tracking-[0.6em] opacity-50 mt-2">CLIENT</p>

            <div className="mt-10 w-52 h-[2px] bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-xs opacity-50 font-mono">
              {Math.round(progress)}%
            </p>
          </motion.div>

          <div className="absolute bottom-6 text-xs opacity-30 flex gap-2">
            <kbd className="px-2 py-0.5 border border-white/20">ESC</kbd>
            <span>skip</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
