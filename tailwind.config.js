/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // This should match the location of your index.html
    "./src/**/*.{js,ts,jsx,tsx}",   // This should match your React component files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Onest Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: { DEFAULT: "#07090f", panel: "#0e1626", raised: "#141f33" },
        accent: { DEFAULT: "#22d3ee", text: "#67e8f9" },
      },
    },
  },
  plugins: [],
}
