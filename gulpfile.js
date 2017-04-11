'use strict';

// const gulp = require('gulp'); 
// const clean = require('gulp-clean');
// const notify = require('gulp-notify');
// const rename = require('gulp-rename');
// const jshint = require('gulp-jshint');
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const sass = require('gulp-sass');
// const sourcemaps = require('gulp-sourcemaps'); 
// const babelify = require('babelify'); 
// const browserify = require('browserify');
// const watchify = require('watchify');
// const merge = require('utils-merge'); 
// const source = require('vinyl-source-stream'); 
// const buffer = require('vinyl-buffer');
// const concatcss = require('gulp-concat-css');
// const browserSync = require('browser-sync').create();
// const url = require('url');
// const proxy = require('proxy-middleware');

const gulp = require('gulp');
const del = require('del');
const merge = require('merge-stream');
const tsc = require('gulp-typescript');
const tsProject = tsc.createProject('tsconfig.json');
const SystemBuilder = require('systemjs-builder');
const jsMinify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const cssPrefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-cssnano');
const runSequence = require('run-sequence');
const cssConcat = require('gulp-concat-css');

const notify = require('gulp-notify');
const watchify = require('watchify');
const browserSync = require('browser-sync').create();
const url = require('url');
const proxy = require('proxy-middleware');
	
// Configuration

const config = {
	source: './src',
	target: './build/frontend',
	temp: './temp',
	libs:  'lib/**/*',
	javascript: {
		source: 'index.js',
		target: 'bundle.js'
	},
	css: {
		target: 'style.css'
	},
	proxy: {
		url: 'http://localhost:8080/test/api',
		route: '/api'
	},
	filetypes: {
		javascript: ['ts','js','json'],
		stylesheet: ['css', 'scss'],
		resources:  ['html','jpg','png','svg','woff','woff2']
	}
};

// Build functions

function fileTypeMatcher(fileSuffixArray) {
	return fileSuffixArray.map(type=> config.source+'/**/*.'+type);
}

gulp.task('copy-typescript', () => {

    return gulp.src(config.source+'/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest(config.temp));
});

gulp.task('compile-typescript', [ 'copy-typescript' ], () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('system.config.js')
        .then(() => builder.buildStatic('app', config.target+'/'+config.javascript.target, {
            production: false,
            rollup: false
        }));
});

gulp.task('compile-stylesheets', () => {
	return gulp.src(fileTypeMatcher(config.filetypes.stylesheet))
		.pipe(sass(({
            precision: 10,
            includePaths: 'node_modules/node-normalize-scss'
        })).on('error', sass.logError))
		.pipe(cssPrefixer())
		.pipe(cssConcat(config.css.target))
		.pipe(gulp.dest(config.target));
});

gulp.task('copy-resources', () => {
	return gulp.src(fileTypeMatcher(config.filetypes.resources))
		.pipe(gulp.dest(config.target));
});

gulp.task('copy-libs', () => {
    var npmLibs= gulp.src([
        'node_modules/core-js/client/shim.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js'
    ]);
    var libs= gulp.src(config.libs);
    merge(npmLibs, libs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(config.target));
});

// build targets

gulp.task('clean', ['clean-temp'], () => {
	return del(config.target);
});

gulp.task('clean-temp',() => {
	return del(config.temp);
});

gulp.task('build', callback => {
	 runSequence('clean', 'compile-typescript', 'compile-stylesheets','copy-resources','copy-libs', 'clean-temp', callback);
});

gulp.task('minify', () => {
    var js = gulp.src('dist/js/bundle.js')
        .pipe(jsMinify())
        .pipe(gulp.dest('dist/js/'));

    var css = gulp.src('dist/css/styles.css')
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css/'));

    return merge(js, css);
});

gulp.task('watch', ['build'], () => {
    var watchers = [
		gulp.watch(fileTypeMatcher(config.filetypes.javascript), [ 'compile-typescript' ]),
		gulp.watch(fileTypeMatcher(config.filetypes.stylesheet), ['compile-stylesheets' ]),
		gulp.watch(fileTypeMatcher(config.filetypes.resources), [ 'copy-resources' ]),
		gulp.watch(config.source+'/'+config.libs.source, [ 'copy-libs' ])
	];
    var onChanged = function(event) {
		var message='File ' + event.path + ' was ' + event.type + '. Running tasks...';
		console.log(message);
		notify(message);
	};
	
	watchers.forEach(w => w.on('change', onChanged));
});

gulp.task('server', ['watch'], () => {
	
	var proxyOptions = url.parse(config.proxy.url);
    proxyOptions.route = config.proxy.route;

	browserSync.init({
		server: {
			baseDir: config.target,
			middleware: [proxy(proxyOptions)]
		}
	});
});

gulp.task('default', ['server']);
