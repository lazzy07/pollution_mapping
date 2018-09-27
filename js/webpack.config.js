const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require( 'nodemon-webpack-plugin' )

module.exports = {
  entry: ["@babel/polyfill", './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    // rules: [{
    //   test: /\.js?$/,
    //   exclude: [/node_modules/],
    //   loader: 'babel-loader',
    //   query: {
    //     presets: ["@babel/env"]
    //   }
    // }]
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [require('@babel/plugin-proposal-object-rest-spread')]
          }
        }, {loader: "source-map-loader"}],
        enforce: "pre"
      }
    ]
  },
  devtool: 'eval-source-map',
  plugins: [
    new NodemonPlugin(),
  ],
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};