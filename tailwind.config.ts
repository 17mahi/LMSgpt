import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(224, 71%, 4%)",
        foreground: "hsl(213, 31%, 91%)",
        card: "hsl(224, 71%, 4% / 0.4)",
        cardForeground: "hsl(213, 31%, 91%)",
        border: "hsl(216, 34%, 17%)",
        input: "hsl(216, 34%, 17%)",
        primary: {
          DEFAULT: "hsl(262, 83%, 58%)",
          foreground: "hsl(210, 40%, 98%)",
          hover: "hsl(262, 83%, 68%)"
        },
        secondary: {
          DEFAULT: "hsl(200, 95%, 60%)",
          foreground: "hsl(222.2, 47.4%, 11.2%)",
          hover: "hsl(200, 95%, 70%)"
        },
        accent: {
          DEFAULT: "hsl(326, 100%, 74%)",
          foreground: "hsl(0, 0%, 100%)"
        },
        muted: {
          DEFAULT: "hsl(223, 47%, 11%)",
          foreground: "hsl(215, 20.2%, 65.1%)"
        }
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at top, hsl(262, 83%, 58%, 0.15), transparent 60%)",
        "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
        "gradient-premium": "linear-gradient(to right, hsl(262, 83%, 58%), hsl(200, 95%, 60%), hsl(326, 100%, 74%))",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(129, 140, 248, 0.4)",
        "glow-strong": "0 0 60px -15px rgba(129, 140, 248, 0.6)",
        "glow-primary": "0 0 30px -5px rgba(139, 92, 246, 0.5)",
        glass: "inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 4px 20px rgba(0, 0, 0, 0.5)",
        "glass-elevated": "inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 20px 40px rgba(0, 0, 0, 0.6)",
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

