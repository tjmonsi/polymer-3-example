const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/core/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../public')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules')
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/core/index.ejs'),
      inject: false,
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs/*.js'),
        to: 'webcomponentsjs/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs/*.map'),
        to: 'webcomponentsjs/[name].[ext]'
      }
    ])
  ],
  module: {
    rules: [
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: [
          //     ['env', {
          //       modules: false,
          //       useBuiltIns: true,
          //       targets: {
          //         browsers: [
          //           '> 1%',
          //           'last 2 versions',
          //           'Firefox ESR',
          //         ],
          //       },
          //     }],
          //   ],
          // },
          options: {
            presets: [
              ['env', {
                modules: false,
                useBuiltIns: true,
                targets: {
                  browsers: [
                    'Chrome >= 60',
                    'Safari >= 10.1',
                    'iOS >= 10.3',
                    'Firefox >= 54',
                    'Edge >= 15',
                  ],
                },
              }],
            ],
          } 
        }
        
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                optimizationLevel: 2
              },
              optipng: {
                optimizationLevel: 5
              },
              mozjpeg: {
                quality: 70,
                progressive: true
              },
              svgo: {
                plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
                ]
              },
              webp: {
                quality: 70,
                method: 5,
                size: 60000
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}