import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Switch } from '@/components/ui/switch';

const categories = [
  {
    name: 'Sword',
    icon: '/sword.webp',
    modules: [
      { name: 'AimAssist', desc: 'Smooth aim correction for consistent hits' },
      { name: 'TriggerBot', desc: 'Attacks automatically when a target is hittable' },
      { name: 'ShieldBreaker', desc: 'Breaks shields instantly while blocking' },
      { name: 'Velocity', desc: 'Controls knockback for better positioning' },
      { name: 'Reach', desc: 'Extended hit range within safe limits' },
      { name: 'Hitboxes', desc: 'Expanded hitboxes for easier connections' },
      { name: 'StaticHitBox', desc: 'Locks hitbox size for consistent combat' },
      { name: 'AutoPot', desc: 'Automatically throws potions when needed' },
      { name: 'AutoPotRefill', desc: 'Refills hotbar potions automatically' },
      { name: 'NoMissDelay', desc: 'Removes delay after missed attacks' },
      { name: 'AutoJumpReset', desc: 'Mid-air sprint reset for combo control' },
      { name: 'TotemOffHand', desc: 'Automatically manages offhand totems' },
    ],
  },
  {
    name: 'Crystal',
    icon: '/end_crystal.webp',
    modules: [
      { name: 'PearlCatch', desc: 'Automatically catches thrown pearls' },
      { name: 'AnchorMacro', desc: 'Automatically detonates anchors' },
      { name: 'AutoCrystal', desc: 'Places and breaks crystals automatically' },
      { name: 'AutoDoubleHand', desc: 'Handles double-hand actions' },
      { name: 'AutoHitCrystal', desc: 'Hits crystals instantly' },
      { name: 'CrystalOptimizer', desc: 'Removes client-side crystals for speed' },
      { name: 'DoubleAnchor', desc: 'Efficient double anchor placement' },
      { name: 'TotemHit', desc: 'Hits while holding a totem' },
      { name: 'AutoTotem', desc: 'Equips a totem automatically' },
      { name: 'AutoInventoryTotem', desc: 'Pulls totems from inventory' },
      { name: 'LegitTotem', desc: 'Natural-looking totem switching' },
    ],
  },
  {
    name: 'Mace',
    icon: '/mace.png',
    modules: [
      { name: 'StunSlam', desc: 'Maximum stun impact' },
      { name: 'AutoMace', desc: 'Automatic mace attacks' },
      { name: 'MaceHit', desc: 'Improved hit timing' },
      { name: 'MaceAura', desc: 'Targets nearby enemies' },
      { name: 'MaceAim', desc: 'Aim assist for mace' },
      { name: 'MaceSwap', desc: 'Auto swap to mace' },
      { name: 'ElytraSwap', desc: 'Fast armor ↔ elytra swap' },
      { name: 'PearlBlocker', desc: 'Blocks enemy pearls' },
      { name: 'WindChargeKey', desc: 'One-key wind charge' },
      { name: 'WindStopper', desc: 'Stops wind charge movement' },
    ],
  },
  {
    name: 'Render',
    icon: '/eye_ender.jpg',
    modules: [
      { name: 'PlayerESP', desc: 'Highlights nearby players' },
      { name: 'TargetHUD', desc: 'Combat target HUD' },
      { name: 'BlockESP', desc: 'Block highlighting' },
      { name: 'HUD', desc: 'Custom UI overlay' },
      { name: 'SpawnerFinder', desc: 'Finds mob spawners' },
      { name: 'StorageESP', desc: 'Highlights storage blocks' },
      { name: 'NoBounce', desc: 'Prevents movement bounce' },
    ],
  },
  {
    name: 'Misc',
    icon: '/nether_star.webp',
    modules: [
      { name: 'AutoPearlCatch', desc: 'Auto catches pearls' },
      { name: 'AutoClicker', desc: 'Controlled auto clicking' },
      { name: 'AutoGG', desc: 'Auto GG messages' },
      { name: 'AutoXP', desc: 'Uses XP bottles automatically' },
      { name: 'FakeLag', desc: 'Simulated lag desync' },
      { name: 'FastPlace', desc: 'Faster block placement' },
      { name: 'Freecam', desc: 'Detached camera movement' },
      { name: 'KeyPearl', desc: 'Pearl via keybind' },
      { name: 'MessageAura', desc: 'Auto chat messages' },
      { name: 'NoBreakDelay', desc: 'No block delay' },
      { name: 'PackSpoof', desc: 'Spoofs resource pack' },
      { name: 'PingSpoof', desc: 'Latency spoofing' },
      { name: 'Prevent', desc: 'Prevents unwanted actions' },
      { name: 'Sprint', desc: 'Automatic sprinting' },
    ],
  },
  {
    name: 'Donut',
    icon: '/donut.webp',
    modules: [
      { name: 'ChunkFinder', desc: 'Chunk detection' },
      { name: 'RTPBaseFinder', desc: 'RTP base tracking' },
    ],
  },
  {
    name: 'Alycone',
    icon: '/command.jpg',
    modules: [
      { name: 'SelfDestruct', desc: 'Instant client shutdown' },
      { name: 'CPSHud', desc: 'Legit CPS display' },
      { name: 'Friends', desc: 'Friend manager' },
      { name: 'AlyconeGUI', desc: 'GUI customization' },
    ],
  },
];

export default function ModulesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>({});

  const tickSound = useMemo(() => {
    const audio = new Audio('/sounds/tick.mp3');
    audio.volume = 0.22;
    return audio;
  }, []);

  const toggleModule = (name: string) => {
    tickSound.currentTime = 0;
    tickSound.play().catch(() => {});
    setModuleStates(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <section id="modules" className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* CATEGORY TABS */}
        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-5 py-2.5 rounded-xl flex items-center gap-2 font-display font-bold transition-all
                ${activeCategory === i
                  ? 'bg-primary text-primary-foreground'
                  : 'glass-panel'}
              `}
            >
              <span className="icon-wrapper">
                <img src={cat.icon} alt={cat.name} />
              </span>
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* MODULE GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-5xl mx-auto glass-panel-glow neon-border p-6 md:p-8"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories[activeCategory].modules.map((module, i) => {
                const enabled = moduleStates[module.name] ?? false;

                return (
                  <motion.div
                    key={module.name}
                    onClick={() => toggleModule(module.name)}
                    className={`cursor-pointer rounded-xl border p-4
                      ${enabled
                        ? 'bg-primary/15 border-primary/60'
                        : 'bg-secondary/30 border-border/50'}
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-display font-bold text-sm">{module.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{module.desc}</p>
                      </div>
                      <Switch
                        checked={enabled}
                        onCheckedChange={() => toggleModule(module.name)}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
