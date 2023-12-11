/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#1db954',
        'secondary' : '#212121',
        'textLighter' : '#f0efef',
        'textDark' : '#2d2d2d',
        'textLight': '#bbc7c7'
      }
    },
  },
  plugins: [],
}