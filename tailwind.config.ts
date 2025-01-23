import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#0477FE',
        gray: '#DEE2F6',
        bgGray: '#F5F5F5',
        black: '#171717',
      },
    },
  },
  plugins: [],
} satisfies Config
