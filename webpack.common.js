const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/app.js'),
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // wipe output folder every build
  },
};
