import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050507] border-t border-white/5">
      {/* subtle ambient gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-violet-500/10 blur-[200px]" />
        <div className="absolute right-1/4 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[200px]" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10">
          
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <span className="font-display text-2xl font-semibold tracking-wide text-white">
              ALYCONE
            </span>
            <span className="text-xs uppercase tracking-[0.45em] text-white/40">
              Client
            </span>
          </motion.div>

          {/* LINKS */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="flex justify-center gap-10 text-sm"
          >
            <motion.a
              href="https://discord.gg/447mg7Vv5g"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: "#fff" }}
              className="relative text-white/45 transition-all duration-300"
            >
              Discord
            </motion.a>
          </motion.div>

          {/* COPYRIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="flex justify-end"
          >
            <p className="text-xs tracking-wide text-white/35">
              © 2026 Alycone Client
            </p>
          </motion.div>
        </div>

        {/* ultra thin divider */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </footer>
  );
}
