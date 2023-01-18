/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
      colors: {
        bgmain: "#FAFAFE",
        cartbg: "#F9A109",
        redbox: "#EB5757",
        greybg: "#454545",
      },
    },
  },
  plugins: [],
};
