/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'register-abstract': "url('src/assets/6865882.jpg')",
      }
    },
  },
  plugins: [],
}

