/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        rolex: {
          green: '#006039',
          gold: '#c9a227',
          lightGold: '#e6c96a',
          ink: '#0b0b0d',
          charcoal: '#16181c',
          silver: '#d8d8d8'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest2: '0.35em'
      }
    }
  },
  plugins: []
}
