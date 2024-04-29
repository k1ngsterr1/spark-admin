import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      boxShadow: {
        "orange-glow": "0 0 25px #FF5722",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 5px #FFA500, 0 0 15px #FFA500, 0 0 25px #FFA500, 0 0 35px #FF8C00",
          },
          "50%": {
            boxShadow:
              "0 0 10px #FFA500, 0 0 20px #FFA500, 0 0 30px #FFA500, 0 0 40px #FF8C00",
          },
        },
      },
      animation: {
        "glow-orange": "glow 2s ease-in-out infinite",
      },
      colors: {
        primary: {
          DEFAULT: "#FF5722",
          BG_LIGHT: "#FFF3EF",
          TRANSPARENT: "rgba(255, 87, 34, 0.25)",
          ALMOST_WHITE: "#FAFAFA",
          dark: "#E65100",
        },
        functional: {
          DEFAULT: "#F93A00",
          gray: "rgba(26, 26, 26, 0.50)",
          LIGHT: "#FFF3EF",
          dark: "#008BA3",
        },
        dark: {
          super: "#16151B",
          lighter: "#2B2934",
          upper: "#3A3846",
        },
        secondary: {
          DEFAULT: "#1A1A1A", // Light theme color
          dark: "#008BA3", // Dark theme variant
        },
      },
    },
  },
  plugins: [],
};
export default config;
