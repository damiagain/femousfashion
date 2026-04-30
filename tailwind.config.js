export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#2B3A55',
          light: '#3D5070',
          dark: '#1E2A3E',
        },
        clay: {
          DEFAULT: '#D4A373',
          light: '#E8C9A4',
          dark: '#B8864F',
        },
        linen: {
          DEFAULT: '#FDFBF7',
          dark: '#F5F0EA',
        },
      },
      fontFamily: {
        fraunces: ['Fraunces', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
}
