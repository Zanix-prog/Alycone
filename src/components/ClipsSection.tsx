import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const clips = [
  {
    title: "HT3 Combo Chain",
    description: "Perfect crystal timing + anchor combo",
    video: "/ClippingHt3.mp4",
  },
  {
    title: "SafeAnchor",
    description: "SafeAnchor Showcase",
    video: "/SafeAnchor.mp4",
  },
  {
    title: "Mace Showcase",
    description: "New mace mechanics demonstration",
    video: "/MaceShowcase.mp4",
  },
];

export default function ClipsSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  return (
    <section
      id="clips"
      className="relative py-32 overflow-hidden"
    >
      {/* ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 h-[400px] w-[400px] rounded-full bg-pink-500/20 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">HT3 Showcase</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Exceptional clips powered by Alycone. Precision, perfect timing, complete domination. Just incredible!
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {clips.map((clip, index) => {
            const isPlaying = playingIndex === index;

            return (
              <ScrollReveal
                key={clip.title}
                delay={index * 0.15}
                direction="up"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="group relative rounded-2xl overflow-hidden"
                >
                  {/* lightning aura */}
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-xl animate-pulse" />
                  </div>

                  {/* glass card */}
                  <div className="relative z-10 h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(180,80,255,0.12)]">
                    {/* media */}
                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                      {!isPlaying ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          <button
                            onClick={() => setPlayingIndex(index)}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <motion.div
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/60 bg-purple-500/20 backdrop-blur-md"
                              style={{
                                boxShadow:
                                  "0 0 35px rgba(190,90,255,0.55)",
                              }}
                            >
                              <Play className="h-6 w-6 text-purple-300 ml-1" />
                            </motion.div>
                          </button>
                        </>
                      ) : (
                        <video
                          src={clip.video}
                          autoPlay
                          controls
                          playsInline
                          className="h-full w-full object-cover"
                          onEnded={() => setPlayingIndex(null)}
                        />
                      )}
                    </div>

                    {/* content */}
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold mb-1 transition-colors group-hover:text-purple-400">
                        {clip.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {clip.description}
                      </p>

                      {/* underline glow */}
                      <div className="mt-3 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
