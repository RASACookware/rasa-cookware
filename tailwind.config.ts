// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                cormorant: ["var(--font-cormorant)", "serif"],
                aboreto: ["var(--font-aboreto)", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
