/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  themes: ["light", "dark", "cupcake"],
  theme: {
    extend: {
      fontFamily: {
        'petit': ['"Petit Formal Script"', 'cursive'],
        'voltaire': ['"Voltaire"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}
