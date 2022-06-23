const { join } = require('path');

const workspacePreset = require('../../tailwind-workspace-preset.js');

/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [workspacePreset],
  mode: 'jit',
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'modules/**/*.{js,ts,jsx,tsx}'].map(
    (path) => join(__dirname, path)
  ),
  theme: {
    extend: {
      colors: {
        electric: '#db00ff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
