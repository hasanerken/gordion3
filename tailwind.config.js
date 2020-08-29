module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" }
        // => @media print { ... }
      },
      colors: {
        cyan: {
          100: "#ccffff",
          200: "#99ffff",
          300: "#66ffff",
          400: "#33ffff",
          500: "#00ffff",
          600: "#00cccc",
          700: "#009999",
          800: "#006666",
          900: "#003333"
        }
      }
    }
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};
