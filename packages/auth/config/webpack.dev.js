// our npm start script will tell webpack to use this file

// merge in the webpack.common.js file
const { merge } = require('webpack-merge');
// will take html file and inject the bundle.js file into it
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// import the common config
const commonConfig = require('./webpack.common');
// import the package.json file
const packageJson = require('../package.json');

// configuration for development env
const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: 'index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/bootstrap',
      },
      // if another project already imported faker
      // then don't import it again and use the existing one
      shared: packageJson.dependencies,
      // ** dif way to import shared modules **
      // singleton: true means that only one instance of faker
      // will be used in the entire application
      // shared: {
      //   faker: {
      //     singleton: true,
      //   }
      // }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
