const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#f1f7f4",
          100: "#e2ece6",
          200: "#c6dccd",
          300: "#9cc7ad",
          400: "#71a888",
          500: "#4d8a68",
          600: "#3a7054",
          700: "#2f5d46",
          800: "#274b39",
          900: "#1f3d2f",
          950: "#10251b",
        },
      },
      fontFamily: {
        display: ["Spectral", "Georgia", "Times New Roman", "serif"],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      typography: {
        DEFAULT: {
          css: {
            "h1 code, h2 code, h3 code, h4 code, h5 code, h6 code": {
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "0",
              fontWeight: "inherit",
              fontSize: "inherit",
              fontFamily: "inherit",
              color: "inherit",
              "&::before": { content: "none" },
              "&::after": { content: "none" },
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // painted a blue-600 border and ring on every focused input site-wide
    // (including the Cmd+K palette), which clashed with the accent palette.
    // Inputs now carry their own explicit focus styles.
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/aspect-ratio"),
  ],
};
