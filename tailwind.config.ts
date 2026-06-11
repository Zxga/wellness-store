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
        background: '#120308',
        surface: '#1F0810',
        elevated: '#2A0A14',
        primary: '#C2185B',
        'primary-dark': '#A01548',
        secondary: '#F06292',
        accent: '#F8BBD0',
        'text-primary': '#FFFFFF',
        'text-secondary': 'rgba(255,255,255,0.6)',
        danger: '#FF4081',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
        pill: '999px',
      },
    },
  },
  plugins: [],
};

export default config;
