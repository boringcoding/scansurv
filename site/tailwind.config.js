// See https://tailwindcss.com/docs/configuration for details
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
var Color = require("color")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./utils/**/*.{js,ts,jsx,tsx}",
    ],
  },
  theme: {
    colors: {
      primary: {
        DEFAULT: "#ff9a00",
        light: Color("#ff9a00").lighten(0.5).hex(),
        dark: Color("#ff9a00").darken(0.2).hex(),
      },
      success: {
        DEFAULT: defaultTheme.colors.green[500],
        light: Color(defaultTheme.colors.green[500]).lighten(0.2).hex(),
        dark: Color(defaultTheme.colors.green[500]).darken(0.2).hex(),
      },
      error: {
        DEFAULT: defaultTheme.colors.red[500],
        light: Color(defaultTheme.colors.red[500]).lighten(0.2).hex(),
        dark: Color(defaultTheme.colors.red[500]).darken(0.2).hex(),
      },
      white: "#ffffff",
      black: "#000000",
      gray: { ...colors.trueGray },
      transparent: "transparent",
      current: "currentColor",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        smmin: "2rem",
        mdmin: "3rem",
        lgmin: "4rem",
        xlmin: "5rem",
        "2xlmin": "6rem",
      },
    },

    letterSpacing: {
      tighter: "-.05em",
      normal: "0",
      wider: ".125em",
      widest: ".25em",
    },

    spacing: {
      0: "0",
      1: "0.3rem",
      2: "0.6rem",
      3: "1rem",
      4: "1.5rem",
      5: "2rem",
      6: "2.5rem",
      7: "3rem",
      8: "4rem",
      9: "5rem",
      10: "7rem",
    },

    fontFamily: {
      sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      serif: ["Teko", ...defaultTheme.fontFamily.serif],
    },

    /**
     * Font size
     * 1st in array is the size, 2nd is line-height
     */
    fontSize: {
      xs: [".675rem", "1rem"],
      sm: [".75rem", "1.15rem"],
      base: ["0.9rem", "1.4rem"],
      lg: ["1.125rem", "1.625rem"],
      xl: ["1.3rem", "1.8rem"],
      headingSm: ["1.75rem", "2.25rem"],
      headingBase: ["2rem", "2.5rem"],
      headingLg: ["2.5rem", "3rem"],
      headingXl: ["3.5rem", "4rem"],
    },

    fontWeight: {
      light: 300,
      normal: 400,
      bold: 600,
    },

    scale: {
      175: "1.75",
      ...defaultTheme.scale,
    },

    screens: {
      smmin: "640px",
      mdmin: "768px",
      lgmin: "1024px",
      xlmin: "1280px",
      "2xlmin": "1536px",
      "2xlmax": { max: "1535px" },
      xlmax: { max: "1279px" },
      lgmax: { max: "1023px" },
      mdmax: { max: "767px" },
      smmax: { max: "639px" },
    },

    extend: {
      gridTemplateColumns: {
        auto: "repeat(auto-fit,minmax(0,1fr))",
      },
      animation: {
        up: "slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateY(100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      /**
       * Add some custom utilities here to allow us to use with twin
       * Useful as can set some theme defaults here
       */
      const newUtilities = {
        ".gradient": {
          backgroundImage: `linear-gradient(to right, ${theme(
            "colors.tertiary"
          )}, ${theme("colors.secondary")}, ${theme("colors.quaternary")})`,
        },
        ".no-prose-list": {
          "&:before, & li:before": {
            content: "none",
          },
        },
        ".text-shadow": {
          textShadow: `2px 2px 7.5px ${theme("colors.black")}`,
        },
      }
      addUtilities(newUtilities)
    }),
  ],
}
