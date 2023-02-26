/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {
      aria: {
        current: 'current=page'
      },
      typography: {
        DEFAULT: {
          css: {
            'ul ul, ul ol, ol ul, ol ol': {
              marginTop: '0',
              marginBottom: '0'
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
