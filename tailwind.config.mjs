/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "kuunari-bold": ["Kuunari Bold", "sans-serif"],
        "kuunari-bold-condensed": ["Kuunari Bold Condensed", "sans-serif"],
        "kuunari-medium": ["Kuunari Medium", "sans-serif"],
        "kuunari-light": ["Kuunari Light", "sans-serif"],
        "kuunari-regular": ["Kuunari Regular", "sans-serif"],
      },
      colors: {
        lightgray: "#1a1a1a",
        darkgray: "#121212",
        "accent-400": "#f9c461",
        "accent-500": "#f3d227",
        "accent-600": "#f3d227",
      },
      backgroundImage: {
        gradientOverlayHero:
          "linear-gradient(176deg, rgb(0 0 0 / 42%) 0%, rgb(0 0 0 / 0%) 100%)",
        gradientOverlayFeature:
          "linear-gradient(92deg, rgb(0 0 0 / 37%) 0%, rgb(0 0 0 / 25%) 100%)",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        default: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      maxWidth: {
        "8xl": "calc(100% - 6rem)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
