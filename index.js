#!/usr/bin/env node
var mkdirp = require('mkdirp');
var touch = require('touch');
var fs = require('fs-extra')
var process = require('process');
var colors = require('colors');
var value = process.argv[2];
var argument3 = process.argv[3];
var argument4 = process.argv[4];
var scriptName = 'app';
var request = require('request');
//spilt 'gen new' from 'gen {{COMPONENT NAME}}'
if (value === 'new') {
// generate a brand new project with the name
//argument 3 is now the project name
mkdirp(argument3, function (err) {
  if (err) console.error(err)
  else
  process.chdir(argument3),

  //generte .gitignore
  fs.writeFile(".gitignore", `
  .DS_Store
  .tmp
  .git
  node_modules
  .settings
  *.log
  client/bundle.js
  client/bundle.js.map
  .idea
` , function(err) {
      if(err) {
          return console.log(` ❌  failed to generate due to error:  ${err}`);
      }
      console.log(" ✅  created: ".cyan + ".gitignore".white);
  });

  //generte webpack.config.js
  fs.writeFile("webpack.config.js", `
  module.exports = {
  devtool: 'sourcemap',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.less$/, loader: 'style!css!less' },
       { test: /\.css$/, loader: 'style!css' },
       { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }
    ]
  }
};
` , function(err) {
      if(err) {
          return console.log(` ❌  failed to generate due to error:  ${err}`);
      }
      console.log(" ✅  created: ".cyan + "webpack.config.js".white);
  });

  //generte README.md
  fs.writeFile("README.md", `

  ___________
  # ANGULAR-1.5-CLI
  ###### created by  Andrew Wormald

  ### Installation:


  npm install angular-1.5-cli -g

  You need to install this globally (aka using -g at the end) in order for this to work efficiently and enhance your experience.

  ___________

  ### Commands:

  #### Generate Project:

  gen new {{PROJECT NAME}}
  // Generates a new project using scss styling

  gen new {{PROJECT NAME}} --style:css

   // Generates a new project using css styling



  #### Generate Component:
  ###### Step 1:
  Navigate to components directory/folder.


  ###### Step 2:
  Use the command line gen {{COMPONENT NAME}} or any of the below command lines.




  gen {{COMPONENT NAME}}

  // Generates a new component using scss styling



  gen {{COMPONENT NAME}} --style:css

  // Generates a new component using css styling

  ___________
` , function(err) {
      if(err) {
          return console.log(` ❌  failed to generate due to error:  ${err}`);
      }
      console.log(" ✅  created: ".cyan + "README.md".white);
  });

  fs.writeFile('spec.bundle.js', `/*
* When testing with Webpack and ES6, we have to do some
* preliminary setup. Because we are writing our tests also in ES6,
* we must transpile those as well, which is handled inside
* 'karma.conf.js' via the 'karma-webpack' plugin. This is the entry
* file for the Webpack tests. Similarly to how Webpack creates a
* 'bundle.js' file for the compressed app source files, when we
* run our tests, Webpack, likewise, compiles and bundles those tests here.
*/

import angular from 'angular';

// Built by the core Angular team for mocking dependencies
import mocks from 'angular-mocks';

// We use the context method on 'require' which Webpack created
// in order to signify which files we actually want to require or import.
// Below, 'context' will be a/an function/object with file names as keys.
// Using that regex, we scan within 'client/app' and target
// all files ending with '.spec.js' and trace its path.
// By passing in true, we permit this process to occur recursively.
let context = require.context('./client/app', true, /\.spec\.js/);

// Get all files, for each file, call the context function
// that will require the file and load it here. Context will
// loop and require those spec files here.
context.keys().forEach(context);
`, function(err) {
    if(err) {
        return console.log(` ❌  failed to generate due to error:  ${err}`);
    }
    console.log(" ✅  created: ".cyan + "spec.bundle.js".white);
  });

// generate webpack file
  fs.writeFile('webpack.config.js', `module.exports = {
devtool: 'sourcemap',
output: {
  filename: 'bundle.js'
},
module: {
  loaders: [
     { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
     { test: /\.html$/, loader: 'raw' },
     { test: /\.less$/, loader: 'style!css!less' },
     { test: /\.css$/, loader: 'style!css' },
     { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }
  ]
}
};
`, function(err) {
    if(err) {
        return console.log(` ❌  failed to generate due to error:  ${err}`);
    }
    console.log(" ✅  created: ".cyan + "webpack.config.js".white);
  });

// generate karma file
  fs.writeFile('karma.conf.js', `module.exports = function(config) {
config.set({
  basePath: '',
  frameworks: ['jasmine'],
  files: [{
    pattern: 'spec.bundle.js',
    watched: false
  }],
  exclude: [],
  plugins: [
    require("karma-jasmine"),
    require("karma-phantomjs-launcher"),
    require("karma-spec-reporter"),
    require("karma-sourcemap-loader"),
    require("karma-webpack")
  ],
  preprocessors: {
    'spec.bundle.js': ['webpack', 'sourcemap']
  },
  webpack: {
    devtool: 'inline-source-map',
    module: {
      loaders: [{
        test: /\.js/,
        exclude: [/app\/lib/, /node_modules/],
        loader: 'babel'
      }, {
        test: /\.html/,
        loader: 'raw'
      }, {
        test: /\.styl$/,
        loader: 'style!css!stylus'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      }]
    }
  },
  webpackServer: {
    noInfo: true // prevent console spamming when running in Karma!
  },
  reporters: ['spec'],
  port: 9876,
  colors: true,
  logLevel: config.LOG_INFO,
  autoWatch: false,
  browsers: ['PhantomJS'],
  singleRun: true
});
};
`, function(err) {
    if(err) {
        return console.log(` ❌  failed to generate due to error:  ${err}`);
    }
    console.log(" ✅  created: ".cyan + "karma.conf.js".white);
  });

  // generate gulp file
  fs.writeFile('gulpfile.babel.js', `
  import gulp from 'gulp';
  import path from 'path';
  import webpack from 'webpack-stream';
  const browserSync = require('browser-sync');

  const reload = () => browserSync.reload();
  const root = 'client';

  // helper method for resolving paths
  const resolveToApp = (glob) => {
    glob = glob || '';
    return path.join(root, 'app', glob); // app/{glob}
  };

  // map of all paths
  const paths = {
    js: resolveToApp('**/*!(.spec.js).js'), // exclude spec files
    less: resolveToApp('**/*.less'), // stylesheets
    html: [
      resolveToApp('**/*.html'),
      path.join(root, 'index.html')
    ],
    entry: path.join(root, 'app/app.js'),
    output: root
  };

  gulp.task('webpack', () => {
    return gulp.src(paths.entry)
      .pipe(webpack(require('./webpack.config')))
      .pipe(gulp.dest(paths.output));
  });

  gulp.task('reload', ['webpack'], (done) => {
    reload();
    done();
  });

  gulp.task('serve', ['webpack'], () => {
    browserSync({
      port: process.env.PORT || 3000,
      open: false,
      server: { baseDir: root }
    });
  });

  gulp.task('watch', ['serve'], () => {
    const allPaths = [].concat([paths.js], paths.html, [paths.less]);
    gulp.watch(allPaths, ['reload']);
  });

  gulp.task('default', ['watch']);
`, function(err) {
    if(err) {
        return console.log(` ❌  failed to generate due to error:  ${err}`);
    }
    console.log(" ✅  created: ".cyan + "gulpfile.babel.js".white);
  });

  //generate package.json
  fs.writeFile("package.json", `{
  "name": "${argument3}",
  "version": "0.0.1",
  "description": "Boilerplate generated by Angular-1.5-cli.",
  "main": "index.js",
  "dependencies": {
    "angular": "1.5.7",
    "angular-animate": "1.5.7",
    "angular-mocks": "1.5.7",
    "angular-ui-router": "^0.3.1",
    "bootstrap-css-only": "3.3.6",
    "lodash": "^4.13.1",
    "normalize.css": "4.1.1"
  },
  "devDependencies": {
    "angular-mocks": "1.5.7",
    "babel-core": "6.10.4",
    "babel-loader": "6.2.4",
    "babel-preset-es2015": "^6.9.0",
    "browser-sync": "2.13.0",
    "css-loader": "0.23.1",
    "file-loader": "0.9.0",
    "fs-walk": "0.0.1",
    "gulp": "3.9.1",
    "gulp-rename": "1.2.2",
    "gulp-template": "4.0.0",
    "jasmine": "2.4.1",
    "jasmine-core": "2.4.1",
    "karma": "1.1.0",
    "karma-jasmine": "1.0.2",
    "karma-phantomjs-launcher": "1.0.1",
    "karma-sourcemap-loader": "0.3.7",
    "karma-spec-reporter": "0.0.26",
    "karma-webpack": "1.7.0",
    "less": "^2.7.1",
    "less-loader": "^2.2.3",
    "ng-annotate-loader": "0.1.0",
    "node-libs-browser": "1.0.0",
    "phantomjs-prebuilt": "2.1.7",
    "raw-loader": "0.5.1",
    "run-sequence": "1.2.1",
    "style-loader": "0.13.1",
    "url-loader": "0.5.7",
    "webpack": "1.13.1",
    "webpack-stream": "3.2.0",
    "yargs": "4.7.1"
  },
  "scripts": {
    "start": "gulp",
    "test": "karma start"
  },
  "keywords": [
    "angular",
    "webpack",
    "es6"
  ]
}` , function(err) {
      if(err) {
          return console.log(` ❌  failed to generate due to error:  ${err}`);
      }
      console.log(" ✅  created: ".cyan + "package.json".white);
  });

  // generate src directory
  mkdirp("src", function (err) {
    //within this directory create all the sub scripts (e.g. app.component.html)
    process.chdir("src"),

    mkdirp("assets/img", function (err) {
      console.log(" ✅  created: ".cyan + "src/assets".white);
      console.log(" ✅  created: ".cyan + "src/assets/img".white);
    });

    //generate favicon.jpg using base 64
   data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZJJREFUOI3FU7FqVFEQPWfm7ttLEN5zt9oEWcVSRVCwSrd+gI2YLh+QWNikUxBLv0AQhC0WLFPZCN5CwQ8QE1KIIjbCLluE7Bbvzdi8B49ljUUKB6a4d86ZmXO4l+6uuEDIRcgAEAAYSV8tuLsAYH38G4YUkV13vwmgAVQkvxVF8W46nf5KKeloNHrk7rcBWItPkl8J4BBAKSIfakmZmd0FkOd5vj+fz7+HEO67+/XWEABAp9P5gbrBfrswGAw2ALwVkSfNquv0uztDs04bSPIMwG8Al9YR2xEAQEQuF0Wx1ev11MxERLbN7E6WZQeLxYJZlj0keWvVA1U9DgBgZjuz2exe3fAqgC+q+mw8Hn9OKSnJU5KzNSaeAsChiDzt9/ubeZ5fI/ma5KvhcBjdXdxdz/OgMfFxcxljvALgvYjsuTv/1SAAoIjQzODuSvJnCOFFWZYvY4xHy+UyhRAeiMiNVQndbvdEVPVNjPFTM8XddTKZfFTV52VZdlJKUhPLlayqqjLWxCbb0UwTnPeU//tv/ANmL7C1Gz8yDgAAAABJRU5ErkJggg==';

    function decodeBase64Image(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};
      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');
      return response;
    }
    imageBuffer = decodeBase64Image(data);

    fs.writeFile('favicon.ico', imageBuffer.data, function(err) {
      if(err) {
          return console.log(` ❌  failed to generate due to error:  ${err}`);
      }
      console.log(" ✅  created: ".cyan + "favicon.png".white);
    });




    // generate index.html
    fs.writeFile("index.html", `
    <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Eggly | Angular with ES6</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-capable" content="yes">
          <meta name="apple-mobile-web-app-status-bar-style" content="black">
          <meta name="description" content="A bookmark manager built with AngularJS, and ES6">
          <link rel="icon" href="favicon.jpg">
          <base href="/">
        </head>
        <body ng-app="app" ng-strict-di ng-cloak>

          <app>
            Loading...
          </app>

          <script src="bundle.js"></script>
        </body>
      </html>
  ` , function(err) {
        if(err) {
            return console.log(` ❌  failed to generate due to error:  ${err}`);
        }
        console.log(" ✅  created: ".cyan + "index.html".white);
    });

    mkdirp("app/components", function (err) {
      if (err) console.error(err)
      else
      process.chdir("app"),

      //build components.js
      fs.writeFile("components/components.js", `
        import angular from 'angular';

        const ComponentsModule = angular.module('app.components', [

      ]);

      export default ComponentsModule;
` , function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "app/components/components.js".white);
      });



      //build component.html
      fs.writeFile(`${scriptName}.component.html`, `<p> ${scriptName} works! </p>` , function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "src/".white + scriptName.white + ".component.html".white);
      });

      //build scss || css styling scripts
      if (argument3 === "--style:css" || argument4 === "--style:css") {
      // build component.css
      fs.writeFile(scriptName +".component.css", "", function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "src/".white + scriptName.white + ".component.css".white);
      });
      }else{
      // build component.scss
      fs.writeFile(scriptName +".component.scss", "//stlying folder is set to .scss by default. Should you want to use css rather, type: 'gen {{NAME OF COMPONENT HERE}} --style:css'.", function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "src/".white + scriptName.white + ".component.scss".white);
      });
      }


      //build component.js
      if (argument3 === "--style:css" || argument4 === "--style:css") {
      // build component.js with import of css folder
      fs.writeFile(scriptName +".component.js", `
      import template from './app.html';
      import './app.component.css';

      const AppComponent = {
        template
      };

      export default AppComponent;
      `, function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "src/".white + scriptName.white + ".component.js".white);
      });
      }else{
      // build component.js with import of scss folder
      fs.writeFile(scriptName +".component.js", `
      import template from './app.component.html';
      import './app.component.scss';

      const AppComponent = {
        template
      };

      export default AppComponent;
      `, function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "src/".white + scriptName.white + ".component.js".white);
      });
      }

      //build module.js
      fs.writeFile(scriptName +".module.js", `
      import 'bootstrap-css-only';
      import 'normalize.css';
      import angular from 'angular';
      import appComponent from './app.component';;

      angular.module('app', [

        ])
        .component('app', appComponent);
        `, function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + "src/".white + scriptName.white + ".module.js".white);
      });

    });

  //
  //   //generate favicon.jpg using base 64
  //  data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAZJJREFUOI3FU7FqVFEQPWfm7ttLEN5zt9oEWcVSRVCwSrd+gI2YLh+QWNikUxBLv0AQhC0WLFPZCN5CwQ8QE1KIIjbCLluE7Bbvzdi8B49ljUUKB6a4d86ZmXO4l+6uuEDIRcgAEAAYSV8tuLsAYH38G4YUkV13vwmgAVQkvxVF8W46nf5KKeloNHrk7rcBWItPkl8J4BBAKSIfakmZmd0FkOd5vj+fz7+HEO67+/XWEABAp9P5gbrBfrswGAw2ALwVkSfNquv0uztDs04bSPIMwG8Al9YR2xEAQEQuF0Wx1ev11MxERLbN7E6WZQeLxYJZlj0keWvVA1U9DgBgZjuz2exe3fAqgC+q+mw8Hn9OKSnJU5KzNSaeAsChiDzt9/ubeZ5fI/ma5KvhcBjdXdxdz/OgMfFxcxljvALgvYjsuTv/1SAAoIjQzODuSvJnCOFFWZYvY4xHy+UyhRAeiMiNVQndbvdEVPVNjPFTM8XddTKZfFTV52VZdlJKUhPLlayqqjLWxCbb0UwTnPeU//tv/ANmL7C1Gz8yDgAAAABJRU5ErkJggg==';
   //
  //   function decodeBase64Image(dataString) {
  //     var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  //       response = {};
  //     if (matches.length !== 3) {
  //       return new Error('Invalid input string');
  //     }
  //     response.type = matches[1];
  //     response.data = new Buffer(matches[2], 'base64');
  //     return response;
  //   }
  //   imageBuffer = decodeBase64Image(data);
   //
  //   fs.writeFile('image.png', imageBuffer.data, function(err) {
  //     if(err) {
  //         return console.log(` ❌  failed to generate due to error:  ${err}`);
  //     }
  //     console.log(" ✅  created: ".cyan + "image.png".white);
  //   });


  });
  //making src directory and sub scripts should be last in the list as then you do not need to go back up a level in the directory ladder
});
//argument 4 is now the styling order


}else{
  // GEN COMPONENT SCRIPT
  componentsArray = [];
  genArr = [];
  // sync app.component with updates

  fs.readdir(process.cwd(), function(err, items) {
    genArr = items;
    generateDirectArray(genArr);
  });


  function generateDirectArray(items) {
    for (var i=0; i<items.length; i++) {
      if (isDirectory(items[i])){
      }else{
        componentsArray.push(items[i]);
      }
    }
    importStringGenerator();
  }

  function isDirectory(inputString) {
    var str = inputString;
    var patt = new RegExp("[.]");
    var res = patt.test(str);
    return res;
}

  String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function importStringGenerator(){
    componentsArray.push(`${value}`);
    genString = "";
    for (var i=0; i<componentsArray.length; i++) {
      genString = genString + `    import ${componentsArray[i].capitalizeFirstLetter()}Module from './${componentsArray[i]}/${componentsArray[i]}.component';\r`
    }
    listString = "";
    for (var i=0; i<componentsArray.length; i++) {

      // check if last in list in order to not include comma
      if (i === (componentsArray.length - 1)){
      listString = listString + `     ${componentsArray[i]}Module\r`
      }else{
      listString = listString + `     ${componentsArray[i]}Module,\r`
      }

    }

    fs.writeFile("components.js", `
    import angular from 'angular';
${genString}

    const ComponentsModule = angular.module('app.components',[
${listString}
    ]);

    export default ComponentsModule;

    `, function(err) {
        if(err) {
            return console.log(` ❌  failed to update due to error:  ${err}`);
        }
        console.log(" 🔰  updated: ".cyan + "components.js".white);
    });
  }




  mkdirp(value, function (err) {
      console.log("Generating Component...".white)
      if (err) console.error(err)
      else
      process.chdir(value),

      //build component.html
      fs.writeFile(value +".component.html", `<p> ${value} works! </p>` , function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + value.white + ".component.html".white);
      });

      //build scss || css styling scripts
      if (argument3 === "--style:css" || argument4 === "--style:css") {
      // build component.css
      fs.writeFile(value +".component.css", "", function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + value.white + ".component.css".white);
      });
      }else{
      // build component.scss
      fs.writeFile(value +".component.scss", "//stlying folder is set to .scss by default. Should you want to use css rather, type: 'gen {{NAME OF COMPONENT HERE}} --style:css'.", function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + value.white + ".component.scss".white);
      });
      }


      //build component.js
      fs.writeFile(value +".component.js", `
      import template from '${value}.component.html';
      import controller from './${value}.controller.js';
      import './${value}.component.scss';

      let ${value}Component = {
        restrict: 'E',
        bindings: {},
        template,
        controller,
        controllerAs: 'vm'
      };

      export default ${value}Component;

      `, function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + value.white + ".component.js".white);
      });

      //build controller.js
      fs.writeFile(value +".controller.js", `class ${value.toUpperCase()}Controller {
    constructor() {
      this.name = '${value}';
    }
  }

  export default ${value.toUpperCase()}Controller;`, function(err) {
          if(err) {
              return console.log(` ❌  failed to generate due to error:  ${err}`);
          }
          console.log(" ✅  created: ".cyan + value.white + ".controller.js".white);
      });
  });



}
