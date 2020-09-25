module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" }
        // => @media print { ... }
      },
      spacing: {
        30: "6.5rem"
      },
      boxShadow: {
        innerlg: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.16)"
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
        },
        myred: {
          100: "#fcd6e2",
          200: "#f8adc5",
          300: "#f584a7",
          400: "#f15b8a",
          500: "#ee326d",
          600: "#be2857",
          700: "#8f1e41",
          800: "#5f142c",
          900: "#300a16"
        },
        mygray: {
          100: "#edf2f2",
          200: "#dae4e6",
          300: "#c8d7d9",
          400: "#b5c9cd",
          500: "#a3bcc0",
          600: "#82969a",
          700: "#627173",
          800: "#414b4d",
          900: "#212626"
        },
        myindigo: {
          100: "#cfdde0",
          200: "#9fbac1",
          300: "#7098a2",
          400: "#407583",
          500: "#105364",
          600: "#0d4250",
          700: "#0a323c",
          800: "#062128",
          900: "#031114"
        },
        mypink: {
          100: "#fbeaeb",
          200: "#f7d5d7",
          300: "#f3c0c3",
          400: "#efabaf",
          500: "#eb969b",
          600: "#bc787c",
          700: "#8d5a5d",
          800: "#5e3c3e",
          900: "#2f1e1f"
        },
        myorange: {
          100: "#fcdfcc",
          200: "#f9c099",
          300: "#f6a067",
          400: "#f38134",
          500: "#f06101",
          600: "#c04e01",
          700: "#903a01",
          800: "#602700",
          900: "#301300"
        }
      }
    }
  },
  variants: {
    borderRadius: ["first", "last"]
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};
