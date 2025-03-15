import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#46c68f",    // Verde vibrante
          hover: "#15bcc6",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#15bcc6",    // Ciano moderno
          hover: "#002046",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#46c68f",
          foreground: "#FFFFFF",
        },
        gray: {
          50: "#f2f2f2",
          100: "#d4d4d4",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#022340",
          900: "#002046",
        },
        neural: {
          start: "#46c68f",    // Verde principal
          middle: "#15bcc6",   // Ciano intermediário
          end: "#002046",      // Azul escuro
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#f2f2f2",
          foreground: "#64748B",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#022340",
        },
      },
      backgroundImage: {
        'neural-gradient': 'linear-gradient(90deg, #46c68f 0%, #15bcc6 50%, #002046 100%)',
        'gradient-light': 'linear-gradient(to right, rgba(242, 242, 242, 0.9), rgba(212, 212, 212, 0.6))',
        'gradient-glow': 'radial-gradient(circle at center, #46c68f, #002046)',
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
        "neural-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neural-pulse": "neural-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
