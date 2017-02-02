# Gulp for UI5  

<img src="https://s3.amazonaws.com/media-p.slid.es/uploads/78377/images/1337731/gulp.png" height="100" />
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Plus_font_awesome.svg/2000px-Plus_font_awesome.svg.png" height="100" />
<img src="http://openui5.org/resources/OpenUI5_text_below.png" height="100" />

Boilerplate for [UI5](https://openui5.hana.ondemand.com/) development backed by [Gulp.js](http://gulpjs.com/). Inspired from [cferdinandi's gulp-boilerplate](https://github.com/cferdinandi/gulp-boilerplate)

* HTMLhint and JShint provided during build time
* Component-preload.js builder for UI5. Currently supports JS and XML views
* Sass compilation, autoprefixing and concatenation
* Livereload server with BrowserSync
* Module generator for UI5. Currently supports View & Controller, Fragment and Formatter

[Download](https://github.com/neel2292/gulp-for-ui5/archive/master.zip)

**Documentation**

1. [Getting Started](#getting-started)
2. [File Structure](#file-structure)
3. [Options & Settings](#options-and-settings)
4. [Todo](#todo)

## Getting Started

### Requirements
* Basic knowledge of [UI5](https://openui5.hana.ondemand.com/)

### Dependencies
Make sure these are installed first.

* [Node.js](http://nodejs.org)
* [Gulp](http://gulpjs.com) `sudo npm install -g gulp`. For Windows, open command prompt with admin rights.

### Quick Start

1. In bash/terminal/command line, `cd` into your project directory.
2. Run `npm install` to install required files.
3. When it's done installing, run `gulp` to kickstart your development

## File Structure

* `config.json` holds the configuration of your application and is configurable
* Most of your development work will be contained in the app directory
* The files produced during build time is dumped into the `dist` directory
* The file structure conforms to UI5 standard that contains a main html file and a `Component.js` file. 
* The `view` directory is allocated for view files `*.view.xml`, `*.view.js` and fragment files `*.xml` 
* The `scss` directory contains `.scss` files that will be compiled and concatenated to a single `.css` file
* The `model` directory is allocated for formatter files `*.js`
* The `i18n` directory is allocated for i18n files `*.properties`
* The `controller` directory is allocated for controller files `*.controller.js`
* The `templates` directory contains boilerplate modules to be used for module generation

```
gulp-for-ui5
|__app/

    |__controller/
        |__App.controller.js
        
    |__i18n/
        |__i18n.properties
        
    |__model/
    
    |__scss/
        |__style.scss
        
    |__view
        |__App.view.xml
        
    |__Component.js
    |__index.html
    
|__templates/
    |__controller.js
    |__formatter.js
    |__fragment.xml
    |__view.xml
    
|__.gitignore
|__config.json
|__gulpfile.js
|__package.json
|__README.md
```

## Options and Settings

### Configuration

Configuration is stored in `config.json` file and contains the following:

* `app_name`: Application name
* `app_theme`: Application theme, default -> sap_belize
* `app_resource`: Path towards UI5 library, default -> https://openui5.hana.ondemand.com/resources/sap-ui-core.js
* `namespace`: namespace for the root of the application, default -> sap.ui.demo

### Module generator

There are several modules which can be generated using `gulp add`
* Formatter `model/*.js`
* Fragment `view/*.xml`
* I18n `i18n/i18n-*.properties`
* View & Controller `view/*.view.xml`, `controller/*.controller.js`

## Todo

* Documentation generator
* Image and SVG handling
* Jasmine unit test and report generation
