import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        tilt: {
          "0%, 100%": { transform: "rotateY(-5deg) rotateX(5deg)" },
          "50%": { transform: "rotateY(5deg) rotateX(-5deg)" },
        },
        glow: {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(280 100% 65% / 0.3), 0 0 40px hsl(280 100% 65% / 0.1)" 
          },
          "50%": { 
            boxShadow: "0 0 30px hsl(280 100% 65% / 0.6), 0 0 60px hsl(280 100% 65% / 0.3)" 
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
        tilt: "tilt 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, hsl(320 100% 65%), hsl(280 100% 70%), hsl(260 100% 65%))",
        "glossy-gradient": "linear-gradient(135deg, hsl(280 100% 70% / 0.2), transparent, hsl(260 100% 70% / 0.2))",
      },
      boxShadow: {
        neon: "0 0 20px hsl(280 100% 65% / 0.5), 0 0 40px hsl(280 100% 65% / 0.3), 0 0 60px hsl(280 100% 65% / 0.1)",
        "neon-strong": "0 0 30px hsl(280 100% 65% / 0.7), 0 0 60px hsl(280 100% 65% / 0.5), 0 0 100px hsl(280 100% 65% / 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glow-sm": "0 0 10px hsl(280 100% 65% / 0.4)",
        "glow-md": "0 0 20px hsl(280 100% 65% / 0.5)",
        "glow-lg": "0 0 40px hsl(280 100% 65% / 0.6)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
