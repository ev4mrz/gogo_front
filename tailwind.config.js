/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff007a',
        secondary: '#000000',
        accent: '#ffffff',
        dark: '#0a0a0a',
        'glass-white': 'rgba(255, 255, 255, 0.1)',
        'glass-black': 'rgba(0, 0, 0, 0.3)',
        'fuchsia-glow': 'rgba(255, 0, 122, 0.3)',
        // Monochrome palette
        'mono-white': '#ffffff',
        'mono-gray-50': '#f9fafb',
        'mono-gray-100': '#f3f4f6',
        'mono-gray-200': '#e5e7eb',
        'mono-gray-300': '#d1d5db',
        'mono-gray-400': '#9ca3af',
        'mono-gray-500': '#6b7280',
        'mono-gray-600': '#4b5563',
        'mono-gray-700': '#374151',
        'mono-gray-800': '#1f2937',
        'mono-gray-900': '#111827',
        'mono-black': '#000000',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-fuchsia': 'linear-gradient(135deg, #ff007a 0%, #000000 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(255, 0, 122, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(255, 0, 122, 0.8)' },
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
} 