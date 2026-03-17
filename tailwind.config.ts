import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        syngenta: {
          blue: '#0057b8',
          deep: '#0a2240',
          green: '#78be20',
          yellow: '#f2c94c',
          offwhite: '#f5f7f4',
          earth: '#7f7566',
        },
      },
      fontFamily: {
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 48px rgba(10, 34, 64, 0.12)',
        panel: '0 30px 80px rgba(7, 24, 44, 0.20)',
      },
      backgroundImage: {
        'noise-soft':
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,.35) 1px, transparent 0)",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
