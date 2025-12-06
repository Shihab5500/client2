/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E11D48",
        secondary: "#0EA5E9",
        soft: "#FDF2F8"
      }
    }
  },
  plugins: []
};
