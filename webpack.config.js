const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");


// ========================== PLUGINS ===========================================

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: 'Custom Template',
    minify: {
        collapseWhitespace: true
    },
    hash: false,
    template: './src/index.html'
});


const miniCssPlugin = new MiniCssExtractPlugin({
    filename: '[name].[contentHash].css'
});


const webpackAutoprefixer = new webpack.LoaderOptionsPlugin({
    options: {
        postcss: [
            autoprefixer()
        ]
    }
});


const browserSyncPlugin = new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    notify: false,
    server: { baseDir: ['dist'] }
});


const cleanWebpackPlugin = new CleanWebpackPlugin();


// ========================== MODULES RULES ===========================================


const jsLoader = {
    test: /\.js?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
        presets: ['env']
    }
 };


const cssLoader = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: "css-loader",
            options: {
                sourceMap: true
            }
        },
        {
            loader: "postcss-loader",
            options: {
                sourceMap: true
            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        }
    ]
}


const htmlLoader = {
    test: /\.html$/,
    exclude: /node_modules/,
    use: [
        "html-loader"
    ]
}


const imageLoader = {
    test: /\.(svg|png|jpg|gif)$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: "[name].[hash].[ext]",
                outputPath: "images"
            }
        }
    ]
}



// =========================== EXPORT ============================================

/* 
Instead of exporting an object (module.exports ={}), we are exporting a function;
This function will expect 2 arguments:
    - Environment (env options set from the command line)
    - All other options we set from the CLI
*/




module.exports = (env, argv)=> ({
   entry: {
        main: ['./src/js/index.js', './src/scss/style.scss'],
        vendor: './src/js/vendors/vendor.js'
   },
   output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contentHash].bundle.js'
   },
   devServer: {
       contentBase: path.join(__dirname, 'dist'),
       compress: true,
       port: 8080,
       open: true,
       stats: 'errors-only'
   },
   optimization: {
       minimizer: [
           new OptimizeCssAssetsPlugin(),
           new TerserPlugin()
       ]
   },
   plugins: [
    new HtmlWebpackPlugin({
        title: 'Custom Template',
        minify: {
            collapseWhitespace: argv.mode === 'development' ? false : true,
            removeAttributeQuotes: argv.mode === 'development' ? false : true,
            removeComments: argv.mode === 'development' ? false : true
        },
        hash: false,
        template: './src/index.html'
    }),
        miniCssPlugin,
        webpackAutoprefixer,
        browserSyncPlugin,
        cleanWebpackPlugin
   ],
   module: {
       rules: [
           jsLoader,
           cssLoader,
           htmlLoader,
           imageLoader
        ]
    },
    devtool: argv.mode === 'development' ? 'inline-source-map' : false
})


