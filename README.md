# webpack-starter

This is a project starter using the webpack module bundler. It is configured with all base plugins needed to fully export from the 'src' folder to a distribution folder, named 'dist' by default. The src folder of this project contains a couple of demo files that you might want to delete / replace: 'src/js/sayHello.js', 'src/scss/test'.

## TS and JS support
This boilerplate supports both TypeScript and Javascript, files are to be placed under /src/ts and /src/js
- TypeScript entry points and output are configured in webpack.config.js
- All other TypeScript configs are made within tsconfig.json
- All JavaScript configs are made within webpack.config.js
- Both .ts and .js files can be bundled together :

```
module.exports = {
    entry: {
        megamix: [ './src/js/index.js', './src/ts/index.ts' ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contentHash].bundle.js'
    }
}
```

- If you merge both index.ts and index.js and want the final file to be ES5, be sure to add both the babel module in webpack.config.js AND add "target": "es5" in tsconfig

## Features

* JS - Create one main bundle from all .js files imported in index.js
* JS - Create one main bundle from all vendors .js files placed in "vendors" directory
* JS - Minify and compile all code to ES5 using Babel
* JS - Cache Busting: Add hash to exported bundle names
* CSS - Create one main .css file from all .scss files imported in style.scss
* CSS - Autoprefixer: Automatically apply vendor specific tags to .css bundle before exporting
* CSS - Minify the code in exported bundle
* CSS - Cache Busting: Add hash to exported bundle name
* Images - Export images (TO DO: image oprimizer)
* Images - Cache Busting: Add hash to each exported image name
* HTML - Generate new index.html from provided template
* HTML - Dinamically add tags for .js, .css, image files to also include hash names
* HTML - Minify / optimize .html file (remove whitespace / comments / quotes)

## Installation

```
npm install
```
Will install all dev dependencies from package.json into 'node_modules'


## Structure

```
├── dist
├── node_modules
├── src
│   ├── js
│   │   ├── vendors
│   │   │   └── vendor.js
│   │   └── index.js
│   ├── scss
│   │   └── style.scss
│   └── index.html
├── package.json
├── package.lock.json
├── postcss.config.js
└── webpack.config.js
```
Place your project in the src folder and run one of the following commands. In case you modify any of the folders / filed in the structure above, also remember to update webpack.config.js


## Creating production build

```
npm run build
```



## Creating development build

```
npm run dev
```



## Creating dev server / watcher

```
npm run watch
```


### Rundown

* Bundle one file into one final file:

```
module.exports = {
    entry: '.src/home.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```

* Bundle multiple files into one final file
* They will be bundled in order, from left to right

```
module.exports = {
    entry: [ '.src/home.js', './src/about.js', './src/contact.js' ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```

* Bundle all files from a folder (option 1) - glob

```
const glob = require( 'glob' );
module.exports = {
    entry: glob.sync('../src/js/multiple/*.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
```

* Bundle all files from a folder (option 2) - webpack-concat-plugin


```
new ConcatPlugin({
    uglify: false,
    sourceMap: false,
    name: 'vendors',
    fileName: '[name].[hash:8].bundle.js',
    filesToConcat: [
        './src/js/vendor_files/vendor4.js',
        './src/js/vendor_files/vendor5.js',
        './src/js/vendor_files/*.js'
    ]
})
files = [1, 2, 3, 4, 5], outputs: => 4, 5, 1, 2, 3
```




* Bundle multiple files into multiple final files (one for each name):

```
module.exports = {
    entry: {
        home: './src/home.js',
        about: './src/about.js',
        contact: './src/contact.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}

```


* Combining file types + adding hash (.SCSS files are handled by SCSS loader):

```
module.exports = {
    entry: {
        main: ['./src/js/index.js', './src/scss/style.scss'],
        vendor: './src/js/vendor_files/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contentHash].bundle.js'
    }
}
```


* In order to compile from ES6+ to ES5 with babel, add the following rule, under module:

```
module: {
    rules: [
        {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['env']
            }
        }
    ]
}
```

