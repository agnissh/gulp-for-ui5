//Gulp
var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var es = require('event-stream');
//var del = require('del');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var prettydata = require('gulp-pretty-data');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var ui5preload = require('gulp-ui5-preload');

//HTML
var htmlhint = require('gulp-htmlhint');
//SASS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
//JS
var jshint = require('gulp-jshint');
//XML
var xmlvalidator = require('gulp-xml-validator');
//Tools
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var inquirer = require('inquirer');
//Runtime variables
var CONFIG = require('./config.json');
var TYPES = [
    "Formatter",
    "Fragment",
    "I18n",
    "View & Controller"
];

var add = {
    formatter: function (name) {
        return gulp.src('templates/formatter.js')
            .pipe(rename(name))
            .pipe(gulp.dest('app/model')).on('end', function () {
                return gutil.log("File " + name + " added to app/model");
            })
    },
    fragment: function (name) {
        return gulp.src('templates/fragment.xml')
            .pipe(rename(name))
            .pipe(gulp.dest('app/view')).on('end', function () {
                return gutil.log("File " + name + " added to app/view");
            })
    },
    i18n: function (name) {
        return gulp.src('app/i18n/i18n.properties')
            .pipe(rename(name))
            .pipe(gulp.dest('app/i18n')).on('end', function () {
                return gutil.log("File " + name + " added to app/i18n");
            })
    },
    view_controller: function (name, v, c) {
        return es.concat(
            gulp.src('templates/controller.js')
            .pipe(replace("{{controller_name}}", name))
            .pipe(rename(c))
            .pipe(gulp.dest('app/controller')).on('end', function () {
                return gutil.log("File " + c + " added to app/controller");
            }),
            gulp.src('templates/view.xml')
            .pipe(replace("{{view_name}}", name))
            .pipe(rename(v))
            .pipe(gulp.dest('app/view')).on('end', function () {
                return gutil.log("File " + v + " added to app/view");
            })
        );
    }
}

function error(l) {
    gutil.log(l);
    this.emit('end');
}

gulp.task('add', function () {
    return inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: "Choose type of file: ",
        choices: TYPES
    }, {
        type: 'input',
        name: 'name',
        message: "File name (without extensions): "
    }]).then(function (answer) {
        if (answer.name) {
            switch (answer.type) {
                case TYPES[0]:
                    add.formatter(answer.name + ".js");
                    break;
                case TYPES[1]:
                    add.fragment(answer.name + ".xml");
                    break;
                case TYPES[2]:
                    add.i18n("i18n-" + answer.name.toLowerCase() + ".properties");
                    break;
                case TYPES[3]:
                    add.view_controller(answer.name, answer.name + ".view.xml", answer.name + ".controller.js");
                    break;
            }
        } else {
            gutil.log('File name is required.');
        }
    });
})

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(replace("{{namespace}}", CONFIG.namespace))
        .pipe(htmlhint())
        .pipe(htmlhint.reporter("htmlhint-stylish"))
        .pipe(gulp.dest('dist'))
})

gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', error))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream())
})

gulp.task('i18n', function () {
    return gulp.src('app/**/**.properties', {
            base: './app/'
        })
        .pipe(gulp.dest('dist'))
})

gulp.task('preload', function () {
    return gulp.src([
            'app/**/**.+(js|xml)'
        ])
        .pipe(replace("{{namespace}}", CONFIG.namespace))
        .pipe(gulpif('**/*.js', jshintChannel())) //only pass .js files to uglify
        .pipe(gulpif('**/*.xml', xmlChannel())) // only pass .xml to prettydata  
        .pipe(ui5preload({
            base: 'app/',
            namespace: CONFIG.namespace
        }))
        .pipe(gulp.dest('dist'));
})
var jshintChannel = lazypipe()
    .pipe(jshint)
    .pipe(jshint.reporter, 'jshint-stylish')
    .pipe(uglify);
var xmlChannel = lazypipe()
    .pipe(prettydata,{
        type: 'minify'
    });
// gulp.task('js', function(cb) {
//     return gulp.src('app/**/**.js', {base: './app/'})
//         .pipe(replace("{{namespace}}", CONFIG.namespace))
//         .pipe(jshint().on('error', error))
//         .pipe(jshint.reporter("jshint-stylish"))
//         .pipe(gulp.dest('dist'))
// })
// gulp.task('xml', function () {
//     return gulp.src('app/**/**.xml', {
//             base: './app/'
//         })
//         .pipe(replace("{{namespace}}", CONFIG.namespace))
//         .pipe(xmlvalidator().on('error', error))
//         .pipe(gulp.dest('dist'))
// })


gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
})

gulp.task('watch', function () {
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/*.html', ['html']).on('change', reload);
    gulp.watch('app/**/**.+(js|xml)', ['preload']).on('change', reload);
    gulp.watch('app/**/**.properties', ['i18n']).on('change', reload);
})

gulp.task('default', ['html', 'sass', 'i18n', 'preload', 'browserSync', 'watch'])