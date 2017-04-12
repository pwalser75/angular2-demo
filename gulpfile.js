'use strict';

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
	libs: {
		bundle: [
			'node_modules/core-js/client/shim.min.js',
			'node_modules/zone.js/dist/zone.min.js',
			'node_modules/reflect-metadata/Reflect.js',
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js'
		],
		target: 'libs.js'
	},
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
		javascript: ['ts','js'],
		stylesheet: ['css', 'scss'],
		resources:  ['html','json','jpg','png','svg','woff','woff2']
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
            production: true,
            rollup: true
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
    gulp.src(config.libs.bundle)
	.pipe(concat(config.libs.target))
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
	 runSequence('build-dev', 'minify', callback);
});

gulp.task('build-dev', callback => {
	 runSequence('clean', 'compile-typescript', 'compile-stylesheets','copy-resources','copy-libs','clean-temp', callback);
});

gulp.task('minify', () => {
    var js = gulp.src(config.target+'/'+config.javascript.target)
        .pipe(jsMinify())
        .pipe(gulp.dest(config.target));

    var css = gulp.src(config.target+'/'+config.css.target)
        .pipe(cssMinify())
        .pipe(gulp.dest(config.target));

    return merge(js, css);
});

gulp.task('watch', ['build-dev'], () => {
    var watchers = [
		gulp.watch(fileTypeMatcher(config.filetypes.javascript), [ 'compile-typescript' ]),
		gulp.watch(fileTypeMatcher(config.filetypes.stylesheet), ['compile-stylesheets' ]),
		gulp.watch(fileTypeMatcher(config.filetypes.resources), [ 'copy-resources' ])
	];
    var onChanged = function(event) {
		var message='File ' + event.path + ' was ' + event.type + '. Running tasks...';
		console.log(message);
		notify(message);
        browserSync.reload();
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
