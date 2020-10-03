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
  devtool: 'inline-source-map',
  externals: {
    crypto: 'crypto'
  }
};
