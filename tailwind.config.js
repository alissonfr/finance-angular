/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        padding: "2rem",
        center: true,
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
        },
      },
      fontFamily: {
        roboto: ["Roboto, sans-serif"],
        nunito: ["Nunito Sans, sans-serif"],
      },
      colors: {
        primary: "#2E335B",
        body: "#EEEDEB",
        "dark-body": "#141332"
      },
    },
  },
  plugins: [],
};
