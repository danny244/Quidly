/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        lgr: "1150px",
        xxl: "1900px",
      },

      fontFamily: {
        'outfit': ['Outfit', 'sans-serif'],
      },

      colors: {
        primary: '#eacf67e5',
        secondary: '#ffffff',
        tertiary: '#fff9',
      },

      backgroundColor: {
        primary: '#1a202b',
        secondary: '#eacf67e5',
        tertiary: '#141922',
        pure: '#ffffff'
      },

      boxShadow: {
        'shadow-color': '0 10px 40px #141922',
        'modal': '0px 10px 40px #00000067',
      },

    },
  },
  plugins: [],
}