const defaultTheme = require("tailwindcss/defaultTheme");

const customColor = {
  dark: {
    9: "#121212",
    8: "#272727",
    7: "#3D3D3D",
    6: "#525252",
    5: "#686868",
    4: "#7D7D7D",
    3: "#939393",
    2: "#A8A8A8",
    1: "#BEBEBE",
  },
  accent: {
    1: "#86E7B7",
    2: "#74E4AD",
    3: "#63E0A3",
    4: "#52DD99",
    5: "#41da8f",
    6: "#3CC782",
    7: "#36B376",
    8: "#309F69",
    9: "#2A8B5C",
  },
};

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["./src/**/*.svelte", "./src/**/*.html"],
  },
  theme: {
    extend: {
      colors: customColor,
      placeholderColor: customColor,
    },
    fontFamily: {
      sans: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
    },
  },
  variants: [
    "responsive",
    "hover",
    "focus",
    "group-hover",
    "even",
    "last",
    "disabled",
  ],
  plugins: [],
};
