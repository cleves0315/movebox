'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/*.scss', gulp.parallel('sass'));
});

// function sass(cb) {
//     return gulp.src('./sass/*.scss')
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(gulp.dest('./css'));
// }


// function sass(cb) {
//     gulp.watch('./sass/*.scss', function (cb) {
//         return gulp.src('./sass/*.scss')
//             .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//             .pipe(gulp.dest('./css'));
//     });
// }

// exports.default = sassWatch;
// exports.build = gulp.series(sass);