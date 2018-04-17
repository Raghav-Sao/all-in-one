var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
  filename: '[name]-style.css',
});
var path = require('path');
module.exports = {
  entry: {
    sliderGame: './src/js-projects/slider-game/src/js/index.js',
    clickGame: './src/js-projects/click-game-raw-js/src/js/index.js',
  },
  output: { path: path.resolve(__dirname, 'dist'), filename: '[name]-bundle.js' },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: 'babel-loader',
      //     },
      //   ],
      // }, will use once convert all function in es6 module
      // {
      //   test: /\.(jpg|jpeg|png)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'img/',
      //         publicPath: 'img/',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
    extractPlugin,
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/js-projects/slider-game/index.html',
      chunks: ['sliderGame'],
    }),
    new HtmlWebpackPlugin({
      filename: 'click-game.html',
      template: 'src/js-projects/click-game-raw-js/index.html',
      chunks: ['clickGame'],
    }),
  ],
};

/*
HtmlWebpackPlugin: to add html in dist and include all style and css
*/
