/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{liquid,json}'],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Gelica'],
        'noto': ['Noto Sans Display'],
      },
    },
  },
  plugins: [],
}

