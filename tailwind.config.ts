import { fontFamily } from "tailwindcss/defaultTheme";
import formsPlugin from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
    },
  },
  plugins: [formsPlugin()],
} satisfies Config;
