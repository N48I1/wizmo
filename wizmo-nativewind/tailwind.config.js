/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Kid-friendly vibrant colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        accent: {
          pink: '#FF69B4',
          yellow: '#FFD700',
          cyan: '#00FFFF',
          lime: '#7FFF00',
          orange: '#FF8C00',
          purple: '#9370DB',
        },
      },
      fontFamily: {
        'rounded': ['Nunito', 'System'],
      },
    },
  },
  plugins: [],
};
