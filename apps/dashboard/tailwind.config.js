const { join } = require('path');

const workspacePreset = require('../../tailwind-workspace-preset.js');

/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [workspacePreset],
  mode: 'jit',
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'modules/**/*.{js,ts,jsx,tsx}'].map(
    (path) => join(__dirname, path),
  ),
  theme: {
    extend: {
      colors: {
        electric: '#db00ff',
      },
    },
    screens: {
      xs: '0',
      // => @media (min-width: 0px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
