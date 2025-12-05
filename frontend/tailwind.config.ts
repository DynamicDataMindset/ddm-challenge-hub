// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub Dark theme colors
        github: {
          bg: {
            primary: "#0d1117",
            secondary: "#161b22",
            tertiary: "#1f2937",
            overlay: "#21262d",
          },
          border: {
            default: "#30363d",
            muted: "#21262d",
          },
          text: {
            primary: "#c9d1d9",
            secondary: "#8b949e",
            muted: "#6e7681",
            inverse: "#0d1117",
          },
          accent: {
            neon: "#39FF14", // Neon Green for CTAs and highlights
            neonHover: "#2ee60f",
            success: "#3fb950",
            danger: "#f85149",
            warning: "#d29922",
            info: "#58a6ff",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#c9d1d9",
            a: {
              color: "#39FF14",
              "&:hover": {
                color: "#2ee60f",
              },
            },
            strong: {
              color: "#c9d1d9",
            },
            code: {
              color: "#39FF14",
              backgroundColor: "#161b22",
              padding: "0.2em 0.4em",
              borderRadius: "6px",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #39FF14, 0 0 10px #39FF14" },
          "100%": { boxShadow: "0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;