/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        limeGreen: "#D3FD51", // Add your custom color here
      },
    },
  },
  plugins: [],
};