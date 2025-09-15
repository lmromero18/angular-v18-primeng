/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      },
      fontFamily: {
        'fira-sans': ['Fira Sans', 'sans-serif'],
      },
      screens: {
        print: { raw: "print" },
      },
      colors: {
        dark: "#192852",
        primary: {
          DEFAULT: "#23438f",
          50: "#eff7ff",
          100: "#dcebfd",
          200: "#c1ddfc",
          300: "#96c9fa",
          400: "#64aaf6",
          500: "#408af1",
          600: "#2b6ce5",
          700: "#2257d3",
          800: "#2247ab",
          900: "#23438f",
          950: "#192852",
        },
        danger: {
          DEFAULT: "#e24c4c",
          50: "#fff2ed",
          100: "#ffe2d5",
          200: "#fdc1ab",
          300: "#fc9575",
          400: "#f95c3a",
          500: "#f73618",
          600: "#e81e0e",
          700: "#c0120e",
          800: "#991315",
          900: "#7b1314",
          950: "#42080c",
        },
        dark: {
          50: "#f3f6f8",
          100: "#e1e7ec",
          200: "#c6d2db",
          300: "#9eb2c2",
          400: "#6f89a2",
          500: "#536d87",
          600: "#485c72",
          700: "#3f4d5f",
          800: "#394351",
          900: "#333a46",
        },
        info: {
          50: "#effaf5",
          100: "#d8f3e6",
          200: "#b3e7d0",
          300: "#78d0af",
          400: "#4eb994",
          500: "#2b9e7a",
          600: "#1d7e62",
          700: "#176551",
          800: "#145141",
          900: "#124236",
        },
        warning: {
          DEFAULT: "#e5cd0d",
          50: "#fdfee8",
          100: "#fafdc4",
          200: "#f9fb8d",
          300: "#f9f54b",
          400: "#f5e71a",
          500: "#e5cd0d",
          600: "#c6a208",
          700: "#9e750a",
          800: "#825c11",
          900: "#6f4b14",
        },
        placeholder: {
          DEFAULT: '#6b7280',
        },
      },
      height: {
        'standard-height': '2.2rem',
      },
      fontSize: {
        'input': '0.1rem',
      }
    },
  },
  plugins: [],
}