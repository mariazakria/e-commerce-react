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
        mainColor: '#2563eb',
        secondColor: '#FF6B6C',
        textColor: '#1D242D',
      },
      
    },
  },
  plugins: [],
}

