# webpack-starter

This is a project starter using the webpack module bundler. It is configured with all base plugins needed to fully export from the 'src' folder to a distribution folder, named 'dist' by default. The src folder of this project contains a couple of demo files that you might want to delete / replace: 'src/js/sayHello.js', 'src/scss/test'.

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