import { motion } from "framer-motion";
import { Zap, Target, Palette, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Built for Real Fights",
    description:
      "Alycone stays stable when the server doesn’t. No stutters, no random drops — even in stacked fights.",
  },
  {
    icon: Target,
    title: "Crystal PvP Focused",
    description:
      "Everything is tuned around crystal, anchor, and HT3-style combat. Nothing extra, nothing wasted.",
  },
  {
    icon: Palette,
    title: "Clean & Practical UI",
    description:
      "The interface stays out of your way. Fast to use, easy to read, and built for long sessions.",
  },
  {
    icon: RefreshCw,
    title: "Always Improving",
    description:
      "The client evolves with the meta. Updates aren’t cosmetic — they actually change how it performs.",
  },
];

export default function WhyAlyconeSection() {
  return (
    <section id="why" className="relative py-36 overflow-hidden">
      {/* ===== SUBTLE BACKGROUND ===== */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(60% 40% at 25% 40%, hsl(280 100% 60% / 0.16), transparent 60%), radial-gradient(40% 60% at 75% 60%, hsl(260 100% 60% / 0.14), transparent 60%)",
              "radial-gradient(60% 40% at 75% 40%, hsl(280 100% 60% / 0.2), transparent 60%), radial-gradient(40% 60% at 25% 60%, hsl(260 100% 60% / 0.16), transparent 60%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-black leading-tight">
            Why <span className="gradient-text">Alycone</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A client made for players who care about performance, not gimmicks.
          </p>
        </motion.div>

        {/* ===== FEATURES ===== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group rounded-2xl p-8 glass-panel-glow neon-border"
              >
                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/15 border border-primary/30">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Text */}
                <h3 className="font-display font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent line */}
                <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
