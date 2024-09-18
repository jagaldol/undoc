import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "main-theme": "#365DA4",
        "bg-theme": "#F7F9FB",
      },
      boxShadow: {
        "focus-main-theme-thin": "0 0 4px 4px rgba(54, 93, 164, 0.1)", // main-theme 색상의 투명도를 조정하여 그림자 생성
      },
      fontFamily: {
        GmarketSansMedium: ["GmarketSansMedium", "Arial", "Helvetica", "sans-serif"],
        SUITRegular: ["SUIT-Regular", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
