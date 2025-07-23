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
        primary: {
          50: '#f0f0ff',
          100: '#e6e6ff',
          500: '#0A0089',
          600: '#080072',
          700: '#06005a',
          800: '#040043',
          900: '#02002c',
        },
        secondary: {
          500: '#FF0080',
          600: '#e6006b',
          700: '#cc0066',
        },
        accent: {
          cyan: '#00FFE1',
        },
      },
      backgroundImage: {
        'gradient-novit': 'linear-gradient(135deg, #0A0089 0%, #FF0080 50%, #00FFE1 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(10, 0, 137, 0.4)' },
          '100%': { boxShadow: '0 0 40px rgba(10, 0, 137, 0.8)' }
        }
      }
    },
  },
  plugins: [],
};

export default config;
