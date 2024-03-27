/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: '#7A5AF9',
        'primary-dimmer': '#6544E5',
        secondary: '#E1F564',
        'secondary-dimmer': '#C3DC2B',
        light: '#E8E8E8',
        darkest: '#111',
        darker: '#191919',
        dark: '#222',
        gray: '#313131',
        lightgray: '#787878'
      },
      fontFamily: {}
    }
  },
  plugins: []
}
