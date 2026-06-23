/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    extend: {
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
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
