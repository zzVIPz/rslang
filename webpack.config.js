const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: {
      index: ['./src/index.js', './src/sass/index.scss'],
      main: ['./src/js/main.js', './src/sass/main.scss'],
      about: ['./src/sass/about.scss'],
      promo: ['./src/sass/promo.scss'],
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: './src/js/[name].js',
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: false, sourceMap: true } },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|svg|ico|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },
    devServer: {
      contentBase: './dist',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        favicon: 'src/assets/favicon/favicon.ico',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        filename: 'pages/main.html',
        template: 'src/pages/main.html',
        chunks: ['main'],
      }),
      new HtmlWebpackPlugin({
        filename: 'pages/about.html',
        template: 'src/pages/about.html',
        chunks: ['about'],
      }),
      new HtmlWebpackPlugin({
        filename: 'pages/promo.html',
        template: 'src/pages/promo.html',
        chunks: ['promo'],
      }),
      new CopyPlugin([
        { from: 'src/assets/images', to: 'src/assets/images' },
        { from: 'src/assets/favicon', to: 'pages' },
        { from: 'src/assets/svg', to: 'src/assets/svg' },
        { from: 'src/assets/fonts', to: 'src/assets/fonts' },
      ]),
      new MiniCssExtractPlugin({
        filename: './src/css/[name].css',
      }),
    ],
  };

  return config;
};
