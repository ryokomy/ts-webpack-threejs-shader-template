const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.ts',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.ts', '.js', '.glsl', 'vs', 'fs']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader'
      }
    ],
  },
  watchOptions: {
    ignored: /node_modules/
  }
}
