import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, MessageCircle } from 'lucide-react';

const boosts = [
  { value: '2×', off: '10%' },
  { value: '4×', off: '20%' },
  { value: '6×', off: '30%' },
  { value: '8×', off: '40%' },
  { value: '14×', off: '50%', highlight: true },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-44 overflow-hidden"
    >
      {/* ===== AMBIENT BACKDROP ===== */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(60% 45% at 50% 35%, hsl(280 100% 60% / 0.22), transparent 70%)',
              'radial-gradient(60% 45% at 50% 60%, hsl(260 100% 60% / 0.28), transparent 70%)',
            ],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 backdrop-blur-[4px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-28"
        >
          <h2 className="text-[4.5rem] md:text-[7rem] font-display font-black leading-none">
            <span className="gradient-text">One Price</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-xl mx-auto">
            No subscriptions. No renewals.  
            Access is verified directly through Discord.
          </p>
        </motion.div>

        {/* ===== MAIN PRICE CARD ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -14 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="relative max-w-xl mx-auto mb-32"
        >
          {/* Glow field */}
          <motion.div
            className="absolute -inset-10 rounded-[3.5rem]"
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 4.5, repeat: Infinity }}
            style={{
              background:
                'radial-gradient(circle at center, hsl(280 100% 60% / 0.5), transparent 65%)',
              filter: 'blur(70px)',
            }}
          />

          <div className="relative rounded-[2.2rem] p-14 glass-panel-glow neon-border text-center">
            <p className="uppercase tracking-[0.35em] text-xs text-primary mb-6">
              Lifetime Access
            </p>

            <motion.div
              animate={{
                textShadow: [
                  '0 0 30px hsl(280 100% 60% / 0.5)',
                  '0 0 70px hsl(280 100% 60% / 0.9)',
                  '0 0 30px hsl(280 100% 60% / 0.5)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity }}
              className="text-[6rem] font-display font-black gradient-text mb-4"
            >
              $10
            </motion.div>

            <p className="text-muted-foreground text-lg mb-12">
              Pay once. Own Alycone forever.
            </p>

            {/* ===== DISCORD CTA (REAL LINK) ===== */}
            <motion.a
              href="https://discord.gg/447mg7Vv5g"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-3 w-full py-6 rounded-xl font-display text-xl font-bold
              bg-primary text-primary-foreground
              shadow-[0_0_60px_hsl(280,100%,60%,0.45)]"
            >
              Join Discord to Purchase
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Payments & verification handled inside Discord
            </div>
          </div>
        </motion.div>

        {/* ===== LOWER INFO GRID ===== */}
        <div className="grid md:grid-cols-2 gap-14 max-w-6xl mx-auto">
          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-glow p-10"
          >
            <h3 className="font-display font-bold text-2xl mb-6">
              How purchasing works
            </h3>

            <ul className="space-y-5 text-muted-foreground">
              <li className="flex gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1" />
                Join our official Discord server
              </li>
              <li className="flex gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1" />
                Open a ticket in the purchase channel
              </li>
              <li className="flex gap-3">
                <MessageCircle className="w-5 h-5 text-primary mt-1" />
                Payment & access granted instantly
              </li>
            </ul>
          </motion.div>

          {/* Boost discounts */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel-glow p-10"
          >
            <h3 className="font-display font-bold text-2xl mb-6">
              Discord Boost Discounts
            </h3>

            <div className="flex flex-wrap gap-4">
              {boosts.map((b) => (
                <motion.div
                  key={b.value}
                  whileHover={{ y: -6, scale: 1.08 }}
                  className={`px-6 py-4 rounded-xl text-center ${
                    b.highlight
                      ? 'bg-primary/30 border border-primary shadow-[0_0_40px_hsl(280,100%,60%,0.45)]'
                      : 'bg-secondary/30 border border-border/50'
                  }`}
                >
                  <p className="font-bold text-xl">{b.value}</p>
                  <p
                    className={`text-sm ${
                      b.highlight ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {b.off} OFF
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
