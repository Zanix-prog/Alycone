import { motion } from 'framer-motion';
import GUIShowcase from './GUIShowcase';
import ScrollReveal from './ScrollReveal';
import { useMouseParallax } from '@/hooks/useMousePosition';

const HeroSection = () => {
  const parallax = useMouseParallax(15);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Small tagline */}
            <ScrollReveal delay={0.1}>
              <motion.p
                className="text-sm uppercase tracking-[0.3em] text-primary font-medium"
                style={{
                  textShadow: '0 0 20px hsl(280, 100%, 65%, 0.5)',
                }}
              >
                Created for top-tier players, providing the assistance needed to win in various game modes.
              </motion.p>
            </ScrollReveal>

            {/* Main Heading */}
            <ScrollReveal delay={0.2}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black leading-none">
                <span className="gradient-text">ALYCONE</span>
                <br />
                <span className="text-foreground">CLIENT</span>
              </h1>
            </ScrollReveal>

            {/* Subheading */}
            <ScrollReveal delay={0.3}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-lg font-light">
                Clip <span className="text-primary font-semibold neon-text">HT3s</span>. Dominate{' '}
                <span className="text-primary font-semibold neon-text">Crystal PvP</span>.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap gap-4 pt-4">
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(280 100% 65% / 0.6)' }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-neon-fill font-display text-sm glossy-surface"
                >
                  Buy Lifetime
                </motion.a>
                <motion.a
                  href="#clips"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-neon font-display text-sm"
                >
                  Watch Clips
                </motion.a>
                <motion.a
                  href="https://discord.gg/447mg7Vv5g"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-neon font-display text-sm"
                >
                  Join Discord
                </motion.a>
              </div>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal delay={0.5}>
              <div className="flex gap-8 pt-8 border-t border-border/50">
                {[
                  { value: '50+', label: 'Modules' },
                  { value: 'Instant', label: 'Access' },
                  { value: '24/7', label: 'Support' },
                ].map((stat) => (
                  <motion.div 
                    key={stat.label}
                    whileHover={{ scale: 1.1 }}
                    className="group"
                  >
                    <p className="text-2xl font-display font-bold text-primary group-hover:neon-text transition-all">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - GUI Showcase with Parallax */}
          <motion.div 
            className="hidden lg:block"
            style={{
              x: parallax.x,
              y: parallax.y,
            }}
          >
            <GUIShowcase />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          style={{ boxShadow: '0 0 15px hsl(280 100% 65% / 0.3)' }}
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
