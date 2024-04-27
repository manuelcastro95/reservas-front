/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fire-sans': ['fire-sans', 'sans-serif'],
      },
      colors: {
        'soft-white': '#FEFEFE',
        'teal-blue': '#23D6DB',
        'bright-blue': '#006DFA',
        'vivid-red': '#FF505D',
        'deep-black': '#020401',
        'primary-blue': '#007BFF',
        'secondary-gray': '#6C757D',
        'background-light': '#F8F9FA',
        'success-green': '#28A745',
        'warning-orange': '#FFC107',

        'sky-blue': '#87CEEB',
        'steel-blue': '#4682B4',
        'slate-blue': '#6A5ACD',
        'powder-blue': '#B0E0E6',
        'light-steel-blue': '#B0C4DE',
        'light-gray': '#F0F0F0',
        'dark-charcoal': '#303030',
        'soft-cream': '#FFF9E6',
        'earthy-green': '#4F7942',
        'dusty-red': '#CC6666',
        'muted-coral': '#FF6F61'
      }
    },
  },
  plugins: [],
}

