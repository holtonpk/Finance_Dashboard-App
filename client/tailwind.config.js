/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        c1: "#21BE6C",
        c160: "rgb(214,245,232)",
        c2: "#E60000",
        c220: "rgb(47, 102, 238, .2)",
        white40: "rgb(255, 255, 255, .2)",
        c3: "#2F66EE",
        c4: "#DECB94",
        c5: "#FB8871",
        c6: "#D255D1",
        c7: "#FFC35A",
        c8: "#0A0A0A",
        c9: "#0F0F0F",
        c10: "#181818",
        c11: "#FEFEFE",
        c12: "#787878",
      },
    },
  },
  plugins: [],
};
