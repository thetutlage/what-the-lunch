const { join } = require('path')
const tailwindcss = require('tailwindcss')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  entry: './resources/frontend/js/app.js',
  output: {
    filename: 'app.js',
    path: join(__dirname, './public')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [tailwindcss(join(__dirname, './tailwind.js'))]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
      chunkFilename: '[id].css'
    })
  ]
}
