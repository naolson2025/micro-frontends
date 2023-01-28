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
    port: 8080,
    historyApiFallback: {
      index: 'index.html',
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        // the name of the remote app and the url to the remote app
        // the name of the remote app must match the name in the remote app's webpack config
        marketing: 'marketing@http://localhost:8081/remoteEntry.js'
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ]
}

// devConfig being second will override the commonConfig
// if there are any conflicts
module.exports = merge(commonConfig, devConfig);