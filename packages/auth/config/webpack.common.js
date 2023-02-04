// this webpack common file will be used by both the dev & prod webpack files

// babel is used to transpile JS
// into an older version of JS that older & newer browsers can understand

module.exports = {
  module: {
    rules: [
      {
        // test: what files should be included in the babel loader
        test: /\.m?js$/,
        // exclude: what files should be excluded from the babel loader
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // will allow us to use async/await & other features
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
};
