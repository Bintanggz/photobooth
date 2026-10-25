/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'studio-bg': '#121216',
        'studio-card': '#1E1E24',
        'studio-border': '#2E2E38',
        'brand-pink': '#FF4B72',
        'brand-pink-hover': '#E6395E',
        'brand-coral': '#FF6B8B',
        'text-primary': '#F9F9FB',
        'text-secondary': '#A1A1B0',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'studio': '0 20px 40px -15px rgba(0, 0, 0, 0.6)',
        'photo-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'glow-pink': '0 0 25px rgba(255, 75, 114, 0.35)',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top, 0px)',
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
        'safe-left': 'env(safe-area-inset-left, 0px)',
        'safe-right': 'env(safe-area-inset-right, 0px)',
      },
      fontSize: {
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      }
    },
  },
  plugins: [],
}
