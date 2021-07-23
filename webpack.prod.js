const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: true,
      scriptLoading: 'defer',
    }),
  ],

  module: {
    rules: [
      // Load JS
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // See babel.config.js
      },

      // Load CSS, SASS, SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extract CSS from JS
          MiniCssExtractPlugin.loader,

          // Translates CSS into CommonJS
          'css-loader',

          // Add PostCSS Autoprefixer (see postcss.config.js)
          'postcss-loader',

          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
});
