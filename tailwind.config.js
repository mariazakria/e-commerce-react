/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    container:{
      center:true,
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },

    extend: {
      colors: {
        primary : {
          50: '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000',
          600: '#e60000',
          700: '#cc0000',
          800: '#b30000',
          900: '#990000',
        },
        mainColor: '#ff0000',
        secondColor: '#ff3333',
        textColor: '#1D242D',
      },
      
    },
  },
  plugins: [],
}

