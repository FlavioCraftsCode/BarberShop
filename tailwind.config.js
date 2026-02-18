/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#f59e0b',  
        'dark-bg': '#0f0f0f',
        'darker': '#121212',
      },
    },
  },
  plugins: [],
}