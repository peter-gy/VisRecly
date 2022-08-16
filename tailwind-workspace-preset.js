/** @type {import("tailwindcss").Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          DEFAULT: '#2563EB',
        },
        scale: {
          good: '#72D6C9',
          average: '#84a6d6',
          poor: '#4382bb',
          bad: '#a57283',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
