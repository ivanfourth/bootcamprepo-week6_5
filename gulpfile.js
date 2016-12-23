var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    concat = require('gulp-concat');

//gulp server 

gulp.task('serve',['styles'],function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch('js/scripts.js', ['buildjs']);
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/*.js',['concat']);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('js/scripts.js').on('change', reload);
    gulp.watch('sass/**/*.scss').on('change', reload);
    gulp.watch('js/*.js').on('change', reload);
});

//gulp concat js files

gulp.task('concat',function(){
    return gulp.src(['js/scripts1.js','js/scripts2.js','js/scripts3.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'));
});

//Scripts task uglifies
gulp.task('buildjs',function(){
  gulp.src('js/scripts.js')
  .pipe(uglify())
  .pipe(gulp.dest('minjs'));
});
// Sass to css + prefixy
gulp.task('styles', function(){
  gulp.src('sass/**/*.scss')
  .pipe(sass({
      style: 'expanded'
  }))
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('css/'))
  
});
gulp.task('watch',function(){
});
gulp.task('default',['serve']);