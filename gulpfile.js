var gulp 				= require('gulp'),
	mainBowerFiles 		= require('main-bower-files'),
	concatCss 			= require('gulp-concat-css'),
	less 				= require('gulp-less'),
	LessAutoprefix 		= require('less-plugin-autoprefix'),
	path 				= require('path'),
	livereload			= require('gulp-livereload'),
	// uncss 				= require('gulp-uncss'),
	connect 			= require('gulp-connect'),
	watch 				= require('gulp-watch');

var autoprefix = new LessAutoprefix({ browsers: ['last 3 versions'] });

gulp.task('connect', function()
{
	connect.server({
		root: 'app',
		livereload: true
	});
});


gulp.task('mainfiles', function()
{
	return gulp.src(mainBowerFiles(
	{
		"overrides" : {
			"jquery" : {
				"main": "./dist/jquery.min.js"
			},
			"xsl.reset-css" : {
				"main" : "./reset.css"
			}
		}
	}))
	.pipe(gulp.dest('dist/mainfiles'))
});

gulp.task('less', function()
{
	return gulp.src('./dist/less/main.less')
	.pipe(less({
		plugins: [autoprefix]
	}))
	.pipe(gulp.dest('./dist/mainfiles'))
	.pipe(connect.reload())
});


gulp.task('concatCSS', function()
{
	return gulp.src([
		'dist/**/reset.css',
		'dist/**/grid.min.css',
		'dist/**/*.css'
		])
	.pipe(concatCss('css/main.css'))
	.pipe(gulp.dest('app/'))
	.pipe(connect.reload())
});

gulp.task('mainHTML', function()
{
	return gulp.src('./*.html')
	.pipe(gulp.dest('app'))
	.pipe(connect.reload())
});

gulp.task('mainJS', function()
{
	return gulp.src('./dist/mainfiles/*.js')
	.pipe(gulp.dest('app/js'))
	.pipe(connect.reload())
});

gulp.task('fonts', function()
{
	return gulp.src('./dist/fonts/*.*')
	.pipe(gulp.dest('./app/fonts/'))
	.pipe(connect.reload())
});

gulp.task('watch', function()
{
	gulp.watch('dist/**/*.less', ['less'])
	gulp.watch('*.html', ['mainHTML'])
	gulp.watch('dist/**/*.css', ['concatCSS'])
	gulp.watch('dist/**/*.js', ['mainJS'])
});

// gulp.task('unCSS', function () {
// 	return gulp.src('./app/css/main.css')
// 		.pipe(uncss({
// 			html: './app/index.html'
// 		}))
// 	.pipe(gulp.dest('./out'));
// });

gulp.task('default', ['connect', 'mainfiles', 'mainJS', 'less', 'concatCSS', 'mainHTML', 'fonts', 'watch']);