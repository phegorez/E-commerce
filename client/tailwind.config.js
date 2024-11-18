/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//           "roboto": ['Roboto', 'serif']
//       }
//   },
//   },
//   plugins: [],
// }

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
          "roboto": ['Roboto', 'serif']
      },
  },
  },
  plugins: [],
});