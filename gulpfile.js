/* Installationer */
const { src, dest, watch, series, parallel } = require ("gulp");
const concat = require ("gulp-concat");
const uglify = require ("gulp-uglify-es").default;
const del = require('del');
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');


/* Sökvägar */
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    imgPath: "src/img/*", // Tar med alla filändelser
    sassPath: "src/scss/*.scss"
}

/* Task: Kopiera HTML */
function copyHTML () {
    return src(files.htmlPath)
        .pipe(dest('pub'))
        .pipe(browserSync.stream());
}

/* Task: Kopiera Bilder */
function copyImg () {
    return src(files.imgPath)
        .pipe(dest('pub/img'))
        .pipe(browserSync.stream());
}

/* Task: sammanslå js-filer, minifiera filer */
function jsTask() {
    return src(files.jsPath)
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(dest('pub/js'))
    .pipe(browserSync.stream());
}

/* Task: Sass */
function sassTask() {
    return src(files.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}

/* Task: städa pub */
function delTask() {
    return del(['pub/**']);
}

/* Task: Watcher */
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });

    watch([files.htmlPath, files.jsPath, files.imgPath, files.sassPath],
        parallel(copyHTML, jsTask, copyImg, sassTask)
    ).on('change', browserSync.reload);
}

exports.default = series(
    delTask,
    parallel(copyHTML, jsTask, copyImg, sassTask),
    watchTask
);
