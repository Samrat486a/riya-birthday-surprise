/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060810',
          900: '#0b0f1d',
          850: '#10162b',
          800: '#161e38',
          700: '#222d52',
        },
        champagne: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f6eedb',
          300: '#eddcb7',
          400: '#e1c38a',
          500: '#d4aa5f',
          600: '#be8f49',
        },
        rosewood: {
          400: '#e58e94',
          500: '#d76f77',
          600: '#b84e56',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
