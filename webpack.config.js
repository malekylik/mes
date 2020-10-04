const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts']
  },
  entry: {
    main: path.resolve(__dirname, path.join('src', 'angular', 'service-worker', 'service-worker.ts')),
  },
  output: {
    filename: 'service-worker.js',
    path: path.resolve(__dirname, path.join('src', 'angular')),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  externals: {
    crypto: 'crypto'
  }
};
