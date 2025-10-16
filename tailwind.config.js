/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shu: {
          red: '#CE1141',
          black: '#000000',
          grey: '#6B7280',
          darkgrey: '#374151',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'tv': '1920px',  // Add custom breakpoint for TV
      },
    },
  },
  plugins: [],
}
