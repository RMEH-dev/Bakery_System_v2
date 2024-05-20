/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/components/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    margins: {
      m1: '150px',
      m2: '250px',
      m3: '350px',
      m4: '450px',
      m5: '550px',
      m6: '650px',
      m7: '750px',
    },
    widths: {
      w1: '150px',
      w2: '250px',
      w3: '350px',
      w4: '450px',
      w5: '550px',
      w6: '650px',
    },
    colors: {
      c1: "#3E2212",
      c2: "#FFEFE6",
      c3: "#672C0B",
      c4: "#D9D9D9",
      c5: "#FFD8C3",
      c6: {
        100: "#920000",
        200: "#ab3d28",
        300: "#c1644f",
        400: "#d58a78",
        500: "#e6b1a3",
        600: "#f4d7d0",
      },
      c7: "#0C9200",
    },
    font: {
      font2: ["Montserrat", "sans-serif"],
    }
  },
    extend: {},
  plugins: [],
});
