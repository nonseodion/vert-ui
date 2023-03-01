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
        faintGreen: "#CFFFC7",
        border: "#BBBBBB",
        borderLight: '#E8EAED',
        purple: '#6C86AD',
        disabled: '#B0CDAB',
        yellow: '#F3BA2F',
        lightBlue: '#98A1C0',
        lightGrey: '#ECF0F9',
        danger: '#E3402A',
        dark: '#222222',
        dark2: "#333333",
        red: "#FF0000",
        background: "#494949"
      },
      borderRadius: {
        10: "10px"
      },
      fontSize: {
        12: "12px",
        13: '13px'
      }
    },
  },
  plugins: [],
}