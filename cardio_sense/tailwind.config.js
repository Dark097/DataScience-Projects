/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#030509',
          900: '#05070D',
          850: '#080C14',
          800: '#0B0F19',
          750: '#0F131D',
          700: '#131A2B',
          600: '#1A2338',
          500: '#263453',
        },
        clinical: {
          cyan: '#06B6D4',
          'cyan-bright': '#22D3EE',
          'cyan-glow': 'rgba(6, 182, 212, 0.15)',
          red: '#EF4444',
          'red-bright': '#F87171',
          'red-glow': 'rgba(239, 68, 68, 0.15)',
          emerald: '#10B981',
          'emerald-bright': '#34D399',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        body: ['var(--font-source-sans)', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'cockpit': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ecg-scan': 'scanline 2.5s linear infinite',
        'heartbeat': 'heartbeat 1.2s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.15)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
