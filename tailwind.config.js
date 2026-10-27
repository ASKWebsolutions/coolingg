/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#142C56',
          deep: '#0C1C3A',
          ink: '#0A1730',
          soft: '#1E3D70',
        },
        iso: {
          orange: '#F45A0A',
          blue: '#0785D6',
          charcoal: '#414141',
          white: '#FFFFFF',
          'soft-white': '#F8FAFC',
          ice: '#EAF5FC',
          pale: '#FFF1E8',
          mist: '#D9E4EE',
        },
      },
      fontFamily: {
        display: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        mega: '-0.04em',
        wide2: '0.22em',
      },
      maxWidth: {
        shell: '82rem',
      },
      screens: {
        xs: '23rem',
      },
    },
  },
  plugins: [],
};
