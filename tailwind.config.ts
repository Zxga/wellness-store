import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16A34A',
        'primary-dark': '#15803D',
        secondary: '#F59E0B',
        background: '#FAFAF9',
        surface: '#FFFFFF',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
        danger: '#DC2626',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        btn: '8px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
