/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-blue': '#8ECAE6',
        'ghibli-green': '#8BD3C7',
        'ghibli-pink': '#FFAFCC',
        'ghibli-cream': '#FFF1D0',
        'ghibli-brown': '#A68A64',
      },
      fontFamily: {
        'ghibli': ['"Comic Sans MS"', 'cursive'], // You can replace with a more appropriate font
      },
      backgroundImage: {
        'forest-pattern': "url('/src/assets/forest-bg.jpg')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}