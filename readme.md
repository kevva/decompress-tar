# decompress-tar [![Build Status](http://img.shields.io/travis/kevva/decompress-tar.svg?style=flat)](https://travis-ci.org/kevva/decompress-tar)

> tar decompress plugin


## Install

```
$ npm install --save decompress-tar
```


## Usage

```js
var Decompress = require('decompress');
var decompressTar = require('decompress-tar');

new Decompress()
	.src('foo.tar')
	.dest('dest')
	.use(decompressTar({strip: 1}))
	.run();
```

You can also use this plugin with [gulp](http://gulpjs.com):

```js
var decompressTar = require('decompress-tar');
var gulp = require('gulp');
var vinylAssign = require('vinyl-assign');

gulp.task('default', function () {
	return gulp.src('foo.tar')
		.pipe(vinylAssign({extract: true}))
		.pipe(decompressTar({strip: 1}))
		.pipe(gulp.dest('dest'));
});
```


## API

### decompressTar(options)

#### options.strip

Type: `number`  
Default: `0`

Remove leading directory components from extracted files.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
