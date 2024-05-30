/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  content: [],
  theme: {
    extend: {
      colors: {
        'sidebar-color': '#151515',
        'header-color': '#232323',
        'background-color': '#2B3032',
        'list-color': '#4b5563'
      }
    },
  },
  variants: {
    extends: {},
  },
  plugins: [],
}

