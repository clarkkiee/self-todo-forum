/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/src/assets/bg-2.jpg')",
      },
      colors: {
        "primary-dark": "#1F2544",
        "secondary-dark": "#474F7A",
        purple: "#81689D",
        pink: "#FFD0EC",
      },
    },
  },
  plugins: [],
};
