'use strict'
const notify = require('task-notify')
const error = require('task-error-notify')
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const filter = require('gulp-filter')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const cacheBuster = require('postcss-cachebuster')
const mqPacker = require('css-mqpacker')
module.exports = (config, cb) => {
	gulp.src(`${config.src}/*.scss`)
		.pipe(plumber({ errorHandler: error }))
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compact',
			include: [
				'./node_modules'
			]
		}))
		.pipe(postcss([
			cacheBuster({
				imagesPath: `/${config.dist}/`
			}),
			autoprefixer({
				browsers: config.browsers
			}),
			mqPacker({ sort: true }),
			cssnano()
		]))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(config.dist))
		.on('end', () =>{
			notify('Sass processed')
			if(typeof cb === 'function') cb()
		})
}