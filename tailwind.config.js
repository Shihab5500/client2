

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
        secondary: "#0EA5E9",
        soft: "#FDF2F8",
        dark: "#0f172a", 
      }
    }
  },
  plugins: []
};