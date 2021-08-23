// See https://tailwindcss.com/docs/configuration for details
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")
var Color = require("color")

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
      secondary: {
        DEFAULT: "#1e3556",
        light: Color("#1e3556").lighten(0.2).hex(),
        dark: Color("#1e3556").darken(0.2).hex(),
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
      gray: { ...defaultTheme.colors.gray },
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

    spacing: {
      0: "0",
      1: "0.3rem",
      2: "0.6rem",
      3: "1.2rem",
      4: "1.8rem",
      5: "2.4rem",
      6: "3rem",
      7: "3.6rem",
      8: "4.2rem",
      9: "5.4rem",
      10: "7.2rem",
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
      sm: ["1rem", "1.6rem"],
      base: ["1.125rem", "1.8rem"],
      lg: ["1.5rem", "2.15rem"],
      xl: ["1.75rem", "2.3rem"],
      headingSm: ["2rem", "2.6rem"],
      headingBase: ["2rem", "2.5rem"],
      headingLg: ["2.5rem", "3rem"],
      headingXl: ["3rem", "3.5rem"],
    },

    fontWeight: {
      light: 300,
      normal: 400,
      bold: 700,
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
      // add increased background size for gradient buttons
      backgroundSize: {
        "size-200": "200% 200%",
        "size-300": "300% 300%",
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
