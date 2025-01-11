const colors = require('./src/ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
        "primary-nunito": "Font-Regular", // For `font-medium`
        "semibold-nunito": "Font-SemiBold", // For `font-semibold`
        "bold-nunito": "Font-Bold", // For `font-bold`
        "light-nunito":"Font-Light", // For "font-light"
        "medium-nunito":"Font-Medium", // For "medium-nunito"
        "extra-bold-nunito":"Font-Extra-Bold"
      },
      colors,
    },
  },
  plugins: [],
};
