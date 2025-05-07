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
      // Añade estas animaciones
      animation: {
        float1: 'float1 8s ease-in-out infinite',
        float2: 'float2 10s ease-in-out infinite',
        float3: 'float3 12s ease-in-out infinite',
        float4: 'float4 9s ease-in-out infinite',
        float5: 'float5 11s ease-in-out infinite',
        float6: 'float6 7s ease-in-out infinite',
        float7: 'float1 13s ease-in-out infinite',
        float8: 'float2 14s ease-in-out infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(15px) translateX(-15px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-15px) translateX(15px)' },
        },
        float4: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(10px) translateX(-10px)' },
        },
        float5: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-25px) translateX(5px)' },
        },
        float6: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(5px) translateX(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
