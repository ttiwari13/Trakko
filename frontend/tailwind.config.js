// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         bitcount: ['"Bitcount Single"', 'sans-serif'],
         bitcountDouble: ['"Bitcount Prop Double"', 'sans-serif'],
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }, 
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite', 
      }
    },
  },
  plugins: [],
}

