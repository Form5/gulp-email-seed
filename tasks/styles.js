'use strict';

module.exports = function(gulp) {
  var notifier = require('node-notifier');
  gulp.task('styles', function() {
    var gutil = gulp.plugin.util;

    gulp.src('./src/scss/**/*.scss')
      .pipe( gulp.plugin.plumber() )
      .pipe(
        gulp.plugin.sass({
          outputStyle: 'nested',
        }).on('error', function(error){
          var arr = error.message.split('\n');
          var filename = arr[0];
          arr.shift();
          var message = arr.join('\n');
          notifier.notify({
            title: 'SASS: ' + filename,
            subtitle: 'Line:' + error.line + '/Char:' + error.column,
            message: message
          });
          gulp.plugin.util.beep();
          gutil.log(gutil.colors.red('SASS') + gutil.colors.yellow(' failed on file: ' + filename));
          gutil.log(gutil.colors.yellow('Line: ' + error.line + ' / Character: ' + error.column));
          gutil.log(gutil.colors.yellow('Reason: ' + message));
        })
       )
      .pipe(
         gulp.plugin.autoprefixer({
          browsers: ['ie >= 10', '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
          cascade: false
         })
       )
      .pipe( gulp.dest('./dist/css')
      )
      .pipe( gulp.plugin.connect.reload() );
  });
};
