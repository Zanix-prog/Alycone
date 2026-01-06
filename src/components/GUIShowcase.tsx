import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useMouseParallax } from '@/hooks/useMousePosition';
import { ModuleToggle } from './ModuleToggle';

const initialCategories = [
  {
    name: 'Sword',
    icon: '⚔️',
    modules: [
      'AimAssist',
      'TriggerBot',
      'Shield Breaker',
      'Velocity',
      'Reach',
      'Hitboxes',
    ],
  },
  {
    name: 'Crystal',
    icon: '💎',
    modules: [
      'Auto Crystal',
      'Pearl Catch',
      'Anchor Macro',
      'Crystal Optimizer',
      'Double Anchor',
      'Totem Hit',
    ],
  },
  {
    name: 'Render',
    icon: '🎮',
    modules: [
      'Player ESP',
      'Target HUD',
      'HUD',
      'BlockESP',
      'Storage ESP',
    ],
  },
];

const GUIShowcase = () => {
  const parallax = useMouseParallax(10);
  const audio = useRef<HTMLAudioElement | null>(null);

  const [state, setState] = useState<Record<string, boolean>>(
    Object.fromEntries(
      initialCategories.flatMap(c =>
        c.modules.map(m => [m, true])
      )
    )
  );

  const toggle = (name: string) => {
    if (!audio.current) {
      audio.current = new Audio('/sounds/tick.mp3');
      audio.current.volume = 0.4;
    }
    audio.current.currentTime = 0;
    audio.current.play();

    setState(s => ({ ...s, [name]: !s[name] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 120, rotateY: -16 }}
      animate={{ opacity: 1, x: 0, rotateY: -8 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      style={{ perspective: '1200px' }}
      className="relative"
    >
      {/* Aura */}
      <div className="absolute -inset-20 blur-[90px] bg-[radial-gradient(circle_at_40%_40%,hsl(280_100%_65%/0.25),transparent_65%)]" />

      <motion.div
        style={{
          rotateY: parallax.x * 0.35,
          rotateX: -parallax.y * 0.35,
          transformStyle: 'preserve-3d',
        }}
        className="flex gap-5 p-6 rounded-3xl glass-panel-glow neon-border"
      >
        {initialCategories.map(cat => (
          <div
            key={cat.name}
            className="w-48 rounded-2xl glass-panel neon-border overflow-hidden"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary/10 border-b border-primary/30">
              <div className="flex gap-2 items-center">
                <span>{cat.icon}</span>
                <span className="text-xs tracking-wide font-display">
                  {cat.name}
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(280_100%_65%)]" />
            </div>

            {/* MODULES */}
            <div className="p-3 space-y-2">
              {cat.modules.map(m => (
                <ModuleToggle
                  key={m}
                  label={m}
                  enabled={state[m]}
                  onToggle={() => toggle(m)}
                />
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default GUIShowcase;
