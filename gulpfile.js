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
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');

const notify = require('gulp-notify');
const watchify = require('watchify');
const browserSync = require('browser-sync').create();
const url = require('url');
const proxy = require('proxy-middleware');

// Configuration

const config = {
	projectName: 'Angular2 Demo',
	source: './src',
	target: './build/frontend',
	temp: './build/temp',
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

gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report());
});

gulp.task('compile-typescript', ["tslint"], () => {
    return gulp.src(config.source+'/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest(config.temp));
});

gulp.task('build-typescript', [ 'compile-typescript' ], () => {
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
		.pipe(gulp.dest(config.target))
		.pipe(browserSync.stream())
		.pipe(notify({title: config.projectName, message: 'Compiled stylesheets', onLast: true }));;
});

gulp.task('copy-resources', () => {
	return gulp.src(fileTypeMatcher(config.filetypes.resources))
		.pipe(gulp.dest(config.target))
		.pipe(browserSync.stream())
		.pipe(notify({title: config.projectName, message: 'Updated resources', onLast: true }));;
});

gulp.task('copy-libs', () => {
	return gulp.src(config.libs.bundle)
		.pipe(concat(config.libs.target))
		.pipe(gulp.dest(config.target))
		.pipe(browserSync.stream())
		.pipe(notify({title: config.projectName, message: 'Updated libraries', onLast: true }));;
});

// build targets

gulp.task('clean', () => {
	del(config.target);
	del(config.temp);
});

gulp.task('build', (callback) => {
	 return runSequence('build-dev', 'minify', callback);
});

gulp.task('build-dev', (callback) => {
	 return runSequence('clean', 'build-typescript', 'compile-stylesheets','copy-resources','copy-libs', callback);
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
    gulp.watch(fileTypeMatcher(config.filetypes.javascript), [ 'build-typescript' ])
	.on('change', event => {
		var message='File ' + event.path + ' was ' + event.type + '. Running tasks...';
		console.log(message);
		notify(message);
        browserSync.reload();
	});
	
	gulp.watch(fileTypeMatcher(config.filetypes.stylesheet), [ 'compile-stylesheets' ]),
	gulp.watch(fileTypeMatcher(config.filetypes.resources), [ 'copy-resources' ])
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
