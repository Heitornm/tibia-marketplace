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
        // Cores customizadas para o tema Tibia
        tibia: {
          dark: "#050505",
          gold: "#b8903c",
          amber: "#ffbf00",
        },
      },
    },
  },
  plugins: [],
};
export default config;