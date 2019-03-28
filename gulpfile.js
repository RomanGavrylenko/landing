const gulp = require('gulp');
const scss = require ('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const sourcemaps  = require('gulp-sourcemaps');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');



function sass(){
    return gulp.src('./src/*.scss')
            .pipe(sourcemaps.init())
            .pipe(scss().on('error', scss.logError))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./src/css'));
}

function styles(){
    return gulp.src('./src/css/*.css')
            .pipe(autoprefixer({
                browsers: ['> 0.1%'],
                cascade: false
                }))
            .pipe(cleanCSS({ 
                level: 2
            }))
            .pipe(gulp.dest('./dist/css'))
}

//For replace html file

function html(){
	return gulp.src('./src/*.html')
			   .pipe(gulp.dest('./dist'))
			   .pipe(browserSync.stream());
}

//For images
function img(){
	return gulp.src('./src/images/*.*')
			   .pipe(imagemin([
				    imagemin.gifsicle({interlaced: true}),
				    imagemin.jpegtran({progressive: true}),
				    imagemin.optipng({optimizationLevel: 5}),
				    imagemin.svgo({
				        plugins: [
					            {removeViewBox: true},
					            {cleanupIDs: false}
				        	]
				   		})
					]))
			   .pipe(gulp.dest('./dist/images/'))
			   .pipe(browserSync.stream());
}

//for js libs

function libs(){
	return gulp.src('./src/js/libs/libs.js')
			   .pipe(gulp.dest('./dist/js/libs'));
}

//for scripts 

function script(){
	return gulp.src('./src/js/*.js')
			   .pipe(gulp.dest('./dist/js'))
			   .pipe(browserSync.stream());
}

//For clean build

function clean() {
	return del(['dist/*']);
}

//For watch change at files

function watch(){
	browserSync.init({
        server: {
            baseDir: "./dist"
        },
		tunnel:true
    });
    gulp.watch('./src/scss/**/*.scss', sass);
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', script);
    gulp.watch('./src/*.html', html);
}


//for scss
exports.sass = sass;

//for css autoprefixer, minify and replace
exports.styles = styles;

//for html replace
exports.html = html; 

//for images

exports.img = img;

//for js libs replace
exports.libs = libs;

//for other js files

exports.script = script;

//For del

exports.clean = clean;

//for live reload

exports.watch = watch;

//For build

exports.build = gulp.series(clean, gulp.parallel(libs, img, styles, script, html));