const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");



module.exports = {
   entry: {
        app: ['./src/js/index.js', './src/css/style.scss']
   },
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
   },
   devServer: {
       contentBase: path.join(__dirname, 'dist'),
       compress: true,
       port: 8080,
       open: true,
       stats: 'errors-only'
   },
   plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template TEST',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            notify: false,
            server: { baseDir: ['dist'] }
          })
   ],
   module: {
       rules: [{
           test: /\.js?$/,
           exclude: /node_modules/,
           loader: 'babel-loader',
           query: {
               presets: ['env']
           }
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                "postcss-loader",
                "sass-loader"
            ]
        }
    ]
   }
}
