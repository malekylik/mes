const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts']
  },
  entry: {
    main: './src/angular/service-worker.ts',
  },
  output: {
    filename: './src/angular/service-worker.js',
    path: path.resolve(__dirname)
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
};
