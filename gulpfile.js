import gulp from "gulp";
import browser from "browser-sync";
import del from "del";
import dartSass from "sass"
import gulpSass from "gulp-sass";
import tilde from "node-sass-tilde-importer";
import pug from "gulp-pug";
const sass = gulpSass(dartSass)

const server = () => {
	browser.init({
		server: {
			baseDir: `./dist`
		},
		notify: false,
		port: 3000
	})
}

const html = () => {
	return gulp.src("./src/index.pug")
		.pipe(pug())
		.pipe(gulp.dest("./dist"))
		.pipe(browser.stream())
}

const scss = () => {
	return gulp.src("./src/scss/index.scss")
		.pipe(sass({
			importer: tilde
		}))
		.pipe(gulp.dest("./dist/css/"))
		.pipe(browser.stream())
}

const img = () => {
	return gulp.src("./src/img/**/*")
		.pipe(gulp.dest("./dist/img/"))
}

const fonts = () => {
	return gulp.src("./src/fonts/**/*")
	.pipe(gulp.dest("./dist/fonts/"))
}

const clean = () => {
	return del("./dist")
}

const watch = () => {
	gulp.watch("./src/index.html", html)
	gulp.watch("./src/scss/**/*.scss", scss)
	gulp.watch("./src/img/**/*", img)

}

const main = gulp.parallel(fonts, img, html, scss)
const dev = gulp.series(clean, main, gulp.parallel(watch, server))

gulp.task("default", dev)