import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Georgia", "serif"]
      },
      colors: {
        brand: {
          red: "#9e1325",
          maroon: "#5d0d19",
          gold: "#c89b3c",
          ivory: "#f6efe3",
          ink: "#15110f"
        }
      },
      boxShadow: {
        glow: "0 20px 60px rgba(158, 19, 37, 0.2)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(200,155,60,0.18), transparent 34%), radial-gradient(circle at 20% 20%, rgba(158,19,37,0.28), transparent 30%)",
        "gold-mesh":
          "linear-gradient(135deg, rgba(200,155,60,0.1), transparent 35%), linear-gradient(315deg, rgba(255,255,255,0.08), transparent 40%)"
      }
    }
  },
  plugins: []
};

export default config;
