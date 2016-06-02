### Features

&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/)<br>
&nbsp; &nbsp; ✓ Modern CSS syntax (CSS3+) via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Application state management via [Redux](http://redux.js.org/)<br>
&nbsp; &nbsp; ✓ Routing and navigation via [React App](https://github.com/kriasoft/react-app), [Universal Router](https://github.com/kriasoft/universal-router), [History](https://github.com/mjackson/history)<br>
&nbsp; &nbsp; ✓ Modular styles via [CSS Modules](https://github.com/css-modules/css-modules)<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading<br>
&nbsp; &nbsp; ✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Bundling and optimization with [Webpack](https://webpack.github.io/)<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/)<br>
&nbsp; &nbsp; ✓ Easy deployment to [GitHub Pages](https://pages.github.com/), [Amazon S3](http://davidwalsh.name/hosting-website-amazon-s3) or [Firebase](https://www.firebase.com/)<br>
&nbsp; &nbsp; ✓ [Yeoman](http://yeoman.io/) generator ([generator-react-static](https://www.npmjs.com/package/generator-react-static))<br>

### Directory Layout

```shell
.
├── /build/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /components/                # Shared/generic UI components
│   ├── /layout/                # Layout component
│   ├── /button/                # Button component
│   └── /...                    # etc.
├── /core/                      # Core framework
│   ├── /app.js                 # Application entry point (bootstrap)
│   ├── /store.js               # Application state manager (Redux)
│   └── /...                    # etc.
├── /routes/                    # View/screen UI components + routing information
│   ├── /about/                 # About page
│   ├── /error/                 # Error page
│   ├── /home/                  # Home page
│   └── /...                    # etc.
├── /static/                    # Static files such as favicon.ico etc.
├── /test/                      # Unit and integration tests
├── /tools/                     # Build automation scripts and utilities
│── LICENSE.txt                 # Licensing information
│── package.json                # The list of project dependencies and NPM scripts
└── README.md                   # Project overview / getting started guide
```


### Getting Started

Just clone the repo, install Node.js modules and run `npm start`:

```shell
$ git clone
$ cd app
$ npm install           # Install project dependencies listed in package.json
$ npm start             # Build and launch the app, same as "node tools/start.js"
```

**NODE**: Make sure that you have [Node.js](https://nodejs.org/) v6 installed on your local machine.

### How to Test

The unit tests are powered by [chai](http://chaijs.com/) and [mocha](http://mochajs.org/).

```shell
$ npm test
```


### How to Deploy

```shell
$ npm run deploy                # Deploys the project to GitHub Pages
```

Alternatively, you can build a production release to manually deploy to S3, Firebase, Netlify, and other static hosts. Simply run the command below and copy the generated `build` folder to your static host.

```shell
$ npm run build release         # Build production release 
```
