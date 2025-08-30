/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#131722',
        'dark-card': '#1e222d',
        'dark-border': '#2a2e39',
        'light-bg': '#f0f2f5',
        'light-card': '#ffffff',
        'light-border': '#e0e3eb',
        'positive': '#26a69a',
        'negative': '#ef5350',
      },
    },
  },
  plugins: [],
}
