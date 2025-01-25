import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      pro: ["BeaufortPro", ...defaultTheme.fontFamily.sans],
      lato: ["Lato", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        lightGold: "#FFFED0",
        mediumGold: "#FFF7BD",
        darkGold: "#EFC779",
        greenishGrey: "#8C8C73",
        grey: "#797979",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
