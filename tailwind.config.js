/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       scrollBehavior: {
        smooth: 'smooth',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(50%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.4s ease-out',
      },
    },
  },
  plugins: [ [require('tailwind-scrollbar')],],
};
