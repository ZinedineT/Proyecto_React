module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0f7fe',
          500: '#00b4d8',
          600: '#0096c7',
          700: '#003566',
          800: '#001d3d',
        },
        secondary: {
          500: '#4361ee',
          600: '#3a0ca3',
          700: '#1E5128'
        },
        dark: {
          800: '#1a1a2e',
          700: '#16213e',
          900: '#000000'
        }
      },
    },
  },
  plugins: [],
}
