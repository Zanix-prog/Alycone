import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FinalCTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-36 overflow-hidden">
      {/* soft ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 50% 60%, hsl(280 100% 60% / 0.12), transparent 60%)",
            "radial-gradient(circle at 50% 55%, hsl(290 100% 65% / 0.18), transparent 65%)",
            "radial-gradient(circle at 50% 60%, hsl(280 100% 60% / 0.12), transparent 60%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* heading */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black mb-6 leading-tight"
          >
            Ready to <span className="gradient-text">Dominate</span>
            <br />
            Crystal PvP?
          </motion.h2>

          {/* subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-xl text-muted-foreground mb-12"
          >
           Start clipping today.
          </motion.p>

          {/* actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap justify-center gap-5"
          >
            {/* primary */}
            <motion.a
              href="#pricing"
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 80px hsl(280 100% 60% / 0.55)",
              }}
              whileTap={{ scale: 0.97 }}
              className="btn-neon-fill font-display text-lg px-12 py-4"
            >
              Buy Now
            </motion.a>

            {/* secondary */}
            <motion.a
              href="https://discord.gg/447mg7Vv5g"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px hsl(280 100% 60% / 0.35)",
              }}
              whileTap={{ scale: 0.97 }}
              className="btn-neon font-display text-lg px-12 py-4"
            >
              Join Discord
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default FinalCTASection;
