const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
   entry: {
        app: ['./src/js/index.js', './src/css/style.scss']
   },
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
   },
   plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
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
