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
        text_dark: 'var(--text-dark)',
        button_dark: 'var(--button-dark)',
        button_hover_dark: 'var(--button-hover-dark)',
        primary_dark: 'var(--primary-dark)',
        secondary_dark: 'var(--secondary-dark)',
        accent_dark: 'var(--accent-dark)',
        accent_hover_dark: 'var(--accent-hover-dark)',
      },
    },
  },
  plugins: [],
}

