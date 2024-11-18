/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-15deg)' },
          '40%': { transform: 'rotate(15deg)' },
          '60%': { transform: 'rotate(-15deg)' },
          '80%': { transform: 'rotate(15deg)' }
 
        }
      },
      animation: {
        "shake": 'shake 1s linear infinite'
      }
    },
  },
  plugins: [],
};
