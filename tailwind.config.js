/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#10B981',
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        surface: '#F8FAFC',
        'bg-subtle': '#F1F5F9',
        'startup-blue': '#4F46E5',
        'startup-green': '#10B981',
        'odisha-gold': '#F59E0B',
        'odisha-red': '#DC2626',
      },
fontFamily: {
        display: ['Plus Jakarta Sans', 'Noto Sans Oriya', 'sans-serif'],
        body: ['Inter', 'Noto Sans Oriya', 'sans-serif'],
        odia: ['Noto Sans Oriya', 'Mukti', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.15)',
      },
      animation: {
        'bounce-subtle': 'bounce 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}