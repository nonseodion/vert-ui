/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nav: '#2D2B28',
        black: '#1E1E1E',
        primary: '#72BF65',
        grey: '#A5A5A5',
        placeholder: "#828F9C",
        lightGreen: "#DEE7DD",
        border: "#BBBBBB",
        borderLight: '#E8EAED',
        purple: '#6C86AD',
        cta: '#B0CDAB',
        yellow: '#F3BA2F'
      },
      borderRadius: {
        10: "10px"
      },
      fontSize: {
        12: "12px"
      }
    },
  },
  plugins: [],
}