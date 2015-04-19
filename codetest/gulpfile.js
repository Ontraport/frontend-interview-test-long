var path = require('path'),
  gulp = require('gulp'),
  webpack = require('gulp-webpack'),
  _ = require('lodash'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  ComponentPlugin = require('component-webpack-plugin'),
  node_modules = path.resolve(__dirname, 'node_modules');


var config = {
  production:false
};


gulp.task('default', function(){
  return gulp.src('src/main.js')
    .pipe(webpack({
      watch:!config.production,
      cache:!config.production,
      debug:!config.production,
      output:{
        filename:'[name].js',
        sourceMapFilename: "debugging/[file].map"
      },
      module: {
        loaders: [
          { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
          { test: /\.json$/, loader: 'json-loader'},
          { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'image', query: { optimizationLevel: 2, name: '[name].[ext]' } },
          { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
          { test: /\.(less|css)/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?minimize!autoprefixer-loader!less-loader') },
          { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image?bypassOnDebug&optimizationLevel=7&interlaced=false']}
        ]
      },
      resolve: {
        root: [
          path.join(__dirname, "node_modules"),
          path.join(__dirname, "bower_components")
        ],
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx', '.json'],

        alias:{
          "fluxxor": node_modules + "/fluxxor/build/fluxxor.js"
        }
      },
      plugins:[
        new ExtractTextPlugin('[name].css', {
          allChunks: true
        }),
        new ComponentPlugin()
      ]
    }))
    .pipe(gulp.dest('./dist'))
});