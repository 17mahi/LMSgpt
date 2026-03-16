import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(222.2 84% 4.9% / 0.6)",
        cardForeground: "hsl(210 40% 98%)",
        primary: {
          DEFAULT: "hsl(262 83% 61%)",
          foreground: "hsl(210 40% 98%)"
        },
        secondary: {
          DEFAULT: "hsl(198 93% 60%)",
          foreground: "hsl(222.2 47.4% 11.2%)"
        }
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem"
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at top, #4f46e5, transparent 60%)",
        "gradient-glass":
          "linear-gradient(135deg, rgba(79,70,229,0.35), rgba(16,185,129,0.25))"
      },
      boxShadow: {
        glow: "0 0 50px rgba(129, 140, 248, 0.55)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

