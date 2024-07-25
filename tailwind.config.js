/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens:{
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px"
    },
    extend: {
      colors:{
          darkPurple:'#512E67',
          purple: "#7B50F3",
          palePurple:'#C8C8E6',
          lilac:'#DEDEFF',
          softPurple:'#F2F2FE',
          white:'#FFFFFF',
          black:'#000000',
          lightBlack:'#2B2B2B',

      },
    },
  },
  plugins: [],
}

