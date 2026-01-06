import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Showcase', href: '#clips' },
    { name: 'Modules', href: '#modules' },
    { name: 'Why Alycone', href: '#why' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'glass-panel py-4' : 'py-6'}
      `}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold gradient-text">ALYCONE</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ y: -2 }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#pricing"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="btn-neon-fill font-display text-xs px-5 py-2"
        >
          Buy Now
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navigation;