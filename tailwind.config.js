/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)',
        button: 'var(--button)',
        button_hover: 'var(--button-hover)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent_hover: 'var(--accent-hover)',
        accent: 'var(--accent)',
      },
    },
  },
  plugins: [],
}

