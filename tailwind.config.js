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
        body: {
          1: "#F9F9F9",
          'dark-1': "#0A101A",
          'dark-2': "#030911",
          'dark-3': "#02080F",
        },
        text: {
          DEFAULT: "#2E335B",
          dark: "#FFF",
        },
        accent: "#3D56B2"
      },
    },
  },
  plugins: [],
};
