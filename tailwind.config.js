/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'minibiscos-pink': '#ECA8AA',
        'minibiscos-brown': '#332C2B',
        'minibiscos-white': '#FFFFFF'
      },
      fontFamily: {
        'amsterdam': ['Amsterdam One', 'sans-serif']
      }
    },
  },
  plugins: [],
};
