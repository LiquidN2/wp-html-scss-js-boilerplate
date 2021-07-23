const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
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
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                // preset options
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  targets: 'defaults',
                },
              ],
            ],
          },
        },
      },

      // Load CSS, SASS, SCSS
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          { loader: 'style-loader' },

          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                      autoprefixer: { grid: true },
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              },
            },
          },

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true, // wipe output folder every build
  },
};
