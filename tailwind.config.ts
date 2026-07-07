import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A07A',
          50:  '#FBF6EF',
          100: '#F5E9D5',
          200: '#EDD3AB',
          300: '#E0BC82',
          400: '#D4A55E',
          500: '#C9A07A',
          600: '#B08050',
          700: '#8A6038',
          light: '#E8D5B7',
          lighter: '#F5EBD8',
          dark: '#A07840',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0E8DC',
          darker: '#E6DDD0',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', ...fontFamily.serif],
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E8D5B7 0%, #C9A07A 50%, #A07840 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      screens: {
        xs: '375px',
      },
    },
  },
  plugins: [],
}

export default config
