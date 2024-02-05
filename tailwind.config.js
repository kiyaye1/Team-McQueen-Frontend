/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Poppins'],
      'display': ['Poppins'],
      'body': ['Poppins']
    },
    fontSize: {
      'sm': ['14px', {fontWeight: '400'}],
      'body': ['16px', {fontWeight: '400'}],
      'card-title': ['20px', {fontWeight: '600'}],
      'subhead': ['24px', {fontWeight: '600'}],
      'section-head': ['36px', {fontWeight: '600'}],
      'hero': ['72px', {fontWeight: '800'}]
    },
    colors: {
      'blue_primary': '#000180',
      'blue_primary_accent': '4a4cda',
      'teal_secondary': '#33adad',
      'purple': '9d9dd9',
      'purple-accent': 'f2f2ff',
      'black': '#000000',
      'white': '#ffffff',
      'gray5': 'eae9e9',
      'gray4': 'cccccc',
      'gray3': 'b2b2b2',
      'gray2': '999999',
      'gray1': '8a8a8e',
      'body_copy': '666666',
      'border': 'c6c6c8'
    }
  },
  plugins: [],
}

