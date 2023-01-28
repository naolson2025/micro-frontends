// our npm start script will tell webpack to use this file

// merge in the webpack.common.js file
const { merge } = require('webpack-merge');
// will take html file and inject the bundle.js file into it
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// import the common config
const commonConfig = require('./webpack.common');

// configuration for development env
const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './Marketing': './src/bootstrap'
      },
    }),
  ]
}

// devConfig being second will override the commonConfig
// if there are any conflicts
module.exports = merge(commonConfig, devConfig);