import { motion } from 'framer-motion';

interface Props {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}

export const ModuleToggle = ({ label, enabled, onToggle }: Props) => {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.96 }}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg
        transition-colors duration-200
        ${enabled
          ? 'bg-primary/20 text-primary'
          : 'bg-white/5 text-muted-foreground hover:bg-white/10'}
      `}
    >
      <span className="text-xs tracking-wide">{label}</span>

      <motion.div
        className="relative w-9 h-5 rounded-full"
        animate={{
          backgroundColor: enabled
            ? 'hsl(280 100% 65%)'
            : 'rgba(255,255,255,0.15)',
        }}
        transition={{ duration: 0.25 }}
      >
        <motion.div
          className="absolute top-[2px] w-4 h-4 rounded-full bg-white"
          animate={{ x: enabled ? 18 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </motion.button>
  );
};
