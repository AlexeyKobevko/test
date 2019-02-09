let gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyJs = require('gulp-terser'),
    autoPrefixer = require('gulp-autoprefixer'),
    bs = require('browser-sync'),
    htmlMin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    delFiles = require('del'),
    cssMinify = require('gulp-csso'),
    babel = require('gulp-babel'),
    pug = require('gulp-pug');

gulp.task('html', () => {
  return gulp.src('app/html/*.html')
       .pipe(htmlMin({
           collapseWhitespace: true
       }))
       .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
    return gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', () => {
   return delFiles(['dist/**', '!dist'])
});

gulp.task('js:es6', () => {
    return gulp.src('app/js/**/*.js')
        .pipe(minifyJs())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
});

// gulp.task('js:babel', () => {
//     return gulp.src('app/js/**/*.js')
//         .pipe(babel({
//             presets: ['@babel/env']
//         }))
//         .pipe(rename({
//             suffix: '.es5'
//         }))
//         .pipe(gulp.dest('dist/js'))
// });

gulp.task('server', () =>{
   return bs({
       server: {
           baseDir: 'dist'
       },
       browser: 'chrome'
   })
});

gulp.task('js:watch', () => {
   return gulp.watch('app/js/**/*.js', gulp.series('js:es6', (done) => {
       bs.reload();
       done();
   }))
});

gulp.task('sass:watch', () => {
    return gulp.watch('app/sass/**/*.scss', gulp.series('sass', (done) => {
        bs.reload();
        done();
    }))
});

gulp.task('html:watch', () => {
    return gulp.watch('app/html/*.html', gulp.series('html', (done) => {
        bs.reload();
        done();
    }))
});

gulp.task('bower:js', () => {
    return gulp.src('app/bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('img', () => {
    return gulp.src('app/imgResize/**/*.+(jpeg|jpg|png|gif|svg)')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('json', () => {
   return gulp.src('app/getCart.json')
       .pipe(gulp.dest('dist'))
});

gulp.task('default', gulp.series('clean', gulp.parallel('html', 'sass', 'js:es6', 'bower:js', 'img', 'json'),
    gulp.parallel('sass:watch', 'js:watch', 'html:watch', 'server')));