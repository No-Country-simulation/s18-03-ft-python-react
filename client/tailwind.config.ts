import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          //main color for font highlighting stuff
          green: '#1DB954',
          //black to highlight div sometimes
          black: '#191414',
          // font colors
          white: '#FFFFFF',
          // we can use this one to separete sections
          'light-gray': '#17171C',
          //hover to those sections where we got light-gray
          'dark-gray': '#090A0C',
        }
      },
    },
  },
  plugins: [],
};
export default config;
