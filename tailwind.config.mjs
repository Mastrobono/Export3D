/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "kuunari-bold": ["Kuunari Bold", "sans-serif"],
        "kuunari-bold-condensed": ["Kuunari Bold Condensed", "sans-serif"],
        "kuunari-medium": ["Kuunari Medium", "sans-serif"],
        "kuunari-light": ["Kuunari Light", "sans-serif"],
      },
      colors: {
        lightGrey: "#1a1a1a",
        darkGrey: "#121212",
        accent: "#f3d227",
      },
      backgroundImage: {
        gradientOverlay:
          "linear-gradient(176deg, rgb(0 0 0 / 42%) 0%, rgb(0 0 0 / 0%) 100%)",
      },
    },
  },
  plugins: [],
};
