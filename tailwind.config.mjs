import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        w1600: { max: '1600px' },
        w1400: { max: '1400px' },
        w1200: { max: '1200px' },
        w1100: { max: '1100px' },
        w900: { max: '900px' },
        w800: { max: '800px' },
        w600: { max: '600px' },
        w500: { max: '500px' },
        w400: { max: '400px' },
      },
      colors: {
        lightModeText: '#1f1f2e',
        darkModeText: '#f8f8f2',

        lightModeBg: '#f8f8ff',
        darkModeBg: '#282a36',

        lightModeIcon: '#44475a',
        darkModeIcon: '#f8f8f2',

        lightModeBgHover: '#e4e4ff',
        darkModeBgHover: '#44475a',

        lightDraculaBg: '#f8f8ff',
        lightDraculaPanel: '#ececff',
        lightDraculaBorder: '#d4cfff',
        lightDraculaText: '#24243d',
        lightDraculaMuted: '#6d6ea6',
        lightDraculaAccent: '#8b79f5',

        draculaBg: '#282a36',
        draculaPanel: '#21222c',
        draculaBorder: '#6272a4',
        draculaText: '#f8f8f2',
        draculaMuted: '#b7b3ff',
        draculaAccent: '#bd93f9',
        draculaAccent2: '#ff79c6',
        draculaGreen: '#50fa7b',
        draculaYellow: '#f1fa8c',
        draculaCyan: '#8be9fd',
        draculaOrange: '#ffb86c',
      },
      backgroundImage: {
        lightModeGradient:
          'radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.5),rgba(0,0,0,0))',
        darkModeGradient:
          'radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.3),rgba(255,255,255,0))',
      },
      borderRadius: {
        base: '10px', // dont make this value greater than 30px because it can make some elements look weird e.g. search element and search results
      },
    },
  },
  plugins: [typography],
  darkMode: 'class',
}
