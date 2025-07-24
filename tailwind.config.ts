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
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#1e293b',
          600: '#334155',
          700: '#475569',
          800: '#64748b',
          900: '#94a3b8',
        },
        secondary: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        accent: {
          cyan: '#06b6d4',
          gold: '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-novit': 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
        'gradient-novit-accent': 'linear-gradient(135deg, #1e293b 0%, #3b82f6 50%, #06b6d4 100%)',
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
