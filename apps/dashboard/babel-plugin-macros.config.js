const { join } = require('path');

module.exports = {
  // Options: https://github.com/ben-rogerson/twin.macro/blob/master/docs/options.md
  twin: {
    preset: 'emotion',
    config: join(__dirname, 'tailwind.config.js'),
  },
};
