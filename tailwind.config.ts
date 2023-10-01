import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#afffaf",
      },
      keyframes: {
        wave: {
          "0%, 100%": { opacity: "100", backgroundColor: "#ccc6" },
          "50%": { opacity: "100", backgroundColor: "#ccc" },
          // "100%": { opacity: "0", backgroundColor: "#ccc"}
        }
      },
      animation: {
        "waving-div": "wave 2s ease infinite",
        "waving-div2": "wave 2s ease .5s infinite",
        "waving-div3": "wave 2s ease 1s infinite"
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          // ...
          colors: {
            primary: "#000000",
            DEFAULT: "#FFFFFF",
            foreground: "#000",
            secondary: "#67fa67",
            background: "#fff",
          },
        },
        dark: {
          // ...
          colors: {
            DEFAULT: "#BEF264",
            foreground: "#000000",
          },
        },
        myTheme: {
          // primaryColor: "#afffaf",
          // secondaryColor: "#67fa67",
          // contrastColor: "#ffb451",
          // grayColor: "#cfcfcf",
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
