var gulp 				= require('gulp'),
	mainBowerFiles 		= require('main-bower-files'),
	concatCss 			= require('gulp-concat-css'),
	less 				= require('gulp-less'),
	LessAutoprefix 		= require('less-plugin-autoprefix'),
	path 				= require('path'),
	livereload			= require('gulp-livereload'),
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
			"semantic" : {
				"main" : [
					"./dist/components/grid.min.css"
				]
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
	.pipe(gulp.dest('./dist/mainfiles'));
});


gulp.task('concatCSS', function()
{
	return gulp.src([
		'dist/**/reset.css',
		'dist/**/grid.min.css',
		'dist/**/*.css'
		])
	.pipe(concatCss('css/main.css'))
	.pipe(gulp.dest('app/'));
});

gulp.task('mainHTML', function()
{
	return gulp.src('./*.html')
	.pipe(gulp.dest('app'))
});


gulp.task('watch', function()
{

});

gulp.task('default', ['mainfiles', 'less', 'concatCSS', 'mainHTML']);