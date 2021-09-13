const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'ts-loader'
      },
      // {
      //   test: require.resolve('Phaser'),
      //   loader: 'expose-loader',
      //   options: { exposes: { globalName: 'Phaser', override: true } }
      // }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: 'localhost',
    port: 8080,
    open: false
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};
